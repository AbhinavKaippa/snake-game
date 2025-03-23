class Food {
  #canvas;
  #snake;
  #size;
  #x;
  #y;

  constructor (canvas, snake, time) {
    if(!snake.segments) {
      throw new Error("Snake is not initialized properly");
    }
    this.#canvas = canvas;
    this.#snake = snake;
    this.#size = snake.size;
    // this.time = time;
    this.randomPosition();
  }

  randomPosition () {
    let validPosition = false;
    const cols = Math.floor(this.#canvas.width / this.#size);
    const rows = Math.floor(this.#canvas.height / this.#size);

    while(!validPosition) {
      this.#x = Math.floor(Math.random() * cols) * this.#size;
      this.#y = Math.floor(Math.random() * rows) * this.#size;

      validPosition = !this.#snake.segments.some(segment =>
        segment.x === this.#x && segment.y === this.#y);
    }

  }

  get position () {
    return {x: this.#x, y: this.#y};
  }

  get size () {
    return this.#size;
  }
}

export {Food};