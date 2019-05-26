var Base = require("./Base");
module.exports = class Poacher extends Base {
    constructor(x, y, index) {
        super(x, y, index);
        this.animalCount = 0;
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    hunt() {
        var Search = this.chooseCell(2);
        var newCell = Search[Math.floor(Math.random() * Search.length)];
        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 4;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            this.animalCount++;
            for (var i in animalArr) {
                if (newCell[0] == animalArr[i].x && newCell[1] == animalArr[i].y) {
                    animalArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            var Search = this.chooseCell(3);
            var newCell = Search[Math.floor(Math.random() * Search.length)];
            if (newCell) {
                matrix[newCell[1]][newCell[0]] = 4;
                matrix[this.y][this.x] = 0;
                this.y = newCell[1];
                this.x = newCell[0];
                this.animalCount++;
                for (var i in HanimalArr) {
                    if (newCell[0] == HanimalArr[i].x && newCell[1] == HanimalArr[i].y) {
                        HanimalArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (this.animalCount >= 10) {
            this.run();
        }
        else {
            this.move();
        }
    }

    move() {

        var Search = this.chooseCell(1);
        var newCell = Search[Math.floor(Math.random() * Search.length)];
        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 4;
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
                matrix[newCell[1]][newCell[0]] = 4;
                matrix[this.y][this.x] = 0;
                this.y = newCell[1];
                this.x = newCell[0];

            }

        }
    }
    run() {
        matrix[this.y][this.x] = 0;
        for (var i in poacherArr) {
            if (this.x == poacherArr[i].x && this.y == poacherArr[i].y) {
                poacherArr.splice(i, 1);
                break;
            }
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
    }
}
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

