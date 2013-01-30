// TODO : MID WAY THROUGH PLAYER CLASS, FINISH DECOUPLING PLAYER.

var SPEED = 30.0;
var TILESIZE = 5;
var DIRECTIONS = {RIGHT:0,UP:1,LEFT:2,DOWN:3};

var mapArray;
var canvas;
var context;
var loops = 0;
var skipTicks = 1000 / SPEED;
var maxFrameSkip = 10;
var nextGameTick = (new Date).getTime();
var player;

function drawSquare(x:number, y:number, color: string){
  context.fillStyle = color;
  context.fillRect(x*TILESIZE,y*TILESIZE,TILESIZE,TILESIZE);
}


/* Called once the body of the HTML has loaded */
function loadGame(){
	/* Initialise draw object variables */
	canvas = document.getElementById("game");
	context = canvas.getContext("2d");

	/* Initialise array of covered squares */
	mapArray = new Array(canvas.width/TILESIZE);
	for(var i = 0; i < mapArray.length; i++){
		mapArray[i] = new Array(canvas.height/TILESIZE);
		for(var j = 0; j < mapArray[i].length; j++){
			mapArray[i][j] = 0;
		}
	}

	/* Initialise player variables */
	var x = (canvas.width/TILESIZE)/2;
	var y = (canvas.height/TILESIZE)/2;
	player = new Player(x, y, 1, mapArray);
	
	/* Prepare the key listener */
	window.addEventListener('keydown',keyDownEvent,true);

	/* Begin the game loop */
	onEachFrame(mainLoop);
}

/* Reset the game state */
function resetGame(){
	loops = 0;
	skipTicks = 1000 / SPEED;
	maxFrameSkip = 10;
	nextGameTick = (new Date).getTime();

	for(var i = 0; i < mapArray.length; i++){
		for(var j = 0; j < mapArray[i].length; j++){
			mapArray[i][j] = 0;
		}
	}

	var x = (canvas.width/TILESIZE)/2;
	var y = (canvas.height/TILESIZE)/2;
	player.resetPlayer(x,y);
}

/* Main game loop */
function mainLoop(){

	loops = 0;

	/* Game Logic: Move player and update grid */
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
      player.move();
      nextGameTick += skipTicks;
      loops++;
    }

	/* Screen drawing code */
	context.clearRect(0, 0, canvas.width, canvas.height);
	draw();	
}

function draw(){
	/* Populate screen with squares for each grid element that has been covered
       already */
	for(var i = 0; i < mapArray.length; i++){
		for(var j = 0; j < mapArray[i].length; j++){
			/* Draws a grid */ 
			/*
			context.strokeStyle = "#222222";
		 	context.lineWidth   = 1;
		 	context.strokeRect(i*TILESIZE,j*TILESIZE, TILESIZE,TILESIZE); 
		 	*/

		 	/* Draw squares that have been covered */
			if(mapArray[i][j] == 1){
        drawSquare(i, j, "#FF0000");
			}
	  
		}
	}

	/* Draw square for current player position */
  drawingPoint = player.getDrawingPoint();
  drawSquare(drawingPoint.color, drawingPoint.x, drawingPoint.y);
}

/* Key listener for keyboard input */
function keyDownEvent(keyEvent){
  switch (keyEvent.keyCode) {
    case 38:  /* Up arrow was pressed */
    	if(player.direction != DIRECTIONS.DOWN)
			player.direction = DIRECTIONS.UP;
		break;
    case 40:  /* Down arrow was pressed */
    	if(player.direction != DIRECTIONS.UP)
  			player.direction = DIRECTIONS.DOWN;
		break;
    case 37:  /* Left arrow was pressed */
    	if(player.direction != DIRECTIONS.RIGHT)
  			player.direction = DIRECTIONS.LEFT;
		break;
    case 39:  /* Right arrow was pressed */
    	if(player.direction != DIRECTIONS.LEFT)
  			player.direction = DIRECTIONS.RIGHT;
		break;
  }
}

/* Function that limits how often the update loop gets called
   (based on screen refresh rate). */
(function() {
  var onEachFrame;
  if (window.webkitRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();