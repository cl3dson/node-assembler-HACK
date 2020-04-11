class AInstruction{

    constructor(symbol){
        this.symbol = symbol;
        this.type = 'A'
    }

    isPseudoInstruction(){
        return false;
    }
}

module.exports = AInstruction