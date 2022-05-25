// Counter object to show the next number the player must catch
export default class Counter {
  constructor(game) {
    this.game = game;
    this.width = 160;
    this.height = 40;
    this.expectedNumber = 1;

    this.position = {
      x: 10,
      y: 10
    };
  }

  draw(ctx) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "NEXT: " + this.expectedNumber,
      this.position.x + this.width / 2,
      this.position.y + this.height - 10
    );
  }

  update(timeDelta) {
    // this.currentNumber = this.game.fallingNumber.currentNumber;
  }
}
