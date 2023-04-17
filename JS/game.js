/** @type {HTMLCanvasElement} */

const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let rdm = Math.floor(Math.random() * 3);

const map = maps[rdm];

// console.log(map);

const mapsRows = map.trim().split("\n");
const elementsMap = mapsRows.map((row) => row.trim().split(""));

console.log(elementsMap);

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
let canvasSize;
let elementsSize;

function startGame() {
  game.font = elementsSize + "px sans-serif";
  game.textAlign = "end";

  elementsMap.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1)
      const posY = elementsSize * (rowI + 1)
      game.fillText(emoji, posX , posY);
    });
  });

  //   for (let row = 1; row <= 10; row++) {
  //     for (let col = 1; col <= 10; col++) {
  //       game.fillText(
  //         emojis[elementsMap[row - 1][col - 1]],
  //         elementsSize * col,
  //         elementsSize * row
  //       );
  //     }
  //   }
}

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}
