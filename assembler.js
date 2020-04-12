/**
 * Uses Parser and Code Modules to scan the source file and translate 
 * to binary code following HACK language specification
 */


const fs = require('fs');

const Parser = require('./parser')
const Code = require('./code');
const symbolTable = require('./tables/symbolTable')
const LabelPseudoInstruction = require('./LabelPseudoInstruction');

const fileName = process.argv[2]
const parser = new Parser(fileName);

(async () => {
    await parser.readline()
    let currentLine = 0;
    let foundLabels = 0;

    //first read of file (labels search)
    while(parser.currentCommand){
        if(parser.currentCommand instanceof LabelPseudoInstruction){
            symbolTable.set(parser.currentCommand.getSymbol(), currentLine - foundLabels)
            foundLabels++;
        }
        
        await parser.readline()
        currentLine++;
    }

    parser.resetCursor()
    const coder = new Code(symbolTable);

    //second round (translating instructions to 'bynary' code and writing to the .hack file) 
    await parser.readline(true);
    const hackFile = fs.createWriteStream(`${fileName.replace('.asm','')}.hack`,{flags:'w+'})
    while(parser.currentCommand){
        const code = coder.getInstructionCode(parser.currentCommand)
        hackFile.write(`${code}\n`)
        await parser.readline(true);
    }
    hackFile.close();
})()
