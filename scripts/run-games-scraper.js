// Use 'node scraper/season_scraper.js' to run script

const db = require('../db')

const dotenv = require('dotenv')
const gamesScraper = require('../games-scraper')
const prospects = require('../prospect_info')

dotenv.config()

async function scrapeCurrentGames() {
  console.log('Starting Games Scrape...')
  const date = new Date()
  const created_at = date.toISOString()

  await Promise.all(
    prospects.map(async prospect => {
      try {
        const game = await gamesScraper(prospect, date)

        if (game) {
          await db('games')
            .insert({
              ...game,
              created_at,
              updated_at: created_at,
            })
            .onConflict(['last_name', 'first_name', 'date'])
            .merge({
              ...game,
              updated_at: created_at,
            })
        }
      } catch (err) {
        console.log(`${prospect.first_name} ${prospect.last_name} (${prospect.league})`)
        console.error(err)
      }
    }),
  )

  console.log('Finished Games Scrape!')
  process.exit()
}

scrapeCurrentGames()
