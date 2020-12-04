const TicTacToe = (function () {
  const game = {};

  // private variables
  const cells = document.getElementsByClassName('cell');
  const winningMessageElement = document.getElementById('winningMessage')
  const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
  const restartButton = document.getElementById('restartButton')

  let currentPlayer = 'x';
  let previewEvent;

  const ownership = {
    x: [],
    o: [],
  };
  const winningSets = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  restartButton.addEventListener('click', function(event){
      winningMessageElement.classList.remove('show')
  });

  // private methods
  function endGameIfOver() {
    if (hasCurrentPlayerWon()) {
      endWithMessage(`Player ${currentPlayer} has won!`)
    } else if (hasNoWinner()) {
      endWithMessage("It's a draw!")
    } else {
      toggleCurrentPlayer()
    }
  }

  function hasNoWinner() {
    return ownership['x'].length + ownership['o'].length === 9;
  }

  function endWithMessage(msg) {

    winningMessageTextElement.innerText = msg
    winningMessageElement.classList.add('show')

    for (let index = 0, length = cells.length; index < length; index++) {
      cells[index].classList.remove('x', 'o', 'visited','preview')
    }
    ownership.x = [];
    ownership.o = [];
  }

  function hasCurrentPlayerWon() {
    const ownedCells = ownership[currentPlayer];

    if (ownedCells.length < 3) {
      return false;
    }

    return (
      winningSets.filter(function (set) {
        return (
          set.filter(function (num) {
            return ownedCells.indexOf(num) >= 0;
          }).length >= 3
        );
      }).length > 0
    );
  }

  function toggleCurrentPlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }

  function makeMove(cell){

     if (!cell.classList.contains('visited')) {
          cell.classList.add(currentPlayer, 'visited')
          ownership[currentPlayer].push(parseInt(cell.getAttribute('data-id'), 10))
          endGameIfOver();
        }
  }

  function handleClick(event){

        const cell = event.target
        makeMove(cell)      
  }


  function keyPressEvent(e){

    // current keyPressEvent is space bar
        if(e.keyCode == 32){
             const cell  = previewEvent.target
             makeMove(cell)
        }
  }

  function showPreview(event){
      
    const cell = event.target

    if(cell.classList.contains('visited')) return
    cell.classList.add(currentPlayer, 'preview')
    previewEvent = event;

  }

  function removePreview(event){
      
    const cell = event.target;
    if(cell.classList.contains('visited')) return
    cell.classList.remove(currentPlayer, 'preview')
    previewEvent = null;

  }

  function addPreviewToCells(cells){

      cells.forEach(function(cell){
      
      if(!cell.classList.contains('visited')){
         cell.addEventListener('mouseout', removePreview)
         cell.addEventListener('mouseenter', showPreview)
      }
    })

  }

  function addCellListeners() {

    const board = document.getElementById('board')
    board.addEventListener('click', handleClick);

    document.body.onkeyup = keyPressEvent;  
    const cells = document.querySelectorAll('.cell')
    addPreviewToCells(cells)

  }

  // public methods
  game.start = function () {
    addCellListeners();
  };

  return game;
})();

document.addEventListener('DOMContentLoaded', TicTacToe.start);
