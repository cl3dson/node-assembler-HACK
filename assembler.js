const fs = require('fs');

const Parser = require('./parser')
const Code = require('./code');

const fileName = process.argv[2]
const parser = new Parser(fileName);
const coder = new Code();

(async () => {
    await parser.readline();
    const hackFile = fs.createWriteStream(`${fileName.replace('.asm','')}.hack`,{flags:'w+'})
    while(parser.currentCommand){
        const code = coder.getInstructionCode(parser.currentCommand)
        hackFile.write(`${code}\n`)
        await parser.readline();
    }
    hackFile.close();
})()
