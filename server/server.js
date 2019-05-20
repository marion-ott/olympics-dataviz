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
    const query = 'SELECT * FROM game INNER JOIN sport_per_game ON sport_per_game.game_id = game.id WHERE id = ?'

    connection.query(query, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }
        
        res.json(rows)
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