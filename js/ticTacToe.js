class TicTacToe {

  constructor(options) {
    this.size = options.size;
    this.cells = options.cells;
    this.board = options.board;
    this.context = options.board.getContext('2d');
    this.fraction = options.size / options.cells;
    this.fractions = [];
    this.player = 1;
  }

  setBoardSize(board, size) {
    board.width = size;
    board.height = size;
  }

  /*
    @description set board size
    @param number
    @param number
  */
  setFractions(size, cells) { // FIXME: fix fraction propperty
    for(let i = 0; i < cells; i++) {
      let posY = this.fraction * i;
      for(let j = 0; j < cells; j++) {
        let posX = this.fraction * j;
        this.fractions.push({
          state: false,
          posX,
          posY
        })
      }
    }
  }
  drawCircle(context, posX, posY, size) {
    const centerX = (posX + size) - (size / 2);
    const centerY = (posY + size) - (size / 2);
    context.beginPath();
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.strokeStyle = '#ff0000';
    context.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    context.stroke();
  }

  drawCross(context, posX, posY, size) {
    context.beginPath();
    context.moveTo(posX + 20, posY + 20);
    context.lineTo(posX + size - 20, posY + size - 20);
    context.moveTo(posX + size - 20, posY + 20);
    context.lineTo(posX + 20, posY + size - 20);
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.strokeStyle = '#ff0000';
    context.stroke();
  }

  // Temp
  drawFraction(context, posX, posY, size, color = 'black') {
    context.fillStyle = color;
    context.fillRect(posX, posY, size, size);
  }

  drawFractions(context, fractions) {
    fractions.forEach((item) => {
      context.fillRect(item.posX, item.posY, this.fraction, this.fraction);
    })
  }

  checkResults(fractions) {
    console.log(fractions)
    return false
  }

  clickEvent(board, fractions, fraction) {
    board.addEventListener('click', (e) => {
      for(let item of fractions) {
        let maxPosX = item.posX + fraction;
        let maxPosY = item.posY + fraction;

        if(e.offsetX > item.posX && e.offsetY > item.posY &&  e.offsetX < maxPosX &&  e.offsetY < maxPosY) {
          if(item.state) {
            break;
          }
          this.player = !this.player;
          if(this.player) {
            this.drawCross(this.context, item.posX, item.posY, this.fraction)
            item.state = 'tic';
          } else {
            this.drawCircle(this.context, item.posX, item.posY, this.fraction)
            item.state = 'tac';
          }
        }
      }

      this.checkResults(fractions);
    })

  }

  init() {
    this.setBoardSize(this.board, this.size);
    this.setFractions(this.size, this.cells);
    this.drawFractions(this.context, this.fractions, this.size, this.cells);
    this.clickEvent(this.board, this.fractions, this.fraction);
  }

}
