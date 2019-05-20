const url = 'http://localhost:9000'

class api {
    async getGames() {
        const response = await fetch(`${url}/games`);
        const json = await response.json();
        return json;  
    } 
    async getGameById(id) {
        const response = await fetch(`${url}/games/${id}`);
        const json = await response.json();
        return json;
    }
}
  
export default new api();