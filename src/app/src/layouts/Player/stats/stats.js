import axios from "axios"



export default class StatsClass {
    constructor(params) {
        this.name = params.name
        this.accountId = params.accountId
        this.season = params.season
        this.gameMode = params.gameMode
        this.mode = params.mode
        this.url = {
            ranked: {
                url: `/players/${this.accountId}/seasons/${this.season.id}/ranked`,
                dataName: 'rankedGameModeStats',
                data: null
            },
            public: {
                url: `/players/${this.accountId}/seasons/${this.season.id}`,
                dataName: 'gameModeStats',
                data: null
            }
        }
    }

    save() {
        sessionStorage.setItem(`${this.name}-${this.gameMode}-${this.season.value}`, JSON.stringify(this.url[this.gameMode].data))
        console.log('saved');
    }

    check() {
        if (sessionStorage.getItem(`${this.name}-${this.gameMode}-${this.season.value}`)) {
            const json = JSON.parse(sessionStorage.getItem(`${this.name}-${this.gameMode}-${this.season.value}`))
            return json
        }
        return null
    }

    load() {
        return new Promise((resolve, reject) => {
            if (this.check()) {
                resolve(this.check())
                console.log('data loaded from session');
            } else {
                console.log('data arent saved');
                axios
                .get('https://api.pubg.com/shards/steam' + this.url[this.gameMode].url, {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                        Accept: "application/vnd.api+json"
                    }
                })
                .then(res => {
                    const data = res.data.data.attributes[this.url[this.gameMode].dataName]
                    this.url[this.gameMode].data = data
                    console.log(data);
                    this.save()
                    resolve(data)
                })
                .catch(err => reject(err))
            }   

        })
    }

}
