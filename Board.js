class Board{
    constructor(rows, cols, ratioOfSimilarity){
        
        // I could incorporate sliders to be able to change these attributes aswell
        // But i believe these stats produce the best results
        this.proportionOfGreens = 0.1;
        this.proportionOfReds   = 0.5; 
        this.ratioOfSimilarity = ratioOfSimilarity;

        this.rows = rows; 
        this.cols = cols; 
        this.gridsize = rows*cols; 

        this.rounds = 0; 

        this.grid = new Array(rows); 
        for(let c = 0; c < cols; c++){
            this.grid[c] = new Array(cols); 
        }

        this.populateGrid(); 
    }

    populateGrid(){
        let numberOfGreens = Math.floor(this.gridsize*this.proportionOfGreens); 
        let numberOfReds   = Math.floor((this.gridsize - numberOfGreens)*this.proportionOfReds); 
        this.randomFill("Green", numberOfGreens);
        this.randomFill("Red", numberOfReds); 
        this.normalFill("Blue"); 
        
    }

    randomFill(type, n){
        // Fills grid with n randomly placed cells of given type
        for(let i = 0; i < n; i++){
            let r, c;

            do {
                r = Board.randomInteger(this.rows);
                c = Board.randomInteger(this.cols); 
            } while(this.grid[r][c] != undefined)

            this.grid[r][c] = new Cell(type, this, this.ratioOfSimilarity, r, c); 
        }
    }

    normalFill(type){
        // Fills the rest of the grid with cells of given type
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                if(this.grid[r][c] === undefined){
                    this.grid[r][c] = new Cell(type, this, this.ratioOfSimilarity, r, c); 
                }
            }
        }
    }

    static randomInteger(n){
        return Math.floor(Math.random() * n)  
    }

    show(){

        let squarePadding = 2; // Padding between squares
        let squareOffSetTop = 10; 
        let squareOffSetLeft = 10;
        let h = 600; 
        let w = 600;
        
        // Calculate how much vertical and width we have after subtracting offsets and padding between squares
        let heightSpacing = (h - 2*squareOffSetTop - (this.rows - 1)*squarePadding)/this.rows; 
        let widthSpacing = (w - 2*squareOffSetLeft - (this.cols - 1)*squarePadding)/this.cols; 
        let squareWidth = Math.min(heightSpacing, widthSpacing); 

        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                let currentCell = this.grid[r][c]; 
                let squareX = c*(squareWidth + squarePadding) + squareOffSetLeft;
                let squareY = r*(squareWidth + squarePadding) + squareOffSetTop;
                rect(squareX, squareY, squareWidth, squareWidth, currentCell.type); 
            }
        }
    }

    inBounds(r, c){
        return r >= 0 && r < this.rows && c >= 0 && c < this.cols; 
    }

    updateCells(){
        let movedAgents = []; 
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                this.updateCell(r, c, movedAgents); 
            }
        } 
        this.rounds++; 
    }

    updateCell(r, c, movedAgents){
        // Switches unsatisfied cell with empty cell
        let cell = this.grid[r][c]; 
        if(movedAgents.includes(cell)){
            // We cannot move an agent twice in one tick. 
            return; 
        }

        if(!cell.satisfied()){
            let emptyRowCol = cell.findEmptySpace();
            let emptyCell = this.grid[emptyRowCol[0]][emptyRowCol[1]]; 
            emptyCell.type = cell.type; // switch the types of the cells
            cell.type = "Green"; 
            movedAgents.push(cell); 
            movedAgents.push(emptyCell); 
        }
    }

    finished(){
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                if(!this.grid[r][c].satisfied()){
                    return false;
                }
            }
        } 
        return true; 
    }

    stats(){
        // Return an array of statistics
        let numberOfSatisfied = 0;
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.cols; c++){
                let cell = this.grid[r][c]; 
                if(cell.satisfied()){
                    numberOfSatisfied++;
                }
            }
        } 
        let percentageOfSatisfaction = numberOfSatisfied/(this.gridsize); 
        
        return [this.ratioOfSimilarity, percentageOfSatisfaction, this.gridsize]
    }
}