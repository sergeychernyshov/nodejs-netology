const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const consoleGame = (targetNumber,maxValue) =>{
    rl.question(`Введите число от 0 до ${maxValue}:`,(userSetString) => {
        userNumber = parseInt(userSetString)
        var result
        if( isNaN(userNumber)){
            if(userSetString === 'exit'){
                result = "Вы покидаете игру"
            }else {
                result = "Вы ввели не числовое значение"
            }
        }else{
            if(userNumber>targetNumber){
                result = "Меньше"
            }else{
                if(userNumber<targetNumber){
                    result = "Больше"
                }else{
                    result = `Отгадано число ${targetNumber}`
                }
            }
        }
        console.log(result)
        if (!(userNumber === targetNumber || userSetString === 'exit')){
            consoleGame(targetNumber,maxValue)
        }else{
            rl.close()
        }
    })
}

const game = () => {
    const maxValue = 100
    const targetNumber = Math.round(Math.random() * maxValue);
    console.log(`Загадано число в диапазоне от 0 до ${maxValue}`)
    consoleGame(targetNumber,maxValue)
}

game()




