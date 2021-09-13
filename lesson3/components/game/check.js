const {game} = require("../../settings/game.json")

module.exports = (user, pc) => {
    return user === pc ? game.win : game.lose
};