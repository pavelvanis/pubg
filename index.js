const express = require('express')
const { rmSync } = require('fs')
const path = require('path')
const app = express()

require('dotenv').config()


const { getTournaments, saveTournaments } = require('./src/server/twire')
const { getSeasons, saveSeasons } = require('./src/server/season')

const PORT = process.env.PORT || 8080

// Loads and saves tournament list to file with interval
saveTournaments()
saveSeasons()

// Set CORS policy 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, 'public', 'build')));


// Returns json of pubg seasons
app.get("/api/season", async (req, res) => {
  const seasons = getSeasons()
  res.json(seasons)
})

// Returns json of tournaments on twire.gg
app.get('/api/stats/tournaments', async (req, res) => {
  const tournaments = getTournaments()
  res.json(tournaments)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

// Listening at port ..
app.listen(PORT, () => {
  console.log('========================================================');
  console.log(`Server is running at port ${PORT}`)
});
