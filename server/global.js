const mysql = require('mysql')
var fs = require('fs')
const fetch = require('node-fetch')

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '@Cc15091963',
//     database: 'olympics'
// })

// let games = []
// let countryPerGame = []

// let query = `SELECT id, year FROM game`

// connection.query(query, function (err, result, fields) {
//     if (err) throw err;
//     games = result.map(el => {
//         let item = {
//             id: el.id,
//             year: el.year
//         }
//         return item
//     })

// //    console.log(games)
    
//     games.forEach(game => {
//         let query = `
//             SELECT
//                 country_id,
//                 country.country_name,
//                 medal,
//                 gender
//             FROM result 
//             INNER JOIN country ON country.id = result.country_id
//             WHERE game_id = ${game.id}
//         `
//         connection.query(query, function (err, result, fields) {
//             if (err) throw err;
//             game.countries = result.map(el => {
//                 let item = {
//                     id: el.country_id,
//                     name: el.country_name,
//                     medal: el.medal,
//                     gender: el.gender
//                 }
//                 console.log(item);
                
//             })
//             console.log(game);
            
//         })
//         console.log(games)
//     })
// })

// let data = []

// for(let i = 28; i == 0; i--) {
//     fetch(`http://localhost:9000/games/${i}`)
//         .then(res => res.json())
//         .then(json => {
//             console.log(i)
            
//             fs.appendFileSync('./data.json', JSON.stringify(data))
//         });
// }






/**
games: [
    {
        year:1896,
        male: 0,
        female: 0,
        countries: [
            {
                name: france,
                male: 0,
                female: 0,
            }
        ]
    }

]**/