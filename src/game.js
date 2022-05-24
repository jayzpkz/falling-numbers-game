import Bucket from "./bucket";
import Counter from "./counter";

import InputHandler from "./input";

import { buildRound, round1, round2, round3 } from "./rounds";

const GAMESTATE = {
  PAUSED: 0,
  RUNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWROUND: 4,
  WINNER: 5,
};

// game operator class
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gameState = GAMESTATE.MENU;
    this.bucket = new Bucket(this);
    this.counter = new Counter(this);
    this.gameObjects = [];
    this.fallingNumbers = [];
    this.lives = 3;
    this.rounds = [round1, round2, round3];
    this.currentRound = 0;
    // add event listeners
    new InputHandler(this.bucket, this);
  }

  // start game function
  start() {
    if (
      this.gameState !== GAMESTATE.MENU &&
      this.gameState !== GAMESTATE.NEWROUND
    )
      return;

    // creating game rounds of falling numbers
    this.fallingNumbers = buildRound(this, this.rounds[this.currentRound]);
    this.gameObjects = [this.counter, this.bucket];

    this.gameState = GAMESTATE.RUNING;
  }

  // update game state function
  update(deltaTime) {
    if (this.lives === 0) {
      alert("GAME OVER!");
      this.gameState = GAMESTATE.GAMEOVER;
      this.counter.expectedNumber = 1;
      this.restart();
    };

    if (this.counter.expectedNumber === 11) {
      alert("WINNER!");
      this.gameState = GAMESTATE.WINNER;
      this.counter.expectedNumber = 1;
      this.restart();
    }

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER ||
      this.gameState === GAMESTATE.WINNER
    )
      return;

    if (this.fallingNumbers.length === 0) {
      this.currentRound++;
      this.gameState = GAMESTATE.NEWROUND;
      this.start();
    }

    [...this.gameObjects, ...this.fallingNumbers].forEach((object) =>
      object.update(deltaTime)
    );

    this.fallingNumbers = this.fallingNumbers.filter((fallingNumber) => !fallingNumber.markedForDeletion);

    if (this.gameState === GAMESTATE.RUNING && this.currentRound === this.rounds.length) {
      this.currentRound = 0;
    }
  }

  // function to draw objects on canvas
  draw(ctx) {
    [...this.gameObjects, ...this.fallingNumbers].forEach((object) => object.draw(ctx));

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "50px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("To Start", this.gameWidth / 2, this.gameHeight * 0.35);
      ctx.font = "30px Arial";
      ctx.fillText(
        "Press Spacebar",
        this.gameWidth / 2,
        this.gameHeight * 0.5
      );
      ctx.fillText("Or", this.gameWidth / 2, this.gameHeight * 0.6);
      ctx.fillText("Touch The Screen", this.gameWidth / 2, this.gameHeight * 0.7);
    }
  }

  // toggle pause and resume
  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.resume();
    } else {
      this.pause();
    }
  }

  pause() {
    this.gameState = GAMESTATE.PAUSED;
  }

  resume() {
    this.gameState = GAMESTATE.RUNING;
  }

  restart() {
    this.currentRound = 0;
    this.lives = 3;
    this.gameState = GAMESTATE.MENU;
  }
}
