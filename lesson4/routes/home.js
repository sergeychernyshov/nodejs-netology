const fs = require('fs')
const path = require('path')
const render = (req) =>{
    const fileHeaderPath = path.join(__dirname,'..','layout','header.html')
    const fileBodyPath = path.join(__dirname,'..','layout','body.html')
    const fileFooterPath = path.join(__dirname,'..','layout','footer.html')
    const fileJsPath = path.join(__dirname,'..','public','js.html')

    const pageHeaderHtml = fs.readFileSync(fileHeaderPath,'utf-8')
    const pageBodyHtml = fs.readFileSync(fileBodyPath,'utf-8')
    const js = fs.readFileSync(fileJsPath,'utf-8')
    const pageFooterHtml = fs.readFileSync(fileFooterPath,'utf-8')

    return pageHeaderHtml + pageBodyHtml + js + pageFooterHtml
}

module.exports = render