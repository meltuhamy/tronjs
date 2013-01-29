var SPEED = 30.0;
var TILESIZE = 5;
var DIRECTIONS = {RIGHT:0,UP:1,LEFT:2,DOWN:3};

var x;
var y; 
var direction;
var mapArray;
var canvas;
var context;
var loops = 0;
var skipTicks = 1000 / SPEED;
var maxFrameSkip = 10;
var nextGameTick = (new Date).getTime();


/* Called once the body of the HTML has loaded */
function loadGame(){
	/* Initialise draw object variables */
	canvas = document.getElementById("game");
	context = canvas.getContext("2d");

	/* Initialise player variables */
	x = (canvas.width/TILESIZE)/2;
	y = (canvas.height/TILESIZE)/2;
	direction = DIRECTIONS.RIGHT;

	/* Initialise array of covered squares */
	mapArray = new Array(canvas.width/TILESIZE);
	for(var i = 0; i < mapArray.length; i++){
		mapArray[i] = new Array(canvas.height/TILESIZE);
		for(var j = 0; j < mapArray[i].length; j++){
			mapArray[i][j] = 0;
		}
	}

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
	x = (canvas.width/TILESIZE)/2;
	y = (canvas.height/TILESIZE)/2;
	direction = DIRECTIONS.RIGHT;

	for(var i = 0; i < mapArray.length; i++){
		for(var j = 0; j < mapArray[i].length; j++){
			mapArray[i][j] = 0;
		}
	}
}

/* Main game loop called 'SPEED'-times per second */
function mainLoop(){

	loops = 0;

	/* Game Logic: Move player and update grid */
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
      	mapArray[x][y] = 1;
		if(direction == DIRECTIONS.RIGHT){
			x+=1;
		} else if (direction == DIRECTIONS.UP){
			y-=1;
		} else if (direction == DIRECTIONS.LEFT){
			x-=1;
		} else if (direction == DIRECTIONS.DOWN){
			y+=1;
		}
      nextGameTick += skipTicks;
      loops++;
    }

	/* Check for end game conditions */
	if(x > canvas.width/TILESIZE-1 || x < 0 || y > canvas.height/TILESIZE-1 || y < 0 || mapArray[x][y] == 1)
		resetGame();

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
				context.fillStyle = "#FF0000";
				context.fillRect(i*TILESIZE,j*TILESIZE,TILESIZE,TILESIZE);
			}
	  
		}
	}

	/* Draw square for current player position */
	context.fillStyle = "#FF0000";
	context.fillRect(x*TILESIZE,y*TILESIZE,TILESIZE,TILESIZE);
}

/* Key listener for keyboard input, if the game hasn't started yet (interval == null)
   then the first key input will start the game. This is to emulate BMTron style of gameplay */
function keyDownEvent(keyEvent){
  switch (keyEvent.keyCode) {
    case 38:  /* Up arrow was pressed */
    	if(direction != DIRECTIONS.DOWN)
			direction = DIRECTIONS.UP;
		break;
    case 40:  /* Down arrow was pressed */
    	if(direction != DIRECTIONS.UP)
  			direction = DIRECTIONS.DOWN;
		break;
    case 37:  /* Left arrow was pressed */
    	if(direction != DIRECTIONS.RIGHT)
  			direction = DIRECTIONS.LEFT;
		break;
    case 39:  /* Right arrow was pressed */
    	if(direction != DIRECTIONS.LEFT)
  			direction = DIRECTIONS.RIGHT;
		break;
  }
}

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