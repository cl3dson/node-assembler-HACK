const fs = require('fs')
const readline = require('readline');

const AInstruction = require('./Ainstruction');
const CInstruction = require('./CInstruction');
const PseudoInstruction = require('./LabelPseudoInstruction')

const LABEL_REGEX = /^\((.*)\)$/

class Parser {
    constructor(path){ 
        let currentCommand;
        this.path = path;
        this.rl = readline.createInterface({
            input: fs.createReadStream(this.path),
            crlfDelay: Infinity
        })
    }

    resetCursor(){
        this.currentCommand = null;
        this.rl =readline.createInterface({
            input: fs.createReadStream(this.path),
            crlfDelay: Infinity
        })
    }

    cleanCommand(dirtyCommand){
        let cmd = dirtyCommand.trim()
        cmd = cmd.split("//")[0]
        return cmd.trim();
    }

    async readline(skipLabels=false){
        let lineContent = (await this.rl[Symbol.asyncIterator]().next()).value
        this.rl[Symbol.asyncIterator]().stream.removeAllListeners()

        if(!lineContent){
            this.currentCommand = false;
            return;
        }
        //option to skip label declarations at secound round
        while(lineContent.indexOf('//') == 0 || !lineContent || (lineContent.trim().match(LABEL_REGEX) && skipLabels)){
            lineContent = (await this.rl[Symbol.asyncIterator]().next()).value
        }

        if(lineContent.trim().indexOf('@') == 0){
            this.currentCommand =  new AInstruction(this.cleanCommand(lineContent).slice(1))
        }
        else if(lineContent.trim().match(LABEL_REGEX)){
            this.currentCommand = new PseudoInstruction(this.cleanCommand(lineContent))
        }
        else{
            this.currentCommand =  new CInstruction(this.cleanCommand(lineContent))
        }
    }
}

module.exports = Parser



