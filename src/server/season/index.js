
const seasons = require('./lib/season')

async function saveSeasons() {
    await seasons.save()
    const tournamentInterval = 1000 * 60 * 60
    setInterval(async () => {
        console.log('run');
        await seasons.save()
    }, tournamentInterval)
}

function getSeasons() {
    return seasons.get()
}

module.exports = {
    saveSeasons,
    getSeasons
}
