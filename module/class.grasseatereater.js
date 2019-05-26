var Base = require("./Base");

module.exports = class GrassEaterEater extends Base {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 50;
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
        var Search = this.chooseCell(0);
        var newCell = Search[Math.floor(Math.random() * Search.length)];
        if (newCell) {
            var newGrassEaterEater = new GrassEaterEater(newCell[0], newCell[1], this.index);
            HanimalArr.push(newGrassEaterEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 50;
        }
        else {
            var Search = this.chooseCell(1);
            var newCell = Search[Math.floor(Math.random() * Search.length)];
            if (newCell) {
                var newGrassEaterEater = new GrassEaterEater(newCell[0], newCell[1], this.index);
                HanimalArr.push(newGrassEaterEater);
                matrix[newCell[1]][newCell[0]] = 3;
                this.energy = 50;
            }

        }
    }

    eat() {
        if (this.energy > 0 && this.energy < 60) {
            var Search = this.chooseCell(2);
            var target = Search[Math.floor(Math.random() * Search.length)];
            if (target) {

                matrix[this.y][this.x] = 0;
                this.y = target[1];
                this.x = target[0];
                matrix[target[1]][target[0]] = 3;
                this.energy = this.energy + 5;

                for (var i in animalArr) {
                    if (target[0] == animalArr[i].x && target[1] == animalArr[i].y) {
                        animalArr.splice(i, 1);
                        break;
                    }
                }

            }
            else {
                this.move();
            }
        }

        else if (this.energy >= 60) {
            this.mul();
        }
        else if (this.energy <= 0) {
            this.die();
        }
    }

    move() {
        var Search = this.chooseCell(1);
        var newCell = Search[Math.floor(Math.random() * Search.length)];
        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 3;

            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            this.energy--;
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
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
                matrix[this.y][this.x] = 3;
            }
            this.energy--;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in HanimalArr) {
            if (this.x == HanimalArr[i].x && this.y == HanimalArr[i].y) {
                HanimalArr.splice(i, 1);
                break;
            }
        }
    }
}