export default class Bucket {
  constructor(game) {
    this.image = document.getElementById("img_bucket");

    this.gameWidth = game.gameWidth;
    this.width = 100;
    this.height = 100;

    this.maxSpeed = 10;
    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  // Updates bucket position by getting the mouse / finger touch horizontal position
  setMousePositionX(x) {
    this.position.x = x / 2;
  }

  // Keyboard left movement
  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  // Keyboard right movement
  moveRight() {
    this.speed = this.maxSpeed;
  }

  // Stops bucket movement
  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x >= this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }
}
