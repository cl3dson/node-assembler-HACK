
const LabelSymbol = /^\((.*)\)$/

class LabelPseudoInstruction {
    constructor(value){
        const isLabelSymbol = value.match(LabelSymbol)
        if(isLabelSymbol){
            this.symbol = isLabelSymbol[1]
        }
    }

    getSymbol(){
        return this.symbol
    }
}

module.exports = LabelPseudoInstruction