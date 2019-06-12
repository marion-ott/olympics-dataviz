const url = 'http://localhost:9000'
// var fs = require('fs')

class api {
    async getGames() {
        const response = await fetch(`${url}/games`);
        const json = await response.json();
        return json;  
    } 
    async getGameById(id) {
        const response = await fetch(`${url}/games/${id}`);
        const json = await response.json();
        // fs.writeFile('./data.json', json, 'utf8', (err) => {
        //     if (err) throw err
        // })
        return json;
    }
}
  
export default new api();