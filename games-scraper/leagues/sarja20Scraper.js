const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   league_id: '60490663',
//   statline_url: 'https://mestis.fi/en/pelaajat/60490663/hollowell-mac',
//   game_statline_url: 'https://mestis.fi/en/pelaajat/60490663/hollowell-mac/ottelu-ottelulta',
//   league: 'Mestis',
// }

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete Sarja20 scrape, prospect is missing: \n league_id`)
  }

  const currentSeason = utils.getCurrentSeason('YYYY-YYYY').split('-')[1]
  const { day, month, year } = utils.dateHelpers.setDateValues(date, { zeroPad: true })
  const url = `https://www.leijonat.fi/modules/mod_playercardseriestats/helper/getplayerseriestats3.php?lkq=${prospect.league_id}&season=${currentSeason}&isgoalie=0&isskater=1`

  const scrapedProspect = await utils.jsonRequest(url)

  const game = scrapedProspect?.AllSkaterGames?.find(({ GameDate: gameDate }) => gameDate === `${day}.${month}.${year}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game.SkaterGoals,
    assists: +game.SkaterAssists,
    points: +game.SkaterPoints,
    shots: null,
    penalty_minutes: +game.SkaterPenMinutes,
    date: `${year}-${month}-${day}`,
  }
}
