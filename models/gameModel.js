class GameModel {
  #score = 0;
  #speed;
  #initialSpeed;
  #acceleration;
  #scoreIncrement;
  #isGameOver = false;

  constructor (snakeProps, scoreIncrement) {
    this.#initialSpeed = snakeProps.speed;
    this.#speed = snakeProps.speed;
    this.#acceleration = snakeProps.acceleration;
    this.#scoreIncrement = scoreIncrement;
  }

  increaseScore () {
    this.#score += this.#scoreIncrement;
    this.#increaseSpeed();
  }

  reset () {
    this.#score = 0;
    this.#speed = this.#initialSpeed;
    this.#isGameOver = false;
  }

  #increaseSpeed () {
    this.#speed = Math.max(50, this.#initialSpeed - Math.floor(this.#score / 10) * this.#acceleration);
  }

  gameOver () {
    this.#isGameOver = true;
  }

  isGameOver () {
    return this.#isGameOver;
  }

  get score () {
    return this.#score;
  }

  get speed () {
    return this.#speed;
  }
}

export {GameModel};