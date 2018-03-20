class TicTacToe {

  constructor(options) {
    this.size = options.size;
    this.cells = options.cells;
    this.board = options.board;
    this.context = options.board.getContext('2d');
    this.fraction = options.size / options.cells;
    this.fractions = [];
    this.player = 1;
    this.win = false;
    this.winCombinations = [
      [1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 1, 0, 1, 0, 1, 0, 0],
    ]
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
  setFractions(size, cells, fraction) {
    for(let i = 0; i < cells; i++) {
      let posY = fraction * i;
      for(let j = 0; j < cells; j++) {
        let posX = fraction * j;
        this.fractions.push({
          state: false,
          posX,
          posY
        })
      }
    }
  }

  drawLine(context, cordinats, size) {
    context.beginPath();
    context.moveTo(cordinats.startX, cordinats.startY);
    context.lineTo(cordinats.finishX, cordinats.finishY);
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.strokeStyle = '#ff0000';
    context.stroke();
  }

  drawCircle(context, posX, posY, size) {
    const centerX = (posX + size) - (size / 2);
    const centerY = (posY + size) - (size / 2);
    context.beginPath();
    context.lineWidth = 10;
    context.strokeStyle = '#ff0000';
    context.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    context.stroke();
  }

  drawCross(context, posX, posY, size) {

    const cordinats = {
      startX: posX + 20,
      startY: posY + 20,
      finishX: posX + size - 20,
      finishY: posY + size - 20
    }

    this.drawLine(context, cordinats);
    this.drawLine(context, cordinats);
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

    const filterTic = fractions.map(function(item) {
      let state = 0;
      if(item.state == 'tic') {
        state = 1
      }
      return state;
    });

    const filterTac = fractions.map(function(item) {
      let state = 0;
      if(item.state == 'tac') {
        state = 1
      }
      return state;
    });

    const compareArrays = function(arrayLeft, arrayRight) {
      if(arrayLeft.length !== arrayRight.length) {
    		return false;
    	}
    	for(let i = 0; arrayLeft.length > i; i++) {
    		if(arrayLeft[i] !== arrayRight[i]) {
    			return false;
    		}
    	}
    	return true;
    }

    this.winCombinations.forEach((item) => {
      this.win = compareArrays(filterTic, item);
    });
  }

  clickEvent(board, fractions, fraction) {
    board.addEventListener('click', (e) => {
      if(this.win) {
        return
      }
      for(let item of fractions) {
        let maxPosX = item.posX + fraction;
        let maxPosY = item.posY + fraction;

        if(e.offsetX > item.posX && e.offsetY > item.posY &&  e.offsetX < maxPosX &&  e.offsetY < maxPosY) {
          if(item.state) {
            break;
          }
          this.player = !this.player;
          if(!this.player) {
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
    this.setFractions(this.size, this.cells, this.fraction);
    this.drawFractions(this.context, this.fractions, this.size, this.cells);
    this.clickEvent(this.board, this.fractions, this.fraction);
  }

}
