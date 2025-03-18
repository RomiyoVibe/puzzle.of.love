const imageURL = "https://i.postimg.cc/3xzSTz12/images-1-1.jpg"; // Your image URL

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
    [puzzle[clickedIndex], puzzle[emptyIndex]] = [puzzle[emptyIndex], puzzle[clickedIndex]];
    updatePuzzle();
  }

  if (isPuzzleSolved()) {
    document.getElementById("message").style.display = "block";
    triggerParticles();
  }
}

// Update the puzzle display
function updatePuzzle() {
  container.innerHTML = "";
  puzzle.forEach(piece => {
    piece.style.transition = "transform 0.3s ease";
    container.appendChild(piece);
  });
}

// Check if the puzzle is solved
function isPuzzleSolved() {
  return puzzle.every((piece, index) => piece.dataset.index == index || piece.classList.contains("empty"));
}

// Trigger particle effects
function triggerParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.classList.add("particle-container");
  document.body.appendChild(particleContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 2 + 1}s`;
    particleContainer.appendChild(particle);
  }

  setTimeout(() => {
    particleContainer.remove();
  }, 3000);
}

// Event listeners
document.getElementById("shuffle-btn").addEventListener("click", shufflePuzzle);

// Initialize the puzzle
createPuzzle();
shufflePuzzle();
