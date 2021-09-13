const initScene = require('./components/game/scene')
const initPlay = require('./components/game/play')
const scene = initScene()
const gifPath = "./resources/coin.gif"
const setStats = require('./components/stats/setStats')
const pathToLogs = require('./utils/getDirLog')

const init = async (scene) => {
    scene.reset.hidden = true
    await setStats(pathToLogs, scene)
    scene.image.setImage(gifPath)
    scene.screen.render()
}

init(scene)

scene.form.on('submit', function (data) {
    scene.checked = data.coin[0] ? 1 : 2     // 1: решка,   2: орел
    scene.reset.hidden = true;
    scene.submit.hidden = true;
    scene.image.setImage(gifPath);
    scene.msg.display('Полет монеты', 1, () => { initPlay(scene) })
})

scene.form.on('reset', function () {
    scene.winRes.content = ''
    scene.reset.hidden = true
    scene.submit.hidden = false
    scene.image.setImage(gifPath)
    scene.image.stop()
    scene.msg.display('Играем', 1, function () { })
})


