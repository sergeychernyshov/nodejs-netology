const date = require('date-and-time');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .alias('year', 'y')
    .alias('month', 'm')
    .alias('date', 'd')
    .alias('hours', 'h')
    .alias('secund', 's')
    .argv
delete argv["$0"]

/***current***/
const currentDateFormat = (resultData) => {
    const delimiter = " "
    return resultData["year"].toString()
         + (resultData["year"].toString().length>0?delimiter:"")
         + resultData["month"].toString()
         + (resultData["month"].toString().length>0?delimiter:"")
         + resultData["date"].toString()
         + (resultData["date"].toString().length>0?delimiter:"")
         + resultData["hours"]
         + (resultData["hours"].toString().length>0?delimiter:"")
         + resultData["minutes"].toString()
         + (resultData["minutes"].toString().length>0?delimiter:"")
         + resultData["secunds"].toString()
}
const currentDate = (argv) => {
    var resultData = {"year":"","month":"","date":"","hours":"","minutes":"","secunds":""}
    var result
    var nowDate = new Date()
    var setArgument = false
    for (const key in argv) {
        const value = argv[key]
        if(key === "year"){
            resultData["year"] = nowDate.getFullYear()
            setArgument = true
        }
        if(key === "month"){
            resultData["month"] = nowDate.getMonth() + 1
            setArgument = true
        }
        if(key === "date"){
            resultData["date"] = nowDate.getDate()
            setArgument = true
        }
        if(key === "hours"){
            resultData["hours"] = nowDate.getHours()
            setArgument = true
        }
        if(key === "minutes"){
            resultData["minutes"] = nowDate.getMinutes()
            setArgument = true
        }
        if(key === "secunds"){
            resultData["secunds"] = nowDate.getSeconds()
        setArgument = true
        }
    }

    if(setArgument){
        result = currentDateFormat(resultData)
    }else{
        result = nowDate
    }
    return result
}

/***add sign = 1 or sub sign = -1 ***/
const calcDate = (argv, sign) => {
    var resultDate = new Date()
    for (const key in argv) {
        const value = argv[key]
        if (key === "year") {
            resultDate = date.addYears(resultDate, sign * value);
        }
        if (key === "month") {
            resultDate = date.addMonths(resultDate, sign * value);
        }
        if (key === "date") {
            resultDate = date.addDays(resultDate, sign * value);
        }
        if (key === "hours") {
            resultDate = date.addHours(resultDate, sign * value);
        }
        if (key === "minutes") {
            resultDate = date.addMinutes(resultDate, sign * value);
        }
        if (key === "secunds") {
            resultDate = date.addSeconds(resultDate, sign * value);
        }
    }
    return resultDate
}

const run = () => {
    const actionKey = "_"
    const variation  = argv[actionKey][0]
    if (argv[actionKey].length !== 1) {
        console.log("не правильные аргументы")
        process.exit(-1)
    } else {
        delete argv[actionKey]
    }

    var result
    switch (variation) {
        case "current":
            result = currentDate(argv)
            break
        case "add":
            result = calcDate(argv, 1)
            break
        case "sub":
            result = calcDate(argv, -1)
            break
    }
    console.log("time>"+result)
}

run()


