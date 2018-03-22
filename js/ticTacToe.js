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

  drawLine(context, cordinats, color = '#ff0000') {
    context.beginPath();
    context.moveTo(cordinats.startX, cordinats.startY);
    context.lineWidth = 7;
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineTo(cordinats.finishX, cordinats.finishY);
    context.stroke();
  }

  drawCircle(context, posX, posY, size, color = '#F385A2') {
    const centerX = this.getFractionCenter(posX, size);
    const centerY = this.getFractionCenter(posY, size);
    const radius = ((centerX - posX)) * .65;
    const lineWidth = radius / 5;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
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
    this.drawLine(context, crossCordinats.lineOne, '#666A6D');
    this.drawLine(context, crossCordinats.lineTwo, '#666A6D');
  }

  drawBoard(context, color = '#A6D9D2') {
    context.fillStyle = color;
    context.fillRect(0, 0, this.size, this.size);
  }

  drawLines(context, size, cells) {
    const fraction = size / cells;
    const verticalLines = [];
    const horizontalLines = [];
    for(let i = 1; cells > i; i++) {
      verticalLines.push({
        startX: 0,
        startY: fraction * i,
        finishX: size,
        finishY: fraction * i
      });
      horizontalLines.push({
        startX: fraction * i,
        startY: 0,
        finishX: fraction * i,
        finishY: size
      })
    }
    verticalLines.forEach(item => {
      console.log(item)
      this.drawLine(context, item, 'white');
    });
    horizontalLines.forEach(item => {
      this.drawLine(context, item, 'white');
    });
  }

  // drawFractions(context, fractions) {
  //   fractions.forEach((item) => {
  //     context.fillRect(item.posX, item.posY, this.fraction, this.fraction);
  //   })
  // }

  checkResults(fractions) {

    const filterTic = fractions.map((item) => (item.state == 'tic' ? 1 : 0));
    const filterTac = fractions.map((item) => (item.state == 'tac' ? 1 : 0));

    const checkHorizontal = (array) => {
    	const result = array.reduce((previousValue, currentValue) => {
    		switch(true) {
    			case currentValue === 1:
    				return previousValue += 1;
    			case previousValue >= this.cells:
    				return previousValue;
    			default:
    				return 0;
    		}
    	}, 0);
    	return result >= this.cells ? true : false
    };

    const checkVertical = (array) => {
    	const temp = [];
    	for(let i = 0; this.cells > i; i++) {
    		for(let j = i; array.length > j; j += this.cells) {
    			temp.push(array[j])
    		}
    	}
    	return checkHorizontal(temp);
    }


    /*
    Compare all results
    */
    if(checkHorizontal(filterTic) || checkHorizontal(filterTac)) {
      this.win = true
    }
    if(checkVertical(filterTic) || checkVertical(filterTac)) {
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
    this.drawBoard(this.context);
    this.drawLines(this.context, this.size, this.cells);
    //this.drawFractions(this.context, this.fractions, this.size, this.cells);
    this.clickEvent(this.board, this.fractions, this.fraction);
  }

}
