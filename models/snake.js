class Snake {
  #canvas;
  #snakeProps;
  #size;
  #collision;
  #segments;
  #directionQueue;

  constructor (canvas, snakeProps) {
    this.#canvas = canvas;
    this.#snakeProps = snakeProps;
    this.#size = snakeProps.size;
    this.reset();
  }

  reset () {
    this.#segments = [];
    this.#directionQueue = ["right"];
    this.#collision = false;

    for(let i = 0; i < this.#snakeProps.length; i++) {
      const x = this.#snakeProps.x + i * this.#size;
      const y = this.#snakeProps.y;
      this.#segments.push({x, y});
    }
  }

  #checkCollision (head) {
    const hitXBoundary = head.x < 0 || head.x >= this.#canvas.width;
    const hitYBoundary = head.y < 0 || head.y >= this.#canvas.height;
    const hitBody = this.#segments.some((segment) =>
      segment.x === head.x && segment.y === head.y);

    return hitBody || hitXBoundary || hitYBoundary;
  }

  isFed (food) {
    const head = this.#segments.at(-1);

    return food.x === head.x && food.y === head.y;
  }

  moveSnake (food) {
    if(this.#directionQueue.length > 1) {
      this.#directionQueue.shift();
    }

    const moves = {
      "right": {x: this.#size, y: 0},
      "left": {x: -this.#size, y: 0},
      "down": {x: 0, y: this.#size},
      "up": {x: 0, y: -this.#size}
    };

    const move = moves[this.#directionQueue.at(0)];
    const newHead = {...this.#segments.at(-1)};
    newHead.x += move.x;
    newHead.y += move.y;

    this.#collision = this.#checkCollision(newHead);
    if(this.#collision) return;

    this.#segments.push(newHead);
    if(!this.isFed(food)) {
      this.#segments.shift();
    }
  }

  changeDirection (newDirection) {
    const oppositeDirections = {
      left: "right",
      right: "left",
      up: "down",
      down: "up"
    };

    const lastDirection = oppositeDirections[this.#directionQueue.at(-1)];

    if(newDirection !== lastDirection)
      this.#directionQueue.push(newDirection);
  }

  get segments () {
    return this.#segments;
  }

  get size () {
    return this.#size;
  }

  get collision () {
    return this.#collision;
  }
}

export {Snake};