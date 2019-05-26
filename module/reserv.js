class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [

            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 10 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewCoordinates() {
        this.directions =
            [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy == 17 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            animalArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 8;
        }
        else {
            var newCell = random(this.chooseCell(1));
            if (this.energy == 17 && newCell) {
                var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
                animalArr.push(newGrassEater);
                matrix[newCell[1]][newCell[0]] = 2;
                this.energy = 8;
                for (var i in grassArr) {
                    if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

    eat() {
        if (this.energy > 0 && this.energy < 17) {
            var newCell = random(this.chooseCell(1));
            if (newCell && matrix[newCell[1]][newCell[0]] == 1) {
                matrix[newCell[1]][newCell[0]] = 2;
                matrix[this.y][this.x] = 0;
                this.y = newCell[1];
                this.x = newCell[0];

                this.energy++;

                for (var i in grassArr) {
                    if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

            }
            else {
                this.move();
            }
        }
        else if (this.energy >= 17) {
            this.mul();
        }
        else if (this.energy <= 0) {
            this.die();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in animalArr) {
                if (this.x == animalArr[i].x && this.y == animalArr[i].y) {
                    animalArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    move() {

        var newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[newCell[1]][newCell[0]] = 2;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            this.energy--;

        }
    }
}

class GrassEaterEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 50;
        this.index = index;
        this.directions = [];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewCoordinates() {
        this.directions =
            [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 60 && newCell) {
            var newGrassEaterEater = new GrassEaterEater(newCell[0], newCell[1], this.index);
            HanimalArr.push(newGrassEaterEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 50;
        }
        else if (this.energy >= 60) {
            var newCell = random(this.chooseCell(1));
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
            var newCell = random(this.chooseCell(2));
            if (newCell && matrix[newCell[1]][newCell[0]] == 2) {
                matrix[newCell[1]][newCell[0]] = 3;
                matrix[this.y][this.x] = 0;
                this.y = newCell[1];
                this.x = newCell[0];
                this.energy = this.energy + 5;

                for (var i in animalArr) {
                    if (newCell[0] == animalArr[i].x && newCell[1] == animalArr[i].y) {
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


    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in HanimalArr) {
                if (this.x == HanimalArr[i].x && this.y == HanimalArr[i].y) {
                    HanimalArr.splice(i, 1);
                    break;
                }
            }
        }

    }


    move() {


        var newCell = random(this.chooseCell(1));
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
        } else {
            var newCell = random(this.chooseCell(0));
            matrix[newCell[1]][newCell[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];
            this.energy--;

        }

    }

}


class Poacher {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [];
        this.animalCount = 0;
        this.HanimalCount = 0;
        this.angle = [0, 4];

    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    getNewCoordinates() {
        this.directions =
            [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
    }

    hunt() {

        var newCell = random(this.chooseCell(2));
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
            var newCell = random(this.chooseCell(3));
            if (newCell) {
                matrix[newCell[1]][newCell[0]] = 4;
                matrix[this.y][this.x] = 0;
                this.y = newCell[1];
                this.x = newCell[0];
                this.HanimalCount++;
                for (var i in HanimalArr) {
                    if (newCell[0] == HanimalArr[i].x && newCell[1] == HanimalArr[i].y) {
                        HanimalArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (this.animalCount + this.HanimalCount >= 10) {
            this.run();
        }
        else {
            this.move();
        }
    }

    move() {

        var newCell = random(this.chooseCell(1));
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
            var newCell = random(this.chooseCell(0));
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
            var k = random(this.angle);
            var m = random(this.angle);
            if (matrix[k][m] == 0) {
                var newPoacher = new Poacher(m, k, this.index);
                poacherArr.push(newPoacher);
                matrix[k][m] = 4;
                break;
            }
        }
    }
}
class Policeman {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [];

        this.angle = [0, 4];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewCoordinates() {
        this.directions =
            [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
    }

    hunt() {

        var newCell = random(this.chooseCell(4));
        if (newCell && matrix[newCell[1]][newCell[0]] == 4) {

            matrix[newCell[1]][newCell[0]] = 5;
            matrix[this.y][this.x] = 0;
            this.y = newCell[1];
            this.x = newCell[0];

            var newanimalCell = random(this.chooseCell(0));
            var animalorHanimal = random(0, 1);

            if (animalorHanimal >= 0.5) {
                for (var i = 0; i < 2; i++) {
                    var newGrassEater = new GrassEater(newanimalCell[0], newanimalCell[1], this.index);
                    animalArr.push(newGrassEater);
                    matrix[newanimalCell[1]][newanimalCell[0]] = 2;
                }
            }

            else if (animalorHanimal < 0.5) {
                var newGrassEaterEater = new GrassEaterEater(newanimalCell[0], newanimalCell[1], this.index);
                HanimalArr.push(newGrassEaterEater);
                matrix[newanimalCell[1]][newanimalCell[0]] = 3;
            }

            var k = random(this.angle);
            var m = random(this.angle);

            for (var i = 0; i < 10; i++) {

                var k = random(this.angle);
                var m = random(this.angle);

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
        else {
            this.move();
        }

    }
    move() {
            var newCell = random(this.chooseCell(1));
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
                var newCell = random(this.chooseCell(0));
                if (newCell) {
                    matrix[newCell[1]][newCell[0]] = 5;
                    matrix[this.y][this.x] = 0;
                    this.y = newCell[1];
                    this.x = newCell[0];
                }

           }
        }
}