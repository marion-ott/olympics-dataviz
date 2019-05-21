const express = require('express')
const mysql = require('mysql')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const port = 9000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Cc15091963',
    database: 'olympics'
})

app.use(morgan('short'))
app.use(cors())

app.get('/', (req, res) => {
    console.log('Responding');
    res.send('hello')
})

app.get('/games/:id', (req, res) => {
    const gameId = req.params.id
    /* Query to get all the countries present at the current game and the amount of male & female athletes */
    const countriesQuery = 'SELECT * FROM country_per_game INNER JOIN country ON country.id = country_per_game.country_id WHERE game_id = ?' 
    let data = {}
    
    connection.query(countriesQuery, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }
        data.countries = rows

        /* Query to get all the disciplines of the current game */
        const sportsQuery = "SELECT sport.sport_name FROM sport_per_game INNER JOIN sport ON sport_per_game.sport_id = sport.id WHERE game_id =?"
        new Promise((resolve, reject) => {
            connection.query(sportsQuery, [gameId], (err, rows, fields) => {
                if(err) {
                    console.log(`Failed query for game : ${err}`)
                    res.sendStatus(500)
                    reject(err)
                    return
                }  
                let sports = rows.map(row => row.sport_name)
                data.sports = sports
                resolve(data)    
            })
        }).then((data) => {
            let details = [...data.countries]
            let infos = details.map(async(country, i) => {
                details[i] = {
                    id: country.id,
                    name: country.country_name,
                    code: country.code,
                    flag: country.flag,
                    male: country.male,
                    female: country.female
                }
                let resultQuery = "SELECT * FROM result WHERE country_id =? AND game_id = ?"
                let results = [];
                details[i].results = await new Promise((resolve, reject) => {
                    connection.query(resultQuery, [country.id, gameId], (err, rows, fields) => {
                        if(err) {
                            console.log(`Failed query for game : ${err}`)
                            res.sendStatus(500)
                            reject(err)
                            return
                        } 
                        results = rows.map(row => {
                            let item = {
                                sport: row.sport_id,
                                gender: row.gender,
                                medal: row.medal
                            }
                            return item
                        })
                        resolve(results)
                    })
                })
                return details[i]
            })

            Promise.all(infos).then((infos) => res.json(infos))

        })
    })  
})

app.get('/games/:id/result', (req, res) => {
    const gameId = req.params.id
    const query = 'SELECT id, country_id FROM result GROUP BY result.country_id INNER JOIN country ON result.country_id = country.id INNER JOIN sport ON result.sport_id = sport.id WHERE result.game_id = ?'

    connection.query(query, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }
        
        res.json(rows)
    })
    
})

app.get('/games', (req, res) => {
    const query = "SELECT game.id, game.year, city_name, country_name FROM game INNER JOIN city ON game.city_id = city.id INNER JOIN country ON game.country_id = country.id ORDER BY year ASC"
    connection.query(query, (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }  

        res.json(rows)
    })
})

app.get('/games/:id/sports', (req, res) => {
    const gameId = req.params.id
    const query = "SELECT sport.sport_name FROM sport_per_game INNER JOIN sport ON sport_per_game.sport_id = sport.id WHERE game_id =?"
    connection.query(query, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }  
        const data = rows.map(row => row.sport_name)
        // res.json(rows)
        res.json(data)
    })
})


app.get('/games/:id/countries', (req, res) => {
    const gameId = req.params.id
    const query = "SELECT country.country_name, country.code, country.flag, country_per_game.male, country_per_game.female FROM country_per_game INNER JOIN country ON country_per_game.country_id = country.id WHERE game_id =?"
    connection.query(query, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }  

        res.json(rows)
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})