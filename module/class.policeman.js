var Base = require("./Base");
var GrassEater = require("./class.eatgrass");
var GrassEaterEater = require("./class.grasseatereater");
var Poacher = require("./class.poacher");

module.exports = class Policeman extends Base {
    constructor(x, y, index) {
        super(x, y, index);
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    hunt() {
        var Search = this.chooseCell(4);
        var newCell = Search[Math.floor(Math.random() * Search.length)];
        if (newCell && matrix[newCell[1]][newCell[0]] == 4) {

            matrix[newCell[1]][newCell[0]] = 5;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];

            var Search = this.chooseCell(0);
            var newCell = Search[Math.floor(Math.random() * Search.length)];
            var animalorHanimal = randomInteger(0, 1);

            if (animalorHanimal >= 0.5) {
                for (var i = 0; i < 2; i++) {
                    var newanimalCell = [];
                    var Search = this.chooseCell(0);
                    var newGrassEater = new GrassEater(newanimalCell[0], newanimalCell[1], this.index);
                    var field = Search[Math.floor(Math.random() * Search.length)];
                    if (field) {
                        matrix[field[1]][field[0]] = 2;
                        animalArr.push(newGrassEater);


                        for (var i = 0; i < 10; i++) {

                            var k = randomInteger(0, 4);
                            var m = randomInteger(0, 4);
        
                            if (matrix[k][m] == 0) {
        
                                var newPoacher = new Poacher(m, k, this.index);
                                poacherArr.push(newPoacher);
                                matrix[k][m] = 4;
        
                                break;
                            }
                        }
                        for (var i in poacherArr) {
        
                            if (newCell[0] == poacherArr[i].x && newCell[1] == poacherArr[i].y) {
                                poacherArr.splice(i, 1);
                                break;
        
                            }
                        }

                    }
                }
            }

            else if (animalorHanimal < 0.5) {
                var newanimalCell = [];
                var Search = this.chooseCell(0);
                var newGrassEaterEater = new GrassEaterEater(newanimalCell[0], newanimalCell[1], this.index);
                var field = Search[Math.floor(Math.random() * Search.length)];
                if (field) {
                    matrix[field[1]][field[0]] = 3;
                    HanimalArr.push(newGrassEaterEater);

                }

                for (var i = 0; i < 10; i++) {

                    var k = randomInteger(0, 4);
                    var m = randomInteger(0, 4);

                    if (matrix[k][m] == 0) {

                        var newPoacher = new Poacher(m, k, this.index);
                        poacherArr.push(newPoacher);
                        matrix[k][m] = 4;

                        break;
                    }
                }
                for (var i in poacherArr) {

                    if (newCell[0] == poacherArr[i].x && newCell[1] == poacherArr[i].y) {
                        poacherArr.splice(i, 1);
                        break;

                    }
                }
            }
        }
        else {
            this.move();
        }

    }
    move() {
        var Search = this.chooseCell(1);
        var newCell = Search[Math.floor(Math.random() * Search.length)];
        if (newCell) {

            matrix[newCell[1]][newCell[0]] = 5;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            var Search = this.chooseCell(0);
            var newCell = Search[Math.floor(Math.random() * Search.length)];
            if (newCell) {
                matrix[newCell[1]][newCell[0]] = 5;
                matrix[this.y][this.x] = 0;
                this.y = newCell[1];
                this.x = newCell[0];
            }

        }
    }
}


function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

