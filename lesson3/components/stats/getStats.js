const read = require('../log/read')
const { game } = require('../../settings/game.json')


module.exports = async (path) => {
    try {
        const gameDataStr = await (await read(path)).toString()
        const gameDataArr = gameDataStr.split('\n')
        const gameCnt = gameDataArr.length - 1
        const patternWin = new RegExp(game.win, 'g')
        const patternLose = new RegExp(game.lose, 'g')
        const winCnt = (gameDataStr.match(patternWin) || []).length
        const loseCnt = (gameDataStr.match(patternLose) || []).length
        return {
            games: gameCnt,
            wins: winCnt,
            losers: loseCnt,
            winRatio: gameCnt ? (winCnt / gameCnt).toFixed(2) * 100 : 0
        };
    }
    catch (err) {
        console.log('Ошибка чтения статитстики', err)
        return { games: 0, wins: 0,losers:0, winRatio: 0}
    }
}