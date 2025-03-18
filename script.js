const imageURL = "https://i.postimg.cc/BnmhjdM8/images-1-1.png";

let puzzle = [];
const container = document.getElementById("puzzle-container");

function createPuzzle() {
  puzzle = [];
  container.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    let piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.dataset.index = i;

    if (i !== 8) {
      piece.style.backgroundImage = `url(${imageURL})`;
      piece.style.backgroundPosition = `${-100 * (i % 3)}px ${-100 * Math.floor(i / 3)}px`;
      piece.addEventListener("click", movePiece);
    } else {
      piece.classList.add("empty");
    }

    puzzle.push(piece);
    container.appendChild(piece);
  }
  shufflePuzzle();
}

function shufflePuzzle() {
  for (let i = puzzle.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
  }
  updatePuzzle();
}

function movePiece(event) {
  let clickedIndex = puzzle.indexOf(event.target);
  let emptyIndex = puzzle.findIndex(piece => piece.classList.contains("empty"));

  const rowDiff = Math.abs(Math.floor(clickedIndex / 3) - Math.floor(emptyIndex / 3));
  const colDiff = Math.abs((clickedIndex % 3) - (emptyIndex % 3));

  if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
    [puzzle[clickedIndex], puzzle[emptyIndex]] = [puzzle[emptyIndex], puzzle[clickedIndex]];
    updatePuzzle();

    if (isPuzzleSolved()) {
      setTimeout(() => {
        document.getElementById("message").innerText = "You did it! But solving this puzzle was easier than making me fall for you 😉";
        document.getElementById("message").style.display = "block";
        triggerConfetti();
      }, 300);
    }
  }
}

function updatePuzzle() {
  container.innerHTML = "";
  puzzle.forEach(piece => container.appendChild(piece));
}

function isPuzzleSolved() {
  return puzzle.every((piece, index) => piece.dataset.index == index || piece.classList.contains("empty"));
}

function triggerConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti-container');
  document.body.appendChild(confettiContainer);
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => confettiContainer.remove(), 5000);
}

document.getElementById("shuffle-btn").addEventListener("click", shufflePuzzle);
createPuzzle();
