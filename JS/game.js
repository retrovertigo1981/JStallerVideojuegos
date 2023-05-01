/** @type {HTMLCanvasElement} */

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let level = 0;

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");


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
  game.font = elementsSize + "px sans-serif";
  game.textAlign = "end";

  const map = maps[level];
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
        console.log("Haz Colisionado!!!");
        return game.fillText(
          emojis["BOMB_COLLISION"],
          playerPosition.x.toFixed(3),
          playerPosition.y.toFixed(3)
        );
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
    canvasSize = window.innerWidth * 0.6;
  } else {
    canvasSize = window.innerHeight * 0.6;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function levelWin() {
  level++;
  startGame()
}
