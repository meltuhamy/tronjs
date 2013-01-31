class Player{
    x: number;
    y: number;
    direction: number;
    id: number;
    mapRef: number[][];
    color: string;
    constructor(startX:number, startY:number, id:number, mapRef: number[][]){
        this.x = startX;
        this.y = startY;
        this.direction = DIRECTIONS.RIGHT;
        this.id = id;
        this.mapRef = mapRef;
        this.color = '#FF0000';
    }
    resetPlayer(startX:number, startY:number){
        this.x = startX;
        this.y = startY;
        this.direction = DIRECTIONS.RIGHT;
    }
    move(){
        this.mapRef[this.x][this.y] = this.id;
        /* Update player position */
        if(this.direction == DIRECTIONS.RIGHT){
            this.x+=1;
        } else if (this.direction == DIRECTIONS.UP){
            this.y-=1;
        } else if (this.direction == DIRECTIONS.LEFT){
            this.x-=1;
        } else if (this.direction == DIRECTIONS.DOWN){
            this.y+=1;
        }

        /* Check for end game conditions */
        if(this.x > canvas.width/TILESIZE-1 || this.x < 0 || this.y > canvas.height/TILESIZE-1 || this.y < 0 || mapArray[this.x][this.y] != 0)
            resetGame();
    }
    getDrawingPoint(){
        return {color: this.color, 
                x: this.x, 
                y: this.y}
    }
}