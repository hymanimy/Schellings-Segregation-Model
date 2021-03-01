function rect(x, y, w, h, color = "Black"){
    ctx.beginPath(); 
    ctx.fillStyle = color;
    ctx.rect(x, y, w, h); 
    ctx.fill();
    ctx.closePath(); 
}

function clearCanvas(){
    ctx.clearRect(0, 0, width, height);
}

function drawStats(b){
    let stats = b.stats(); 
    let percentageOfSimilarity = stats[0] * 100; 
    let proportionOfSatisfiedCells = stats[1] * 100; // Multiply by 100 to get percentage 
    let gridsize = stats[2]; 

    ctx.font = "20px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Round: " + b.rounds 
                 + " ~ Ratio of Similarity: " + percentageOfSimilarity 
                 + " ~ Satisfied: " + proportionOfSatisfiedCells 
                 + "% ~ Grid Size: " + gridsize,
                 10, 650);

    if(b.finished()){
        ctx.fillText("Finished!", 10, 680); 
    }

}