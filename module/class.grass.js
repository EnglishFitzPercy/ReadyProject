var Base = require("./Base");

module.exports = class Grass extends Base {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 0;
    }
    mul(a) {
        this.multiply++;
        var Search = this.chooseCell(0);
        var newCell = Search[Math.floor(Math.random() * Search.length)];
        if (this.multiply >= a && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}