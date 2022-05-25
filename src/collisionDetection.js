// Detects collision between fallingNumber object and other game objects (bucket for example)
export const detectCollision = (fallingNumber, gameObject) => {
  const topOfFallingNumber = fallingNumber.position.y;
  const bottomOfFallingNumber = fallingNumber.position.y + fallingNumber.height;

  const topOfObject = gameObject.position.y;
  const bottomOfObject = gameObject.position.y + gameObject.height;
  const leftSideOfObject = gameObject.position.x;
  const rightSideOfObject = gameObject.position.x + gameObject.width;

  if (
    bottomOfFallingNumber >= topOfObject &&
    topOfFallingNumber <= bottomOfObject &&
    fallingNumber.position.x >= leftSideOfObject &&
    fallingNumber.position.x + fallingNumber.width <= rightSideOfObject
  ) {
    return true;
  } else {
    return false;
  }
};
