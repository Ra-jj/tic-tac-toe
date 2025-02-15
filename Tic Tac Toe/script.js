const cells = document.querySelectorAll(".cell"); //box that contains the elements
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  //all possible ways a player can win
  [0, 1, 2], //first row
  [3, 4, 5], //second row
  [6, 7, 8], //third row
  [0, 3, 6], //first column
  [1, 4, 7], //second column
  [2, 5, 8], //third column
  [0, 4, 8], //diagonal from top-left to bottom-right
  [2, 4, 6], //diagonal from top-right to bottom-left
];
let options = ["", "", "", "", "", "", "", "", ""]; //keeps track of whats inside each cell(empty,"X","O").At start all are empty strings
let currentPlayer = "X"; //keeps track whose turn it is.Game starts with player "X"
let running = false; //checks the game is active or over

initializeGame(); //start the game

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked)); //adds a click event listener to every cell
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`; //shows whose  turn it is
  running = true; //game active
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex"); //gets index of clicked cell(from 0 to 8)
  //now check two things- if cell is already filled, do nothing and if game isn't runing, do nothing
  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex); //update cell to show current player symbol(X or O)
  checkWinner(); //check if won or draw
}
function updateCell(cell, index) {
  options[index] = currentPlayer; //update the clicked cell index with current player symbol
  cell.textContent = currentPlayer; //display X or O
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X"; //switching from X to O or O to X
  statusText.textContent = `${currentPlayer}'s turn`; //updates the message whose turns is next
}
function checkWinner() {
  let roundWon = false; //starts by assuming nobody has won yet

  for (let i = 0; i < winConditions.length; i++) {
    //loops through all winning conditions
    const condition = winConditions[i]; // get one winning condition at a time
    const cellA = options[condition[0]]; // get value of first cell in winning conditions
    const cellB = options[condition[1]]; // get value of second cell in winning conditions
    const cellC = options[condition[2]]; //get value of third cell in winning conditions

    if (cellA == "" || cellB == "" || cellC == "") {
      //if any cell empty,skip this condition and move to next one.We cant win if not all cells are filled
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      //if all three cells have same value,means one player has won
      roundWon = true; //it indicates there is a winner
      break; //exit to need to check furthur
    }
  }

  if (roundWon) {
    //if someone wons the game ends
    statusText.textContent = `${currentPlayer} wins!`; //displays message who wins(X or O)
    running = false; //stops the game
  } else if (!options.includes("")) {
    //if no one has won and there is no empty cells,its a draw
    statusText.textContent = `Draw!`; //displays draw
    running = false;
  } else {
    //if no winner and game insn't a draw,the game continues
    changePlayer(); //switch turns between X and O
  }
}
function restartGame() {
  currentPlayer = "X"; //resets with player X
  options = ["", "", "", "", "", "", "", "", ""]; //clears the game board
  statusText.textContent = `${currentPlayer}'s turn`; //updates the message to X turn
  cells.forEach((cell) => (cell.textContent = "")); // clears the displayed text in each cell
  running = true; //start again
}
