const getStatistics = require('./getStats')

module.exports = async (pathToLogs, scene) => {
    let stat = await getStatistics(pathToLogs)

    scene.gameCnt.content = `Всего игр: ${stat.games}`
    scene.winCnt.content = `Побед:  ${stat.wins}`
    scene.loseCnt.content = `Поражений:  ${stat.losers}`
    scene.winRatio.content = `Побед, %:  ${stat.winRatio}`
}