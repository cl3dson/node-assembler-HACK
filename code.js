const destinationTable = require('./tables/destinationTable');
const computationTable = require('./tables/computationTable');
const jumpTable = require('./tables/jumpTable');
const Ainstruction = require('./Ainstruction')
const CInstruction = require('./CInstruction')

const nullCode = '000';

class Code {

    constructor(symbolTable){
        this.symbolTable = symbolTable;
        this.availableVariableAddress = 16
    }

    getDestinationCode(dest){
        if(dest in destinationTable){
            return destinationTable[dest];
        }
        return nullCode;
    }

    getComputationCode(comp){
        if(comp in computationTable){
            return computationTable[comp];
        } 

        return nullCode
    }

    getJumpCode(jmp){
        if(jmp in jumpTable){
            return jumpTable[jmp]
        }
        return nullCode;
    }

    completeBites(location){
        const currBiteNumber = location.length;
        const leftBiteNumber = 15 - currBiteNumber;
        return `${'0'.repeat(leftBiteNumber)}${location}`;
    }

    getInstructionCode(command){
        if(command instanceof Ainstruction){
            let address = parseInt(command.symbol)
            const isIntergerRegex = /^[0-9]*$/
            if(!command.symbol.match(isIntergerRegex)){
                if(this.symbolTable.has(command.symbol)){
                    address = this.symbolTable.get(command.symbol)
                }else{
                    this.symbolTable.set(command.symbol,this.availableVariableAddress)
                    address = this.availableVariableAddress
                    this.availableVariableAddress++
                }
            }
            return  `0${this.completeBites(address.toString(2))}`; 
        }
        else if(command instanceof CInstruction){
            const dest = this.getDestinationCode(command.destination)
            const comp = this.getComputationCode(command.computation);
            const jmp = this.getJumpCode(command.jump);
            
            return `111${comp}${dest}${jmp}`;
        }

    }
}

module.exports = Code;