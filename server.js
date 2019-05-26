var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


var season = 0;

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


grassArr = [];
animalArr = [];
HanimalArr = [];
poacherArr = [];
policeArr = [];



matrix = []
let a = 0;
let num = 40;
for (var y = 0; y < num; y++) {
    matrix[y] = []
    for (var x = 0; x < num; x++) {
        var rand = Math.random() * 1000;
        if (rand <= 70) a = 1;
        else if (rand <= 975) a = 1;
        else if (rand <= 985) a = 2;
        else if (rand <= 990) a = 3;
        matrix[y][x] = a
    }
}

matrix[23][13] = 4;
matrix[28][13] = 5;
matrix[8][23] = 4;
matrix[17][21] = 5;
matrix[3][11] = 4;
matrix[3][21] = 5;

var Grass = require("./module/class.grass.js");
var GrassEater = require("./module/class.eatgrass.js");
var GrassEaterEater = require("./module/class.grasseatereater.js");
var Poacher = require("./module/class.poacher.js");
var Policeman = require("./module/class.policeman.js");


function creatingObjects() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));

            }
            if (matrix[y][x] == 2) {
                animalArr.push(new GrassEater(x, y, 2))
            }
            if (matrix[y][x] == 3) {
                HanimalArr.push(new GrassEaterEater(x, y, 3))
            }
            if (matrix[y][x] == 4) {
                poacherArr.push(new Poacher(x, y, 4))
            }
            if (matrix[y][x] == 5) {
                policeArr.push(new Policeman(x, y, 5))
            }

        }
    }
}
creatingObjects();


function game() {
    for (var i in grassArr) {
        if (season > 3) {
            grassArr[i].mul(3);
        }
        else { grassArr[i].mul(10); }
    }
    for (var i in animalArr) {

        if (season > 3) {
            animalArr[i].eat(6);
        }
        else { animalArr[i].eat(0); }

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
    season = season + 1;
    if (season > 7) {
        season = 0;
    }
    io.sockets.emit("send matrix", matrix);
}




io.on('connection', function (socket) {
    socket.on('turnhunterintograsseater', function () {
        HanimalArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 3) {
                    animalArr.push(new GrassEater(x, y, 2))
                }
            }
        }

    })
    socket.on('turnpoliceintopoacher', function () {
        policeArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 5) {
                    poacherArr.push(new Poacher(x, y, 4))
                }
            }
        }
    })
});


setInterval(game, 1000);


var statistics = { };

setInterval(function () {
    statistics.GrArr = grassArr.length;
    statistics.GrEatArr = animalArr.length;
    statistics.GrEatEatArr = HanimalArr.length;
    statistics.PoaArr = poacherArr.length;
    statistics.PolArr = policeArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        if (err) throw err;
    })
}, 1000);