const fs = require('fs')
const readline = require('readline');

const AInstruction = require('./Ainstruction');
const CInstruction = require('./CInstruction');

class Parser {
    constructor(path){ 
        let currentCommand;
        this.rl = readline.createInterface({
            input: fs.createReadStream(path),
            crlfDelay: Infinity
        })
    }

    async readline(){
        let lineContent = (await this.rl[Symbol.asyncIterator]().next()).value
        this.rl[Symbol.asyncIterator]().stream.removeAllListeners()

        if(!lineContent){
            this.currentCommand = false;
            return;
        }
        while(lineContent.indexOf('//') == 0 || !lineContent){
            lineContent = (await this.rl[Symbol.asyncIterator]().next()).value
        }
        if(lineContent.indexOf('@') == 0){
            this.currentCommand =  new AInstruction(lineContent.slice(1))
        }else{
            this.currentCommand =  new CInstruction(lineContent)
        }
    }
}

module.exports = Parser



