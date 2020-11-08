const utils = require('../../utils')

// EXAMPLE PROSPECT.JS JSON
// {
//   league_id: '7662'
//   league: "OHL",
// }

module.exports = async function (prospect, date) {
  if (!prospect.league_id) {
    throw new Error(`Cannot complete OHL scrape, prospect ${prospect.first_name} ${prospect.last_name} is missing: \n league_id`)
  }

  const { day, month, year } = utils.dateHelpers.setDateValues(date, { zeroPad: true })
  const url = `http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=2976319eb44abe94&fmt=json&client_code=ohl&lang=en&player_id=${prospect.league_id}&category=gamebygame`

  const scrapedProspect = await utils.jsonRequest(url)

  const game = scrapedProspect?.SiteKit?.Player?.games?.find(g => g.date_played === `${year}-${month}-${day}`)

  if (!game) {
    return null
  }

  return {
    first_name: prospect.first_name,
    last_name: prospect.last_name,
    league: prospect.league,
    goals: +game.goals,
    assists: +game.assists,
    points: +game.points,
    shots: +game.shots,
    penalty_minutes: +game.penalty_minutes,
    date: game.date_played,
  }
}
