export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.scores = { win: 0, loose: 0 };
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
    } 
    else if (e.target.classList.contains('cell') && !e.target.querySelector('.img-goblin')) {
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