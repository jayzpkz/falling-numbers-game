import { detectCollision } from "./collisionDetection";

export default class FallingNumber {
  constructor(game, position) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.height = 40;
    this.width = 40;

    this.position = position;
    this.initialPosition = position;

    this.speed = 2;

    this.currentNumber = Math.floor(Math.random() * 10) + 1;

    this.markedForDeletion = false;
  }

  // Generates random numbers from "min" to "max"
  randomNumber(min, max) {
    this.currentNumber = Math.floor(Math.random() * (max - min + 1) + min);
  }

  draw(ctx) {
    // the box
    // ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    // the numbers
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      this.currentNumber,
      this.position.x + this.width / 2,
      this.position.y + this.height * 0.75
    );
  }

  update(deltaTime) {
    // moving down the y axis
    this.position.y += this.speed;

    // floor collision
    if (this.position.y + this.height >= this.gameHeight) {
      this.markedForDeletion = true;
    }

    // check collision with the bucket
    if (detectCollision(this, this.game.bucket)) {
      this.markedForDeletion = true;
      if (this.currentNumber !== this.game.counter.expectedNumber) {
        this.game.lives--;
        console.log("lives left ", this.game.lives);
      } else {
        this.game.counter.expectedNumber++;
      }
    }
  }
}
