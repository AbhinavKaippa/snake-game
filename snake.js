class Snake {
  snake = [{x: 0, y: 0}, {x: 20, y: 0}];
  direction = "right";

  constructor (length, size) {
    this.length = length;
    this.size = size;
  }

  // createSnake (ctx, fill, stroke) {
  //   for(let i = 0; i < this.length; i++){
  //     this.snake.push()
  //   }
  // }

  moveSnake () {
    let {x: headX, y: headY} = this.snake.at(-1);
    this.snake.shift();

    if(this.direction === "right") {
      headX = headX + this.size;
      this.snake.push({x: headX, y: headY});
    }
  }

  drawSnake (ctx, fill, stroke) {
    this.snake.map(({x, y}) => {
      ctx.fillStyle = fill;
      ctx.strokeStyle = stroke;
      ctx.fillRect(x, y, this.size, this.size);
      ctx.strokeRect(x, y, this.size, this.size);
    });
  }

  changeDirection (newDirection) {

  }
}

const main = () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const snakeSize = 10;
  const snakeLength = 3;
  const snakeFill = "green";
  const snakeStroke = "black";

  const snake = new Snake(snakeLength, snakeSize);

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.moveSnake();
    snake.drawSnake(ctx, snakeFill, snakeStroke);
  }, 500);

};

main();