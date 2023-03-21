/** @type {HTMLCanvasElement} */

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
let canvasSize;
let elementsSize;





function startGame() {
    
    
    game.font = elementsSize + 'px sans-serif';
    game.textAlign = "end";
    
    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {

            game.fillText(emojis["O"], elementsSize * col, elementsSize * row); 
        }
                        
    }

    
}

function setCanvasSize() {

  
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8;
    } 

    console.log('width: ' + window.innerWidth)
    console.log('height: ' + window.innerHeight)
     
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    elementsSize = canvasSize / 10;

    startGame();

    
    
}





