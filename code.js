const destinationTable = require('./tables/destinationTable');
const computationTable = require('./tables/computationTable');
const jumpTable = require('./tables/jumpTable');

const nullCode = '000';

class Code {
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
            return jumpTable(jmp)
        }
        return nullCode;
    }

    completeBites(location){
        const currBiteNumber = location .length;
        const leftBiteNumber = 15 - currBiteNumber;
        return `${'0'.repeat(leftBiteNumber)}${location}`;
    }

    getInstructionCode(command){
        if(command.type === 'A'){
            let address = parseInt(command.symbol)
            return  `0${this.completeBites(address.toString(2))}`; 
        }
        if(command.type === 'C'){
            const dest = this.getDestinationCode(command.destination)
            const comp = this.getComputationCode(command.computation);
            const jmp = this.getJumpCode(command.jump);
            
            return `111${comp}${dest}${jmp}`;
        }

    }
}

module.exports = Code;