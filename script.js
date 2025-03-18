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
            document.getElementById("message").style.display = "block";
        }
    }
}

function updatePuzzle() {
    container.innerHTML = "";
    puzzlae.forEach(piece => container.appendChild(piece));
}

function isPuzzleSolved() {
    return puzzle.every((piece, index) => piece.dataset.index == index || piece.classList.contains("empty"));
}

document.getElementById("shuffle-btn").addEventListener("click", shufflePuzzle);
createPuzzle();
