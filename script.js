const imageURL = "anime_girl.jpg"; // {ClientName}'s Image

let puzzle = [];
const container = document.getElementById("puzzle-container");

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

function shufflePuzzle() {
    for (let i = puzzle.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
    }
    updatePuzzle();
}

function movePiece(event) {
    let clickedIndex = puzzle.indexOf(event.target);
    let emptyIndex = puzzle.findIndex(piece => piece.classList.contains("empty"));

    if ([1, -1, 3, -3].includes(clickedIndex - emptyIndex)) {
        [puzzle[clickedIndex], puzzle[emptyIndex]] = [puzzle[emptyIndex], puzzle[clickedIndex]];
        updatePuzzle();
    }

    if (isPuzzleSolved()) {
        document.getElementById("message").style.display = "block";
    }
}

function updatePuzzle() {
    container.innerHTML = "";
    puzzle.forEach(piece => container.appendChild(piece));
}

function isPuzzleSolved() {
    return puzzle.every((piece, index) => piece.dataset.index == index || piece.classList.contains("empty"));
}

document.getElementById("shuffle-btn").addEventListener("click", shufflePuzzle);
createPuzzle();
shufflePuzzle();

