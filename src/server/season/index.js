const axios = require("axios")
const fs = require("fs")

const path = "./season.json"

// Returns axios request
function axiosSeasons() {
    return axios.get(`https://api.pubg.com/shards/steam/seasons`, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Accept: `application/vnd.api+json`
        }
    })
}

// Filter PC seasons
const filterSeasons = (data) => {
    let seasons = []
    data.forEach(season => {
        if (!season.id.includes('pc-')) return
        seasons.push({
            id: season.id,
            isCurrent: season.attributes.isCurrentSeason,
            value: season.id.split("-")[2]
        })
    });
    return seasons
}

//save data to json
function save() {
    const date = new Date()
    axiosSeasons()
        .then((result) => filterSeasons(result.data.data))
        .then(result => result = {
            lastUpdate: date,
            data: result
        })
        .then(result => {
            const json = JSON.stringify(result)
            fs.writeFileSync(path, json, err => {
                if (err) throw err
            })
        })
        .catch((err) => {
            console.error(err)
        })
}

//return data from json
async function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            try {
                const seasons = JSON.parse(data)
                resolve(seasons)
                console.log('Seasons was loaded');
            } catch (error) {
                console.error('No season are saved!');
                save()
            }
        })
    })
}

// check when data was last upadated
function lastUpdate(data) {
    const difference = (new Date() - new Date(data.lastUpdate)) / 1000 / 60
    if(difference <= 30) return
    save()
    console.log(difference)
    //console.log('data saved!')
}



module.exports = {
    save,
    read,
    lastUpdate
}


