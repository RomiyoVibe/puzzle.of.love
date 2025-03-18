const imageURL = "https://i.postimg.cc/BnmhjdM8/images-1-1.png";

let puzzle = [];
let emptyIndex = 8;
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
            piece.addEventListener('click', () => movePiece(i));
        } else {
            piece.style.backgroundColor = "#ffe6f2";
            piece.classList.add("empty");
        }

        container.appendChild(piece);
        puzzle.push(piece);
    }
    shufflePuzzle();
}

function shufflePuzzle() {
    for (let i = 0; i < 100; i++) {
        const neighbors = getNeighbors(emptyIndex);
        const randomIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
        swapPieces(randomIndex);
    }
}

function movePiece(index) {
    if (getNeighbors(emptyIndex).includes(index)) {
        swapPieces(index);
    }
}

function swapPieces(index) {
    const emptyPiece = puzzle[emptyIndex];
    const clickedPiece = puzzle[index];

    const tempBackground = clickedPiece.style.backgroundImage;
    const tempPosition = clickedPiece.style.backgroundPosition;

    clickedPiece.style.backgroundImage = emptyPiece.style.backgroundImage;
    clickedPiece.style.backgroundPosition = emptyPiece.style.backgroundPosition;

    emptyPiece.style.backgroundImage = tempBackground;
    emptyPiece.style.backgroundPosition = tempPosition;

    emptyIndex = index;
}

function getNeighbors(index) {
    const neighbors = [];
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (row > 0) neighbors.push(index - 3);
    if (row < 2) neighbors.push(index + 3);
    if (col > 0) neighbors.push(index - 1);
    if (col < 2) neighbors.push(index + 1);

    return neighbors;
}

document.getElementById("shuffle-btn").addEventListener("click", shufflePuzzle);

createPuzzle();
