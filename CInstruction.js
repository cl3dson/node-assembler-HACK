class CInstruction{
    constructor(value){
        const firstBreak = value.split('=');
        this.destination = firstBreak.length > 1 ? firstBreak[0] : null;
        
        const computationAndJump = firstBreak.length > 1 ? firstBreak[1] : firstBreak[0]
        const secondBreak = computationAndJump.split(';');
        this.computation = secondBreak[0];
        this.jump = secondBreak.length > 1 ? secondBreak[1] : null

        this.type = 'C';
    }
}

module.exports = CInstruction