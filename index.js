const express = require('express')
const { rmSync } = require('fs')
const path = require('path')
const app = express()

require('dotenv').config()

const season = require('./src/server/season')
const { getTournaments, saveTournaments } = require('./src/server/twire')

const PORT = process.env.PORT || 8080

// Loads and saves tournament list to file with interval
saveTournaments()


app.use(express.static(path.join(__dirname, 'public', 'build')));


// Returns json of pubg seasons
app.get("/api/season", async (req, res) => {
  try {
    const seasons = await season.read()
    res.json(seasons)
  } catch (error) {
    console.error(error);
    res.send('error')
  }
})

// Returns json of tournaments on twire.gg
app.get('/api/stats/tournaments', async (req, res) => {
  const tournaments = getTournaments()
  res.json(tournaments)
})

/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
}); */

// Listening at port ..
app.listen(PORT, () => {
  console.log('========================================================');
  console.log(`Server is running at port ${PORT}`)
});
