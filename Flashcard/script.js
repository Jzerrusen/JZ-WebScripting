let cards = JSON.parse(localStorage.getItem("cards")) || [];
let currentIndex = 0;
let showingAnswer = false;

function displayCard() {
    let cardText = document.getElementById("cardText");

    if (cards.length === 0) {
        cardText.innerText = "No cards yet";
        document.getElementById("progress").innerText = "0 / 0";
        return;
    }

    let currentCard = cards[currentIndex];

    if (showingAnswer) {
        cardText.innerText = currentCard.answer;
    } else {
        cardText.innerText = currentCard.question;
    }

    document.getElementById("progress").innerText =
        (currentIndex + 1) + " / " + cards.length;
}

function addCard() {
    let question = document.getElementById("questionInput").value;
    let answer = document.getElementById("answerInput").value;
    let error = document.getElementById("error");

    if (question.trim() === "" || answer.trim() === "") {
        error.innerText = "You must fill both fields";
        return;
    }

    error.innerText = "";

    let newCard = {
        question: question,
        answer: answer
    };

    cards.push(newCard);
    saveCards();

    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";

    currentIndex = cards.length - 1;
    showingAnswer = false;

    displayCard();
}

function flipCard() {
    if (cards.length === 0) return;

    showingAnswer = !showingAnswer;
    displayCard();
}

function nextCard() {
    if (cards.length === 0) return;

    currentIndex++;
    if (currentIndex >= cards.length) {
        currentIndex = 0;
    }

    showingAnswer = false;
    displayCard();
}

function prevCard() {
    if (cards.length === 0) return;

    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = cards.length - 1;
    }

    showingAnswer = false;
    displayCard();
}

function deleteCard() {
    if (cards.length === 0) return;

    cards.splice(currentIndex, 1);

    if (currentIndex >= cards.length) {
        currentIndex = cards.length - 1;
    }

    saveCards();
    displayCard();
}

function saveCards() {
    localStorage.setItem("cards", JSON.stringify(cards));
}

displayCard();