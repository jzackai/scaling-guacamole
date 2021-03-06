/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

describe('Voting Poll', () => {
  let subject
  let Logger
  let Pollmommy

  before(() => {
    Logger = td.object([ 'debug', 'info' ])

    Pollmommy = td.constructor([ 'vote' ])
  })

  after(() => td.reset())

  describe('when voting', () => {
    const pollUrl = 'http://www.https://poll.fm/10213898'
    const pollId = '10213898'
    const pollOptionId = '46950802'
    const ip = 'my-ip'
    const country = 'my-country'
    const geoip = { ip, country }

    beforeEach(() => {
      td.when((Logger.debug(td.matchers.anything()), { ignoreExtraArgs: true })).thenResolve()
      td.replace('modern-logger', Logger)

      td.when(Pollmommy.prototype.vote(), { ignoreExtraArgs: true }).thenResolve(geoip)
      td.replace('pollmommy', Pollmommy)

      subject = require('../src/voting-poll')
    })

    it('should call pollmommy vote', () => {
      return subject.vote()
        .then(() => {
          td.verify(Pollmommy.prototype.vote(pollUrl, pollId, pollOptionId), { times: 1 })
        })
    })
  })
})
