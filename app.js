let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let changeThemeButton = document.querySelector("#change-theme");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#message");
let newGameButton = document.querySelector("#new-game");
let body = document.querySelector("body");

let turnO = true; // playerX, playerO

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  gameOver = false;
  enableAllBoxes();
  msgContainer.classList.add("hidden");
  newGameButton.classList.add("hidden");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    if (!checkWin()) {
      checkDraw();
    }
  });
});

const showWinner = (winner) => {
  message.innerText = `Congratulations! ${winner} has won the game!`;
  msgContainer.classList.remove("hidden");
  newGameButton.classList.remove("hidden");
  boxes.forEach((box) => (box.disabled = true));
  gameOver = true;
};

const enableAllBoxes = () => {
  for (let box of boxes) {
    box.innerText = "";
    box.disabled = false;
  }
};

const showDraw = () => {
  message.innerText = `It's a draw!`;
  msgContainer.classList.remove("hidden");
  newGameButton.classList.remove("hidden");
  boxes.forEach((box) => (box.disabled = true));
  gameOver = true;
};

const checkWin = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return true;
    }
  }
  return false;
};

const checkDraw = () => {
  // If every box is filled and no winner, it's a draw
  const allFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (allFilled) {
    showDraw();
  }
};

let currMode = "Dark";
changeThemeButton.addEventListener("click", (evt) => {
  if (currMode === "Light") {
    currMode = "Dark";
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
  } else {
    currMode = "Light";
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
  }
});

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
