/* TODO: Use timer to get delta and limit FPS instead of setInterval. 
         This allows movement code to work for any framerate by 
         working out how fast we want to move and only updating position
         at a certain interval, this can then be independant of graphics drawing
         giving us a smoother experience. For more read here:
         http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/index.html */

/* TODO: Work out canvas size and tile size that gives us smooth gameplay 
         and allows at least 4 players on screen at once */

var FPS = 50.0;
var TILESIZE = 10;

var interval;
var x;
var y; 
var direction;
var mapArray;
var canvas;
var context;

/* Called once the body of the HTML has loaded 
   (can also call whenever you need to reset the game) */
function loadGame(){
	/* Stop any previous instance of the running game (makes reset work) */
	clearInterval(interval);

	/* Initialise draw object variables */
	interval = null;
	canvas = document.getElementById("game");
	context = canvas.getContext("2d");

	/* Initialise player variables */
	x = (canvas.width/TILESIZE)/2;
	y = (canvas.height/TILESIZE)/2;
	direction = -1;

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

	/* Draw the screen once so the player knows the game is ready.
	   This could be replaced with show title screen or some animation */
	drawGrid();
	drawPlayer();
	
}

/* Main game loop called 'FPS'-times per second */
function mainLoop(){
	/* Game Logic: Move player and update grid */

	mapArray[x][y] = 1;
	if(direction == 0){
		x+=1;
	} else if (direction == 1){
		y-=1;
	} else if (direction == 2){
		x-=1;
	} else {
		y+=1;
	}

	/* Check for end game conditions */
	if(x > canvas.width/TILESIZE-1 || x < 0 || y > canvas.height/TILESIZE-1 || y < 0 || mapArray[x][y] == 1)
		loadGame();

	/* Screen drawing code */
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	drawPlayer();
}

/* Populate screen with squares for each grid element that has been covered
   already */
function drawGrid(){
	for(var i = 0; i < mapArray.length; i++){
		for(var j = 0; j < mapArray[i].length; j++){
			/* Draws a grid */
			 context.strokeStyle = "#222222";
		 	   context.lineWidth   = 1;
		 	   context.strokeRect(i*TILESIZE,j*TILESIZE, TILESIZE,TILESIZE); 

		 	/* Draw squares that have been covered */
			if(mapArray[i][j] == 1){
				context.fillStyle = "#FF0000";
				context.fillRect(i*TILESIZE,j*TILESIZE,TILESIZE,TILESIZE);
			}
	  
		}
	}
}

/* Draw square for current player position */
function drawPlayer(){
	context.fillStyle = "#FF0000";
	context.fillRect(x*TILESIZE,y*TILESIZE,TILESIZE,TILESIZE);
}

/* Key listener for keyboard input, if the game hasn't started yet (interval == null)
   then the first key input will start the game. This is to emulate BMTron style of gameplay */
function keyDownEvent(keyEvent){
  switch (keyEvent.keyCode) {
    case 38:  /* Up arrow was pressed */
    	if(direction != 3)
			direction = 1;
		if(!interval)
			interval  = setInterval(mainLoop,1000/FPS);
		break;
    case 40:  /* Down arrow was pressed */
    	if(direction != 1)
  			direction = 3;
		if(!interval)
			interval  = setInterval(mainLoop,1000/FPS);
		break;
    case 37:  /* Left arrow was pressed */
    	if(direction != 0)
  			direction = 2;
		if(!interval)
			interval  = setInterval(mainLoop,1000/FPS);
		break;
    case 39:  /* Right arrow was pressed */
    	if(direction != 2)
  			direction = 0;
		if(!interval)
			interval  = setInterval(mainLoop,1000/FPS);
		break;
  }
}