const express = require('express')
const { rmSync } = require('fs')
const path = require('path')
const app = express()

require('dotenv').config()

const season = require('./src/server/season')

const PORT = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, 'public', 'build')));


app.get("/api/season", async (req, res) => {
  try {
    const seasons = await season.read()
    res.json(seasons)
  } catch (error) {
    console.error(error);
    res.send('error')
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

// Listening at port ..
app.listen(PORT, () => {
  console.log('========================================================');
  console.log(`Server is running at port ${PORT}`)
});


