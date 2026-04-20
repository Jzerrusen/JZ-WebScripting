let wordList = ["apple", "grape", "chair", "table", "plant"];
let targetWord = wordList[Math.floor(Math.random() * wordList.length)];

let currentRow = 0;
let maxRows = 6;

// create grid
let grid = document.getElementById("grid");

for (let i = 0; i < maxRows; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 5; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        row.appendChild(cell);
    }

    grid.appendChild(row);
}

function submitGuess() {
    let input = document.getElementById("guessInput");
    let guess = input.value.toLowerCase();

    if (guess.length !== 5) {
        document.getElementById("message").innerText = "Enter 5 letters!";
        return;
    }

    let row = grid.children[currentRow];
    let cells = row.children;

    for (let i = 0; i < 5; i++) {
        cells[i].innerText = guess[i];

        if (guess[i] === targetWord[i]) {
            cells[i].classList.add("correct");
        } else {
            cells[i].classList.add("wrong");
        }
    }

    if (guess === targetWord) {
        document.getElementById("message").innerText = "You win!";
        return;
    }

    currentRow++;

    if (currentRow === maxRows) {
        document.getElementById("message").innerText = "You lose! Word was: " + targetWord;
    }

    input.value = "";
}

function restartGame() {
    location.reload();
}