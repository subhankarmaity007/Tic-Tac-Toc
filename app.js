let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let newGameBtn = document.querySelector("#new-btn");
let onceAgain = document.querySelector("#onceAgain-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerTurn = document.querySelector("#playerTurn");

let player1;
let player2;
let signPlayer1 = "O";
let signPlayer2 = "X";

// let player1 = prompt("Enter First Player Full Name (O):");
// let player2 = prompt("Enter Second Player Full Name (X):");

// playerTurn.innerText = `${player1} Your Turn`;

// while (player1 === "" || player2 === "") {
//   if (player1 === "") player1 = prompt("Enter First Player Full Name (O):");
//   if (player2 === "") player2 = prompt("Enter Second Player Full Name (X):");
// }

let turn = true; //Player X, PlayerO

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const gameBegin = () => {
  player1 = prompt("Enter First Player Full Name (O):");
  player2 = prompt("Enter Second Player Full Name (X):");
  while (player1 === "" || player2 === "") {
    if (player1 === "") player1 = prompt("Enter First Player Full Name (O):");
    if (player2 === "") player2 = prompt("Enter Second Player Full Name (X):");
  }
  playerTurn.innerText = `${player1} Your Turn (${signPlayer1})`;
};

gameBegin();

const resetGame = () => {
  turn = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  playerTurn.classList.remove("hide");
  for (box of boxes) {
    box.classList.remove("colorO");
    box.classList.remove("colorX");
  }
  gameBegin();
};

// Will add this mathod later
const onceAgainGame = () => {
  turn = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  playerTurn.classList.remove("hide");
  for (box of boxes) {
    box.classList.remove("colorO");
    box.classList.remove("colorX");
  }
  playerTurn.innerText = `${player1} Your Turn (${signPlayer1})`;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turn) {
      //   box.classList.remove("colorX");
      box.classList.add("colorO");
      box.innerText = "O";
      turn = false;
      playerTurn.innerText = `${player2} Your Turn (${signPlayer2})`;
    } else {
      //   box.classList.remove("colorO");
      box.classList.add("colorX");
      box.innerText = "X";
      turn = true;
      playerTurn.innerText = `${player1} Your Turn (${signPlayer1})`;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  if (winner === "O") winner = player1;
  else winner = player2;
  msg.innerText = `Congratulation, Winner is ${winner} !`;
  playerTurn.classList.add("hide");
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let patter of winPatterns) {
    let pos1Val = boxes[patter[0]].innerText;
    let pos2Val = boxes[patter[1]].innerText;
    let pos3Val = boxes[patter[2]].innerText;
    // console.log(pos1Val, pos2Val, pos3Val);

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log(`Winner Player ${pos1Val}!`);
        showWinner(pos1Val);
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
