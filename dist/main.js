/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// ./src/js/Gui.js

class Gui {
  constructor() {
    this.gameBoard = document.querySelector('.game-board');
    this.cellAll = [];
    this.header = document.getElementById('header_state');
    this.successful = document.getElementById('score_successful');
    this.unsuccessful = document.getElementById('score_unsuccessful');
    this.insertImg = this.insertImg.bind(this);
    this.oldIndex = -1;
    this.imgElement = null; // Будет хранить созданное изображение
  }
  init() {
    this.gameBoard.innerHTML = ''; // Очищаем игровое поле

    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      this.gameBoard.append(cell);
    }
    this.imgElement = document.createElement("img");
    this.imgElement.src = goblin_namespaceObject;
    this.imgElement.classList.add("img-goblin");
    this.imgElement.alt = "Гоблин";
    this.cellAll = document.querySelectorAll('.cell');
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
;// ./src/js/Logic.js
class Logic {
  constructor(gui) {
    this.gui = gui;
    this.scores = {
      win: 0,
      loose: 0
    };
    this.checkTarget = this.checkTarget.bind(this);
    this.timerId = null;
  }
  init() {
    this.gui.init();
    this.gui.gameBoard.addEventListener('click', this.checkTarget);
    this.startGame();
  }
  startGame() {
    this.timerId = setInterval(() => {
      this.gui.insertImg();
      if (this.checkGameOver()) return;
      this.gui.showScore(this.scores, 'Кликни по гоблину!');
    }, 1000);
  }
  checkTarget(e) {
    console.log('Клик по:', e.target); // для отладки

    if (e.target.classList.contains('img-goblin')) {
      this.scores.win += 1;
      this.gui.removeImg();
    } else if (e.target.classList.contains('cell') && !e.target.querySelector('.img-goblin')) {
      this.scores.loose += 1;
    }
    if (this.checkGameOver()) return;
  }
  checkGameOver() {
    if (this.scores.win >= 5) {
      this.endGame('Победа! Вы набрали 5 очков!');
      return true;
    }
    if (this.scores.loose >= 5) {
      this.endGame('Игра окончена:(');
      return true;
    }
    return false;
  }
  endGame(message) {
    clearInterval(this.timerId);
    this.gui.gameBoard.removeEventListener('click', this.checkTarget);
    this.gui.showScore(this.scores, message);
  }
}
;// ./src/js/app.js


const gui = new Gui();
gui.init();
const logic = new Logic(gui);
logic.init();
;// ./src/index.js




// TODO: write your code in app.js
/******/ })()
;