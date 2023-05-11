/** @type {HTMLCanvasElement} */

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let level = 0;
let lives = 3;

let timeStart; 
let timePlayer;
let timeInterval;

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const counterLives = document.querySelector("#lives");
const timer = document.querySelector('#times');
const record = document.querySelector('#record')
const mensaje = document.querySelector('#mensaje');
const mensaje2 = document.querySelector('#mensaje2')


const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let bombsPositions = [];

let canvasSize;
let elementsSize;


// console.log(elementsMap);

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

document.addEventListener("keydown", (e) => {
  let key = e.key;

  switch (key) {
    case "ArrowUp":
      moveUp();
      break;

    case "ArrowLeft":
      moveLeft();
      break;

    case "ArrowRight":
      moveRight();
      break;

    case "ArrowDown":
      moveDown();
      break;

    default:
      break;
  }
});

btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveUp() {
  console.log(canvasSize);
  console.log(playerPosition);

  if (playerPosition.y <= (canvasSize / 10) * 2) {
    playerPosition.y = (canvasSize / 10) * 2;
  }
  playerPosition.y -= elementsSize;
  startGame()
}

function moveLeft() {
  console.log(canvasSize);
  console.log(playerPosition);

  if (playerPosition.x <= canvasSize / 10) {
    playerPosition.x = elementsSize * 2;
  }

  playerPosition.x -= elementsSize;
  startGame()
}

function moveRight() {
  console.log(canvasSize);
  console.log(playerPosition);

  if (playerPosition.x >= canvasSize) {
    playerPosition.x = canvasSize - elementsSize;
  }

  playerPosition.x += elementsSize;
  startGame()
}

function moveDown() {
  console.log(canvasSize);
  console.log(playerPosition);

  if (playerPosition.y >= canvasSize) {
    playerPosition.y = playerPosition.y - elementsSize;
  }
  playerPosition.y += elementsSize;
  startGame()
}

function startGame() {
  mensaje.innerHTML = '';
  mensaje2.innerHTML = '';
  game.font = elementsSize + "px sans-serif";
  game.textAlign = "end";

  const map = maps[level];
  if(!map){
    gameWin();
    return;
  }

  if(!timeStart){
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100)
  }

  if (lives === 0) {
    lives = 3
    gameOver();   
    return
  }



  const mapsRows = map.trim().split("\n");
  const elementsMap = mapsRows.map((row) => row.trim().split(""));
  game.clearRect(0, 0, canvasSize, canvasSize);
  bombsPositions = [];

 

  elementsMap.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col === "O" && playerPosition.x === undefined) {
        playerPosition.x = posX;
        playerPosition.y = posY;
      } else if (col === "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col === "X") {
        bombsPositions.push({
          x: posX,
          y: posY,
        });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  record.innerHTML = localStorage.record_time
  showLives();
  movePlayer();
}



function movePlayer() {
  if (
    playerPosition.x.toFixed(3) === giftPosition.x.toFixed(3) &&
    playerPosition.y.toFixed(3) === giftPosition.y.toFixed(3)
  ) {
    return levelWin();    
    
  } else {
    for (let i = 0; i < bombsPositions.length; i++) {
      if (
        playerPosition.x.toFixed(3) === bombsPositions[i].x.toFixed(3) &&
        playerPosition.y.toFixed(3) === bombsPositions[i].y.toFixed(3)
      ) {
        game.fillText(emojis["BOMB_COLLISION"],playerPosition.x.toFixed(3), playerPosition.y.toFixed(3))
        return setTimeout(missingLives, 200);
      }
    }
  }

  game.fillText(
    emojis["PLAYER"],
    playerPosition.x.toFixed(3),
    playerPosition.y.toFixed(3)
  );
}

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame();
}

function levelWin() {
  level++;
  startGame()
}

function missingLives() {
  console.log("Haz Colisionado!!!");
  lives--
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame()
}

function gameWin() {
  mensaje.innerHTML = 'Felicidades, has ganado el juego 🏆';
  game.fillText(emojis['WIN'], playerPosition.x.toFixed(3), playerPosition.y.toFixed(3))
  clearInterval(timeInterval)

  const recordTime = localStorage.getItem('record_time');
  // const playerTime = ((Date.now() - timeStart) / 1000).toFixed(2);

  if (recordTime) {
    if (recordTime >= timer.innerHTML) {
      localStorage.setItem('record_time', timer.innerHTML)
      mensaje2.innerHTML = 'Felicidades, has Superado el Record!! 🎉🎉🎉🎈🎈🎈'
    }else {
      mensaje2.innerHTML = 'Lo siento, no has superado el record 💔🥹, pero sigue intentándolo'
    }
  }else {
    localStorage.setItem('record_time', timer.innerHTML)
    
  }
  return
}

function showLives() {
  counterLives.innerHTML = emojis['HEART'].repeat(lives);
}

function gameOver() {
  game.clearRect(0, 0, canvasSize, canvasSize);
  console.log('GAME OVER');
  level = 0;
  clearInterval(timeInterval)
  timeStart = undefined;
  startGame();

}

function showTime() {
  timer.innerHTML = ((Date.now() - timeStart) / 1000).toFixed(2)
}


