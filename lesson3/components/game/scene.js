const blessed = require('blessed')
const { sceneProperties } = require('../../settings/scene.json')
const { coinProperties } = require('../../settings/coin.json')


const scene = {}

scene.screen = blessed.screen({
    smartCSR: true,
    title: `${sceneProperties.name}`
})

scene.form = blessed.form({
    parent: scene.screen,
    width: 44,
    height: 15,
    keys: true,
    vi: true,
    border: {
        type: `${sceneProperties.borderType}`,
        fg: `${sceneProperties.mainColor}`
    }
})

scene.title = blessed.text({
    parent: scene.form,
    content: `${sceneProperties.title}`,
    left: 7,
    fg: `${sceneProperties.mainColor}`,
    bold: true
})

scene.radioset = blessed.radioset({
    parent: scene.form,
    width: 40,
    top: 4,
    left: 2
})

scene.heads = blessed.radiobutton({
    parent: scene.radioset,
    name: `${coinProperties.component}`,
    content: `${coinProperties.heads}`,
})

scene.tails = blessed.radiobutton({
    parent: scene.radioset,
    name: `${coinProperties.component}`,
    content: `${coinProperties.tails}`,
    left: 22
})

scene.msg = blessed.message({
    parent: scene.screen,
    top: 6,
    width: 40,
    height: 3,
    left: 2,
    fg: `${sceneProperties.winColor}`,
    border: {
        type: `${sceneProperties.borderType}`,
        fg: `${sceneProperties.winColor}`
    },
    hidden: true
})

scene.submit = blessed.button({
    parent: scene.form,
    name: `${sceneProperties.buttonGameProcess}`,
    content: `${sceneProperties.buttonGameTitle }`,
    top: 9,
    left: 2,
    width: 9,
    shrink: true,
    padding: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    },
    style: {
        bold: true,
        fg: `${sceneProperties.buttonFocusColor}`,
        bg: `${sceneProperties.buttonMainColor}`,
        focus: {
            inverse: true
        }
    }
})

scene.reset = blessed.button({
    parent: scene.form,
    name: `${sceneProperties.buttonResetProcess}`,
    content: `${sceneProperties.buttonResetTitle}`,
    top: 9,
    left: 32,
    width: 9,
    shrink: true,
    hidden: true,
    padding: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
    },
    style: {
        bold: true,
        fg: `${sceneProperties.buttonFocusColor}`,
        bg: `${sceneProperties.buttonMainColor}`,
        focus: {
            inverse: true
        }
    }
})

scene.submit.on(`${sceneProperties.buttonAction}`, function () {
    scene.form.submit();
})

scene.reset.on(`${sceneProperties.buttonAction}`, function () {
    scene.form.reset();
})

scene.box = blessed.box({
    parent: scene.screen,
    width: 38,
    height: 15,
    left: 44,
    keys: true,
    vi: true,
    border: {
        type: `${sceneProperties.borderType}`,
        fg: `${sceneProperties.mainColor}`
    }
})

scene.image = blessed.image({
    parent: scene.box,
    width: 36,
    height: 13,
    type: `${sceneProperties.imageType}`,
    file: "../../resources/coin.gif",
    animate: false
})

scene.boxRes = blessed.box({
    parent: scene.screen,
    width: 24,
    height: 15,
    left: 82,
    keys: true,
    vi: true,
    border: {
        type: `${sceneProperties.borderType}`,
        fg: `${sceneProperties.mainColor}`
    }
})

scene.titleRes = blessed.text({
    parent: scene.boxRes,
    content: `${sceneProperties.nameResult}`,
    left: 3,
    fg: `${sceneProperties.mainColor}`,
    bold: true
})

scene.gameCnt = blessed.text({
    parent: scene.boxRes,
    left: 3,
    top: 3
})

scene.winCnt = blessed.text({
    parent: scene.boxRes,
    left: 3,
    top: 5
})

scene.loseCnt = blessed.text({
    parent: scene.boxRes,
    left: 3,
    top: 7
})

scene.winRatio = blessed.text({
    parent: scene.boxRes,
    left: 3,
    top: 9
})

scene.winChain = blessed.text({
    parent: scene.boxRes,
    left: 2,
    top: 9
})

scene.winRes = blessed.text({
    parent: scene.boxRes,
    left: 4,
    top: 11,
    bold: true
})

scene.screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
})


module.exports = () => {
    return scene
}