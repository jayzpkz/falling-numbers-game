import Game from "./game";

import "./styles.css";

// binding canvas html element to variable
const canvas = document.getElementById("gameScreen");
// creating context for the specified canvas html element
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// initializing game operator object
const game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

// game life cycle - loop over clearing the canvas, drawing and updating the game
const gameLoop = (timestamp) => {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // clear canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
};
// requests animation frame from the browser
// when next frame is ready it runs gameLoop function and pass it a timestamp
requestAnimationFrame(gameLoop);
