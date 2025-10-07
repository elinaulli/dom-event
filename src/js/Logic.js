export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.scores = { win: 0, loose: 0 };
    this.checkTarget = this.checkTarget.bind(this);
    this.timerId = null;
    this.currentImageVisible = false;
  }

  init() {
    this.gui.init();
    this.gui.gameBoard.addEventListener("click", this.checkTarget);
    this.startGame();
  }

  startGame() {
    this.timerId = setInterval(() => {
      if (this.currentImageVisible) {
        this.scores.loose += 1;
        this.gui.showScore(this.scores, "Пропуск -1 очко!");
      }

      this.gui.removeImg();
      this.gui.insertImg();
      this.currentImageVisible = true;

      if (this.checkGameOver()) return;
    }, 1000);
  }

  checkTarget(e) {
    const clickedGoblin = e.target.classList.contains("img-goblin");
    const clickedEmptyCell =
      e.target.classList.contains("cell") &&
      !e.target.querySelector(".img-goblin");

    if (clickedGoblin) {
      this.scores.win += 1;
      this.gui.showScore(this.scores, "Попал +1 очко");
      this.gui.removeImg();
      this.currentImageVisible = false;
    } else if (clickedEmptyCell) {
      this.scores.loose += 1;
      this.gui.showScore(this.scores, "Промах! -1 очко");
    }

    if (this.checkGameOver()) return;
  }

  checkGameOver() {
    if (this.scores.win >= 5) {
      this.endGame("Победа! Вы набрали 5 очков!");
      return true;
    }

    if (this.scores.loose >= 5) {
      this.endGame("Игра окончена:(");
      return true;
    }

    return false;
  }

  endGame(message) {
    clearInterval(this.timerId);
    this.gui.gameBoard.removeEventListener("click", this.checkTarget);
    this.gui.showScore(this.scores, message);
    this.currentImageVisible = false;
    this.gui.removeImg();
  }
}
