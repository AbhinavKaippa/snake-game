import {Game} from "./controller/gameController.js";

const main = () => {
  const canvas = document.getElementById("game-canvas");
  const scoreIncrement = 10;

  const food = {
    fill: "red",
    stroke: "black",
    time: 1000,
  };

  const snake = {
    size: canvas.height / 50,
    length: 2,
    x: 0,
    y: (canvas.height / 50) * 2,
    speed: 200 * 500 / canvas.width,
    acceleration: (200 * 500 / canvas.width) / 40,
    fill: "green",
    stroke: "black",
    eye: "yellow",
  };

  const game = new Game(canvas, snake, food, scoreIncrement);
  game.start();
};

main();