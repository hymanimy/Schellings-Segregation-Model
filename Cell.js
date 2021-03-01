class Cell{
    constructor(type, board, proportionOfSatisfaction, r, c){
        this.type = type;    // "Types can be red, blue or green (empty)"
        this.board = board; 
        this.proportionOfSatisfaction = proportionOfSatisfaction; 
        this.r = r; 
        this.c = c; 
    }

    satisfied(){

        if(this.type === "Green"){
            return true; 
        }
        
        let similarNeighbourCount = 0;
        let totalNeighbourCount = 8;  

        // Loop over neighbours
        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                if(!(i === 0 && j === 0)){ // Dont check self
                    
                    if(!this.board.inBounds(this.r + i, this.c + j)){
                        // Don't count empty spaces or out of bounds cells
                        totalNeighbourCount--; 
                        continue; 
                    } 

                    let neighbour = this.board.grid[this.r + i][this.c + j]; 
                    if(neighbour.type == "Green"){
                        totalNeighbourCount--; 
                    } 
                    else if(this.type == neighbour.type){
                        similarNeighbourCount++; 
                    }
                }                
            }
        }

        let proportion = similarNeighbourCount/totalNeighbourCount; 
        return proportion >= this.proportionOfSatisfaction; 
    
    }

    findEmptySpace(){
        // From Cell at (r, c) keeps moving forward until it finds an empty space in grid. 
        // If we hit end of array, go back to the beginning.
        
        let i = this.r; 
        let j = (this.c + 1) % this.board.cols; // Move to the next cell or wrap round to next row
        if(j == 0){
            i = (i + 1) % this.board.rows; // If we have finished row, go down to the next row or wrap round to beginning using modulo
        }
        
        let cell = this.board.grid[i][j]; 
        while(cell.type != "Green"){
            j = (j + 1) % this.board.cols; 
            if(j == 0){
                i = (i + 1) % this.board.rows; 
            }
            cell = this.board.grid[i][j]; 
        } 

        return [i, j]; 
    }
}