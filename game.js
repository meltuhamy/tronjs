var FPS = 50;
var TILESIZE = 10;
var interval;
var x;
var y;
var direction;
var mapArray;
var canvas;
var context;
function loadGame() {
    clearInterval(interval);
    interval = null;
    canvas = document.getElementById("game");
    context = canvas.getContext("2d");
    x = (canvas.width / TILESIZE) / 2;
    y = (canvas.height / TILESIZE) / 2;
    direction = -1;
    mapArray = new Array(canvas.width / TILESIZE);
    for(var i = 0; i < mapArray.length; i++) {
        mapArray[i] = new Array(canvas.height / TILESIZE);
        for(var j = 0; j < mapArray[i].length; j++) {
            mapArray[i][j] = 0;
        }
    }
    window.addEventListener('keydown', keyDownEvent, true);
    drawGrid();
    drawPlayer();
}
function mainLoop() {
    mapArray[x][y] = 1;
    if(direction == 0) {
        x += 1;
    } else {
        if(direction == 1) {
            y -= 1;
        } else {
            if(direction == 2) {
                x -= 1;
            } else {
                y += 1;
            }
        }
    }
    if(x > canvas.width / TILESIZE - 1 || x < 0 || y > canvas.height / TILESIZE - 1 || y < 0 || mapArray[x][y] == 1) {
        loadGame();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
}
function drawGrid() {
    for(var i = 0; i < mapArray.length; i++) {
        for(var j = 0; j < mapArray[i].length; j++) {
            context.strokeStyle = "#222222";
            context.lineWidth = 1;
            context.strokeRect(i * TILESIZE, j * TILESIZE, TILESIZE, TILESIZE);
            if(mapArray[i][j] == 1) {
                context.fillStyle = "#FF0000";
                context.fillRect(i * TILESIZE, j * TILESIZE, TILESIZE, TILESIZE);
            }
        }
    }
}
function drawPlayer() {
    context.fillStyle = "#FF0000";
    context.fillRect(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE);
}
function keyDownEvent(keyEvent) {
    switch(keyEvent.keyCode) {
        case 38: {
            if(direction != 3) {
                direction = 1;
            }
            if(!interval) {
                interval = setInterval(mainLoop, 1000 / FPS);
            }
            break;

        }
        case 40: {
            if(direction != 1) {
                direction = 3;
            }
            if(!interval) {
                interval = setInterval(mainLoop, 1000 / FPS);
            }
            break;

        }
        case 37: {
            if(direction != 0) {
                direction = 2;
            }
            if(!interval) {
                interval = setInterval(mainLoop, 1000 / FPS);
            }
            break;

        }
        case 39: {
            if(direction != 2) {
                direction = 0;
            }
            if(!interval) {
                interval = setInterval(mainLoop, 1000 / FPS);
            }
            break;

        }
    }
}
