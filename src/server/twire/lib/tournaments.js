const { default: puppeteer } = require("puppeteer");

const path = '../data/tournaments.js'
const url = `https://twire.gg/en/pubg`
const select = '.infinite-scroll-component'
const subselect = ' > div > a'

// Loads and return list of tournaments
async function Load() {
    console.log('working...');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Go to url
    await page.goto(url);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector(select, { visible: true, timeout: 3000 });

    const tournamentList = await page.$$eval(select + subselect, elements => {

        return elements.map(el => {
            const tournament = {
                url: 'https://twire.gg',
                logo: null,
                name: '',
                region: '',
                pricepool: null,
                tier: ''
            }
            tournament.url += el.getAttribute('href').trim()

            const logo = el.querySelector("div > div > div:nth-child(1) > img")
            if (logo) {
                tournament.logo = logo.getAttribute('src').trim()
            }

            const name = el.querySelector("div > div > div:nth-child(1) > div > p")
            if (name) {
                tournament.name = name.textContent.trim()
            }

            const region = el.querySelector("div > div > div:nth-child(1) > div > div > div:nth-child(3) > span")
            if (region) {
                tournament.region = region.textContent.trim()
            }

            const pricepool = el.querySelector("div > div > div:nth-child(1) > div > div > div:nth-child(2) > span")
            if (pricepool) {
                tournament.pricepool = pricepool.textContent.trim()
            }

            const tier = el.querySelector("div > div > div:nth-child(1) > div > div > div:nth-child(1) > span > span")
            if (tier) {
                tournament.tier = tier.textContent.trim()
            }

            return tournament
        });
    });

    await browser.close();

    const result = {
        lastUpdate: new Date(),
        data: tournamentList
    }

    return result
}

// List of tournaments
let tournaments = {}

// Load the tournaments and then save them to constant
exports.save = async function Save() {
    try {
        const value = await Load()
        tournaments = value
        console.log('saved!');
    } catch (error) {
        console.warn(error)
        throw Error(error)
    }
}

// Returns list of tournaments
exports.get = () => {
    return tournaments
}


