const express = require('express')
const mysql = require('mysql')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const port = 9000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'olympics'
})

app.use(morgan('short'))
app.use(cors())

app.get('/', (req, res) => {
    console.log('Responding');
    res.send('hello')
})

app.get('/champions', (req, res) => {
    const gameId = req.params.id
    const query = `
        SELECT
            country.country_name,
            country.code,
            country.flag,
            country_per_game.male,
            country_per_game.female
        FROM
            country_per_game
        INNER JOIN country ON country_per_game.country_id = country.id
        WHERE game_id =?`
    connection.query(query, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }

        res.json(rows)
    })
})



app.get('/games/:id', (req, res) => {
    let data = {}
    const gameId = req.params.id


    let factQuery = 'SELECT * FROM fact INNER JOIN game ON game.id = fact.game_id WHERE game_id = ?'
    connection.query(factQuery, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }
        data.fact = rows
    })

    let gamesQuery = 'SELECT * FROM game'
    connection.query(gamesQuery, (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }
        data.games = rows
    })

    const gameQuery = 'SELECT * FROM game INNER JOIN country ON country.id = game.country_id INNER JOIN city ON city.id = game.city_id WHERE game.id = ?'
    connection.query(gameQuery, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }
        data.game = rows
    })


    /* Query to get all the countries present at the current game and the amount of male & female athletes */
    const countriesQuery = 'SELECT * FROM country_per_game INNER JOIN country ON country.id = country_per_game.country_id WHERE game_id = ?'

    connection.query(countriesQuery, [gameId], (err, rows, fields) => {
        if(err) {
            console.log(`Failed query for game : ${err}`)
            res.sendStatus(500)
            return
        }
        data.countries = rows
        //console.log(rows);

        /* Query to get all the disciplines of the current game */
        const sportsQuery = "SELECT sport.sport_name, sport.id FROM sport_per_game INNER JOIN sport ON sport_per_game.sport_id = sport.id WHERE game_id =?"
        new Promise((resolve, reject) => {
            connection.query(sportsQuery, [gameId], (err, rows, fields) => {
                if(err) {
                    console.log(`Failed query for game : ${err}`)
                    res.sendStatus(500)
                    reject(err)
                    return
                }
                let sports = rows.map(row => row.sport_name)
                data.sports = rows
                resolve(data)
            })
        }).then((data) => {
            let details = [...data.countries]
            let infos = details.map(async(country, i) => {
                let female = []
                let male = []
                let ratio = (country.female / (country.male + country.female)).toFixed(2)
                details[i] = {
                    id: country.id,
                    name: country.country_name,
                    code: country.code,
                    flag: country.flag,
                    male: country.male,
                    female: country.female,
                    ratio: ratio
                }
                let resultQuery = `SELECT
                                        result.sport_id,
                                        sport.sport_name,
                                        result.gender,
                                        result.medal,
                                        COUNT(*) AS amount
                                    FROM result
                                    INNER JOIN sport ON sport.id = result.sport_id
                                    WHERE country_id =? AND game_id = ?
                                    GROUP BY result.sport_id, result.gender, result.medal`
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
                                sportId: row.sport_id,
                                sport: row.sport_name,
                                gender: row.gender,
                                medal: row.medal,
                                amount: row.amount
                            }
                            return item
                        })

                        resolve(results)
                    })
                })

                return details[i]
            })
            // infos.sports = [...data.sports]
            // console.log(infos.sports);

            Promise.all(infos).then((infos) => {
                data.countries = infos
                let women = 0
                let men = 0
                let countries = 0
                data.countries.map(country => {
                    let gold = 0
                    let silver = 0
                    let bronze = 0
                    if(country.results !== null) {
                        country.results.map(result => {
                            switch(result.medal) {
                                case 1:
                                    gold += result.amount
                                    break;
                                case 2:
                                    silver += result.amount
                                    break;
                                case 3:
                                    bronze += result.amount
                                    break;
                            }
                        })
                    }
                    countries++
                    women+= country.female
                    men+= country.male
                    country.medals = {
                        gold,
                        silver,
                        bronze,
                        total: gold + silver + bronze
                    }
                })

                data.game[0].nations = countries
                data.game[0].male = men
                data.game[0].female = women


                data.countries.forEach(country => {
                    let result = []
                    country.results.forEach(function (hash) {
                        return function (a) {
                            if (!hash[a.sport]) {
                                hash[a.sport] = { sport: a.sport, sportId: a.sportId, male: [], female: [], neutral: []};
                                result.push(hash[a.sport]);
                            }

                            switch(a.gender) {
                                case 'M':
                                    hash[a.sport].male.push({ type: a.type, amount: a.amount, type: a.medal });
                                    break;
                                case 'W':
                                    hash[a.sport].female.push({ type: a.type, amount: a.amount, type: a.medal });
                                    break;
                                case 'X':
                                    hash[a.sport].neutral.push({ type: a.type, amount: a.amount, type: a.medal });
                                    break;
                                default:
                                    break;
                            }

                        };
                    }(Object.create(null)));

                    country.results = result
                })

                data.countries.forEach(country => {
                    if(country.results) {
                        country.results.forEach(result => {
                            let malegold = 0
                            let malesilver = 0
                            let malebronze = 0
                            let femalegold = 0
                            let femalesilver = 0
                            let femalebronze = 0
                            let neutralgold = 0
                            let neutralsilver = 0
                            let neutralbronze = 0
                            result.male.forEach(medal => {
                                switch(medal.type) {
                                    case 1:
                                        malegold = malegold += medal.amount
                                        break;
                                    case 2:
                                        malesilver = malesilver += medal.amount
                                        break;
                                    case 3:
                                        malebronze = malebronze += medal.amount
                                        break;
                                }
                            })
                            result.female.forEach(medal => {
                                switch(medal.type) {
                                    case 1:
                                        femalegold = femalegold += medal.amount
                                        break;
                                    case 2:
                                        femalesilver = femalesilver += medal.amount
                                        break;
                                    case 3:
                                        femalebronze = femalebronze += medal.amount
                                        break;
                                }
                            })
                            result.neutral.forEach(medal => {
                                switch(medal.type) {
                                    case 1:
                                        neutralgold = neutralgold += medal.amount
                                        break;
                                    case 2:
                                        neutralsilver = neutralsilver += medal.amount
                                        break;
                                    case 3:
                                        neutralbronze = neutralbronze += medal.amount
                                        break;
                                }
                            })
                            result.male = {
                                gold: malegold,
                                silver: malesilver,
                                bronze: malebronze
                            }
                            result.female = {
                                gold: femalegold,
                                silver: femalesilver,
                                bronze: femalebronze
                            }
                            result.neutral = {
                                gold: neutralgold,
                                silver: neutralsilver,
                                bronze: neutralbronze
                            }
                        })
                    }
                })

                res.json(data)
            })

        })
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


/**
"results": [
    {
        "sport": "natation",
        "sportId": 12,
        "medals": {
            "male": [
                {
                    "type": 1,
                    "amount": 30
                },
                {
                    "type": 2,
                    "amount": 30
                },
                {
                    "type": 3,
                    "amount": 30
                }
            ],
            "female": [
                {
                    "type": 1,
                    "amount": 30
                },
                {
                    "type": 2,
                    "amount": 30
                },
                {
                    "type": 3,
                    "amount": 30
                }
            ]
        }
    }
]
*/

// let resultsFiltered = {}
// results.map(result => {
//     if("undefined" === typeof(myObject["hello"])){
//         // The property DOESN'T exists
//     }
// })


// "results": {
//     "male": [
//       {
//         "sportId": 1,
//         "sport": "Athlétisme",
//         "medal": 1
//       },
//       {
//         "sportId": 2,
//         "sport": "Aviron",
//         "medal": 2
//       },
//       {
//         "sportId": 21,
//         "sport": "Rugby",
//         "medal": 3
//       },
//       {
//         "sportId": 21,
//         "sport": "Rugby",
//         "medal": 3
//       }
//     ],
//     "female": [
//       {
//         "sportId": 1,
//         "sport": "Athlétisme",
//         "medal": 1
//       }
//     ]



// "results": [
//     {
//         "sport": "natation",
//         "sportId": 2,
//         "male": [
//             {
//                 "type": 1,
//                 "count": 30
//             },
//             {
//                 "type": 2,
//                 "count": 30
//             },
//             {
//                 "type": 3,
//                 "count": 30
//             }
//         ],
//         "female": [
//             {
//                 "type": 1,
//                 "amount": 30
//             },
//             {
//                 "type": 2,
//                 "amount": 30
//             },
//             {
//                 "type": 3,
//                 "amount": 30
//             }
//         ]
//     },
//     {
//         "sport": "athlétisme",
//         "male": [
//             {
//                 "type": 1,
//                 "amount": 30
//             },
//             {
//                 "type": 2,
//                 "amount": 30
//             },
//             {
//                 "type": 3,
//                 "amount": 30
//             }
//         ],
//         "female": [
//             {
//                 "type": 1,
//                 "amount": 30
//             },
//             {
//                 "type": 2,
//                 "amount": 30
//             },
//             {
//                 "type": 3,
//                 "amount": 30
//             }
//         ]
//     }
// }
// */


/**

results: [
    {
        sport: "athletirsme",
        sportId: 4,
        male: {
            gold: 2,
            silver: 1,
            bronze: 3
        },
        female: {
            gold: 1,

        }
    },
]


 */
