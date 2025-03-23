class CanvasView {
  #canvas;
  #ctx;
  #scoreElement;
  #snakeProps;
  #foodProps;

  constructor (canvas, snakeProps, foodProps) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
    this.#scoreElement = document.getElementById("score");
    this.#snakeProps = snakeProps;
    this.#foodProps = foodProps;
  }


  render (snake, food, score) {
    this.#clear();
    this.#drawSnake(snake);
    this.#drawFood(food);
    this.#modifyScore(score);
  }

  #clear () {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  #drawSnake (snake) {
    this.#ctx.fillStyle = this.#snakeProps.fill;
    this.#ctx.strokeStyle = this.#snakeProps.stroke;

    snake.segments.forEach(({x, y}, index) => {
      this.#ctx.fillRect(x, y, snake.size, snake.size);
      this.#ctx.strokeRect(x, y, snake.size, snake.size);

      if(index === snake.segments.length - 1) {
        const eyeSize = snake.size / 5;
        const eyeOffset = snake.size / 4;
        this.#ctx.fillStyle = this.#snakeProps.eye;

        this.#ctx.fillRect(x + eyeOffset, y + eyeOffset, eyeSize, eyeSize);
        this.#ctx.fillRect(x + snake.size - eyeOffset * 2, y + eyeOffset, eyeSize, eyeSize);
      }
    });
  }

  #drawFood (food) {
    const x = food.position.x;
    const y = food.position.y;

    this.#ctx.beginPath();
    this.#ctx.arc(x + food.size / 2, y + food.size / 2, food.size / 2, 0, 2 * Math.PI);
    this.#ctx.fillStyle = this.#foodProps.fill;
    this.#ctx.strokeStyle = this.#foodProps.stroke;
    this.#ctx.fill();
    this.#ctx.stroke();
  }

  #modifyScore (score) {
    this.#scoreElement.innerText = `Score: ${score}`;
  }

  gameOver () {
    alert("Game Over!");
  }
}

export {CanvasView};