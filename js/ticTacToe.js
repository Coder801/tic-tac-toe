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

  getFractionCenter(pos, size) {
    return (pos + size) - (size / 2)
  }

  drawLine(context, cordinats) {
    context.beginPath();
    context.moveTo(cordinats.startX, cordinats.startY);
    context.lineTo(cordinats.finishX, cordinats.finishY);
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.strokeStyle = '#ff0000';
    context.stroke();
  }

  drawCircle(context, posX, posY, size) {
    const centerX = this.getFractionCenter(posX, size);
    const centerY = this.getFractionCenter(posY, size);
    context.beginPath();
    context.lineWidth = 10;
    context.strokeStyle = '#ff0000';
    context.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    context.stroke();
  }

  drawCross(context, posX, posY, size) {
    const crossCordinats = {
      lineOne: {
        startX: posX + 20,
        startY: posY + 20,
        finishX: (posX + size) - 20,
        finishY: (posY + size) - 20,
      },
      lineTwo: {
        startX: (posX + size) - 20,
        startY: posY + 20,
        finishX: posX + 20,
        finishY: (posY + size) - 20
      }
    }

    this.drawLine(context, crossCordinats.lineOne);
    this.drawLine(context, crossCordinats.lineTwo);
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




    function checkHorizontal(array) {
    	const result = array.reduce(function(previousValue, currentValue) {
    		switch(true) {
    			case currentValue === 1:
    				return previousValue += 1;
    			case previousValue >= 3:
    				return previousValue;
    			default:
    				return 0;
    		}
    	}, 0);
    	return result >= 3 ? true : false
    };


    /*
    Compare all results
    */
    if(checkHorizontal(filterTic) || checkHorizontal(filterTac)) {
      this.win = true
    }
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
