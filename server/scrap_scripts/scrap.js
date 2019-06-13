let codes = [
  "RSA",
  "FRA",
  "USA"
]

var fs = require('fs');
const puppeteer = require('puppeteer');
require('events').EventEmitter.defaultMaxListeners = 300
codes.forEach((code) => {
    (async function main() {
      try {
        const browser = await puppeteer.launch({ headless: false });
        const [page] = await browser.pages();
    
        await page.goto(`https://www.sports-reference.com/olympics/countries/${code}/`);
    
        const text = await page.evaluate( () => Array.from( document.querySelectorAll( 'tbody > tr > td' ), element => element.textContent ) );
        formatArray(text, code)
        await browser.close();
      } catch (err) {
        console.error(err);
      }
    })();
});


let countries = [];

function formatArray(array, code) {
    let country = {}
    let infosArray = []
    let infos = {}
    country.name = code
    let count = 0    
    array.map(item => {
        if(count < 11) {
            if(count == 1 || count == 4 || count == 5) {
                switch(count) {
                  case 1:
                    infos.year = item
                  break;
                  case 4:
                    infos.male = parseFloat(item)
                  break;
                  case 5:
                    infos.female = parseFloat(item)
                  break;
                }
            }
            count++
        } else {
          if(!infos.year.toLowerCase().includes('winter')) {
            infos.year = parseFloat(infos.year.slice(0,4))
            infosArray.push(infos)
            country.infos = infosArray
          }
          infos = {}
          count = 0
        }
    })
    fs.appendFileSync('./data.json', JSON.stringify(country));
  }




  