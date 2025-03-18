const imageURL = "https://i.postimg.cc/BnmhjdM8/images-1-1.png"; // Custom Cute Puzzle Image

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
            piece.style.backgroundPosition = `${-100 * (i % 3)}px ${-100 * Math.floor(i / 3)}px`;
        } else {
            piece.style.backgroundColor = "#ffe6f2";
        }
        piece.dataset.index = i;
        container.appendChild(piece);
        puzzle.push(piece);
    }
}

function shufflePuzzle() {
    puzzle.sort(() => Math.random() - 0.5);
    puzzle.forEach((piece, index) => {
        piece.dataset.index = index;
        container.appendChild(piece);
    });
}

document.getElementById("shuffle-btn").addEventListener("click", shufflePuzzle);

createPuzzle();
