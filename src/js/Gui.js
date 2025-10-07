import Icon from "../img/goblin.png";

export default class Gui {
  constructor() {
    this.gameBoard = document.querySelector(".game-board");
    this.cellAll = [];
    this.header = document.getElementById("header_state");
    this.successful = document.getElementById("score_successful");
    this.unsuccessful = document.getElementById("score_unsuccessful");
    this.insertImg = this.insertImg.bind(this);
    this.oldIndex = -1;
    this.imgElement = null; // созданное изображение
    this.gameBoardSize = 16;
  }

  init() {
    this.gameBoard.innerHTML = ""; // Очищаем игровое поле

    for (let i = 0; i < this.gameBoardSize; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      this.gameBoard.append(cell);
    }

    this.imgElement = document.createElement("img");
    this.imgElement.src = Icon;
    this.imgElement.classList.add("img-goblin");
    this.imgElement.alt = "Гоблин";

    this.cellAll = document.querySelectorAll(".cell");
  }
  getRandomIndex(oldIndex) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.cellAll.length);
    } while (newIndex === oldIndex);
    return newIndex;
  }
  insertImg() {
    this.removeImg();
    this.oldIndex = this.getRandomIndex(this.oldIndex);
    this.cellAll[this.oldIndex].append(this.imgElement);
  }

  removeImg() {
    if (this.imgElement && this.imgElement.parentElement) {
      this.imgElement.remove(this.imgElement);
    }
  }
  showScore(score, message) {
    if (this.header) this.header.textContent = message;
    if (this.successful) this.successful.textContent = score.win;
    if (this.unsuccessful) this.unsuccessful.textContent = score.loose;
  }
}
