let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d"); 
let width = canvas.width;
let height = canvas.height;
let board; 
let intervalID; 

function draw(){
    board.updateCells();
    clearCanvas()
    board.show();
    drawStats(board); 
    if(board.finished()){
        stop(); 
    }
}

// These functions can be called by button clicks in the html file

function start(){
    let delay = 500; 
    intervalID = setInterval(draw, delay);
}

function stop(){
    clearInterval(intervalID); 
}

function reset(r = 20, c = 20, ratioOfSimilarity = 0.5){
    stop(); 
    clearCanvas(); 
    board = new Board(r, c, ratioOfSimilarity); 
    board.show(); 
    drawStats(board); 
}

reset();