/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize = window.innerHeight > window.innerWidth ? (window.innerWidth * 0.75) : (window,innerHeight * 0.75);
let elementsSize = canvasSize / 10;

window.addEventListener('load', startGame);
window.addEventListener('resize', renderMap);



function renderMap() {
   
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    console.log ({canvasSize, elementsSize});

    
}






function startGame() {
    // game.fillRect(20,20,100,100);
    // game.clearRect(0,0,50,50)
    
    // game.font = '28px sans-serif';
    // game.fillStyle = '#B46060';
    // game.textAlign = 'start';
    // game.fillText('Hola Mundo', 100, 50);
    
    game.font = elementsSize + 'px sans-serif';
    game.textAlign = "end";
    
    for (i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize * i, elementsSize);
       
    }   


} 