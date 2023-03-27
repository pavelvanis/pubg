
const tournaments = require('./lib/tournaments')


async function saveTournaments() {
    await tournaments.save()
    const tournamentInterval = 1000 * 60
    setInterval(async () => {
        await tournaments.save()
    }, tournamentInterval)
}

function getTournaments() {
    return tournaments.get()
}

module.exports = {
    saveTournaments,
    getTournaments
}


