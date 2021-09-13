const check = require('./check')
const { coinProperties } = require('../../settings/coin.json')
const {game} = require("../../settings/game.json")
const randomize = require('../../utils/randomize')
const logger = require('../log/logger')
const setStats = require('../stats/setStats')
const pathToLogs = require('../../utils/getDirLog')

const renderResult = async (scene, res, pc) => {
    scene.winRes.style.fg = res === game.win ? 'green' : 'red'
    scene.winRes.content = res === game.win ? `${game.win}` : `${game.lose}`
    scene.image.stop()
    scene.image.setImage(`./resources/${pc}.png`)
    scene.reset.hidden = false
    await setStats(pathToLogs, scene)
    scene.screen.render()
}

module.exports = async (scene) => {
    let user, pc
    let res = null
    try {
        pc = coinProperties[randomize(2)]
        user = coinProperties[scene.checked]
        res = check(user, pc)
        scene.image.play()
        setTimeout(() => { renderResult(scene, res, pc) }, 2000)
    }
    catch (err) {
        console.log('Ошибка в игре', err)
    }
    finally {
        res ? logger(res, { user, pc }) : logger(null)
    }
}