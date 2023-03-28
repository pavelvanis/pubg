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

let seasons = {}

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
exports.save = function save() {
    const date = new Date()
    axiosSeasons()
        .then((result) => filterSeasons(result.data.data))
        .then(result => result = {
            lastUpdate: date,
            data: result
        })
        .then(res => {
            seasons = res
            console.log('seasons was saved!');
        })
        .catch((err) => {
            console.error(err)
        })
}

//return data from json
exports.get = () => {
    return seasons
}

// check when data was last upadated
exports.lastUpdate = function lastUpdate(data) {
    const difference = (new Date() - new Date(data.lastUpdate)) / 1000 / 60
    if (difference <= 30) return
    save()
    console.log(difference)
    //console.log('data saved!')
}



