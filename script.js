const imageURL = "anime_girl.jpg"; // Replace with your client's image
const moveSound = new Audio("move.mp3"); // Add a move sound effect
const winSound = new Audio("win.mp3"); // Add a win sound effect

let puzzle = [];
const container = document.getElementById("puzzle-container");

// Create the puzzle pieces
function createPuzzle() {
  puzzle = [];
  container.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    let piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    if (i !== 8) {
      piece.style.backgroundImage = `url(${imageURL})`;
      piece.style.backgroundPosition = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
      piece.dataset.index = i;
      piece.addEventListener("click", movePiece);
    } else {
      piece.classList.add("empty");
    }
    puzzle.push(piece);
    container.appendChild(piece);
  }
}

// Shuffle the puzzle pieces
function shufflePuzzle() {
  for (let i = puzzle.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
  }
  updatePuzzle();
}

// Move a puzzle piece
function movePiece(event) {
  let clickedIndex = puzzle.indexOf(event.target);
  let emptyIndex = puzzle.findIndex(piece => piece.classList.contains("empty"));

  if ([1, -1, 3, -3].includes(clickedIndex - emptyIndex)) {
   
