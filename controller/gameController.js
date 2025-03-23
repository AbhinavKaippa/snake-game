import {GameModel} from "../models/gameModel.js";
import {Snake} from "../models/snake.js";
import {Food} from "../models/food.js";
import {CanvasView} from "../views/canvasView.js";

class Game {
  #lastTime = 0;
  #animationFrameId;

  constructor (canvas, snakeProps, foodProps, scoreIncrement) {
    this.gameModel = new GameModel(snakeProps, scoreIncrement);
    this.view = new CanvasView(canvas, snakeProps, foodProps);
    this.snake = new Snake(canvas, snakeProps);
    this.food = new Food(canvas, this.snake, foodProps.time);
  }

  start () {
    this.#handleControls();
    this.#run();
  }

  #restartGame () {
    this.gameModel.reset();
    this.snake.reset();
    this.food.randomPosition();
    this.#run();
  }

  #run (timestamp = 0) {
    if(timestamp - this.#lastTime >= this.gameModel.speed) {
      this.#update();
      this.view.render(this.snake, this.food, this.gameModel.score);

      this.#lastTime = timestamp;
    }

    this.#animationFrameId = requestAnimationFrame((t) => this.#run(t));
  }

  #update () {
    if(this.snake.collision) {
      cancelAnimationFrame(this.#animationFrameId);
      this.gameModel.gameOver();
      this.view.gameOver();
      this.#restartGame();

      return;
    }

    this.snake.moveSnake(this.food.position);

    if(this.snake.isFed(this.food.position)) {
      this.gameModel.increaseScore();
      this.food.randomPosition();
    }

  }

  #handleControls () {
    document.addEventListener("keydown", (event) => {
      const directions = {
        ArrowRight: "right",
        ArrowLeft: "left",
        ArrowDown: "down",
        ArrowUp: "up",
      };

      if(directions[event.key]) this.snake.changeDirection(directions[event.key]);
    });
  }
}

export {Game};