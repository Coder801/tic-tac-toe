document.addEventListener('DOMContentLoaded', function() {

  const board = document.getElementById('tic-tac-toe');

  const ticTacToe = new TicTacToe({
    size: 300,
    cells: 3,
    board
  });

  ticTacToe.init()

})
