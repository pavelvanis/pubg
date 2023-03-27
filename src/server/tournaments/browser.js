
const puppeteer = require('puppeteer')

const twireUrl = 'https://twire.gg/en/pubg'

/* function select() {
    console.log('object');
    const value = element.querySelector(selector)
    if (value) {
      return value.textContent
    }
    return ''
} */

async function browser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('working...');

  // Go to url
  await page.goto(twireUrl);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Create selector
  const pattern = '.infinite-scroll-component'

  await page.waitForSelector(pattern, { visible: true, timeout: 5000 });

  const tournamentList = await page.$$eval(pattern + ' > div > a', elements => {

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

      //select(el, "div > div > div:nth-child(1) > div > p")

      //tournament.tier = select(el, "div > div > div:nth-child(1) > div > div > div:nth-child(1) > span > span")

      return tournament
    });
  });


  // Print the full title  
  console.log(tournamentList);

  await browser.close();

  return tournamentList
};

module.exports = browser


