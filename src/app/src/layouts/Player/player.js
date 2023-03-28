
import axios from 'axios'

export function getId(player) {
    return new Promise((resolve, reject) => {
        if (!validPlayer(player)) {
            reject("No valid name!")
            return
        }
        if (exist(player)) {
            resolve(exist(player))
            console.log('player exists');
            return
        }
        axios
            .get(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${player}`, {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                    Accept: "application/vnd.api+json"
                }
            })
            .then(res => { return res.data.data[0].id })
            .then(res => {
                save(player, res)
                resolve(res)
            })
            .catch(err => {
                console.log(err);
                switch (err.response.status) {
                    case 404 : reject('Player was not foud!')
                    case 400 : reject('Bad request')
                    case 429 : reject('Too many requests, please wait a moment')
                }
            })
    })
}

function exist(player) {
    if (localStorage.getItem(player)) return localStorage.getItem(player)
    console.log('doeasnt exists')
    return false
}

function save(player, id) {
    localStorage.setItem(player, id)
    console.log(`Player '${player}' was saved!`)
}

function validPlayer(player) {
    const pattern = new RegExp("^[a-zA-Z0-9_-]{3,}$")
    if (pattern.test(player)) return true
    return false
}