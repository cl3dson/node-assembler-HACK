const Parser = require('./parser')
const Code = require('./code');

const parser = new Parser(process.argv[2]);
const coder = new Code();

(async () => {
    await parser.readline();
    while(parser.currentCommand){
        const code = coder.getInstructionCode(parser.currentCommand)
        console.log(code);
        await parser.readline();
    }
})()
