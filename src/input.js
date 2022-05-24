// event listeners class
export default class InputHandler {
  constructor(bucket, game) {
    // when keyboard key pressed
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          // Left Arrow
          bucket.moveLeft();
          break;

        case 39:
          // Right Arrow
          bucket.moveRight();
          break;

        case 27:
          // Esc
          game.togglePause();
          break;

        case 32:
          // Space
          bucket.stop();
          game.start();
          break;

        default:
          break;
      }
    });

    // when keyboard key released
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          // Left Arrow
          if (bucket.speed < 0) bucket.stop();
          break;

        case 39:
          // Right Arrow
          if (bucket.speed > 0) bucket.stop();
          break;

        default:
          break;
      }
    });

    // when the mouse moves
    document.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX; // Gets Mouse X
      if (game.gameState !== 0) {
        // if game not paused
        bucket.setMousePositionX(mouseX);
      }
    });

    // when the user touchest the screen and moving his finger
    document.addEventListener("touchmove", (event) => {
      const touchX = event.touches[0].clientX; // Gets Touch X
      bucket.setMousePositionX(touchX);
      game.resume();
    });

    // TODO: touch event

    // when the user touches the screen
    document.addEventListener("touchstart", (event) => {
      const touchX = event.touches[0].clientX; // Gets Touch X
      bucket.setMousePositionX(touchX);
    });

    // when the user stop touching the screen
    document.addEventListener("touchend", (event) => {
      bucket.stop();
      game.pause();
    });
  }
}
