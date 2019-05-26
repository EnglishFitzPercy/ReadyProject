
var side = 10;

function setup() {
    frameRate(5);
    createCanvas(50 * side + 1, 50 * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }

        }
        for (var i in grassArr) {
            grassArr[i].mul();
        }

        for (var i in animalArr) {
            animalArr[i].eat();
        }
        for (var i in HanimalArr) {
            HanimalArr[i].eat();
        }
        for (var i in poacherArr) {
            poacherArr[i].hunt();
        }
        for (var i in policeArr) {
            policeArr[i].hunt();
        }
    }

}