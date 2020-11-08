const whlScraper = require('../whl_scraper')
const utils = require('../../../utils')

describe('whlScraper()', () => {
  test('gets prospect json and scrapes current season stats', async () => {
    const prospectJson = require('./__fixtures__/whl_filip_kral.fixture')
    const prospect = {
      first_name: 'Filip',
      last_name: 'Kral',
      position: 'D',
      shoots: 'L',
      team_name: 'Spokane Chiefs',
      dob: '1999-10-20',
      draft_round: 5,
      draft_pick: 149,
      draft_year: 2018,
      league_id: '27960',
      statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27960&category=seasonstats',
      game_statline_url:
        'http://lscluster.hockeytech.com/feed/?feed=modulekit&view=player&key=41b145a848f4bd67&fmt=json&client_code=whl&lang=en&player_id=27960&category=gamebygame',
      league: 'WHL',
      ep_url: 'https://www.eliteprospects.com/player/247241/filip-kral',
    }

    jest.spyOn(utils.dateHelpers, 'getSeasonStartYear').mockImplementation(() => 2019)
    jest.spyOn(utils, 'jsonRequest').mockImplementation(() => prospectJson)

    const { goals, assists, points, shots, games_played } = await whlScraper(prospect)

    expect(goals).toEqual(12)
    expect(assists).toEqual(37)
    expect(points).toEqual(49)
    expect(shots).toEqual(129)
    expect(games_played).toEqual(53)
  })
})
