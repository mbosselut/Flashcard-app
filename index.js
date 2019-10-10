// Creating array of questions
let arrayOfQuestions = [{
        category: 'fruits',
        question: 'Fraise',
        answer: 'Aardbei'
    },
    {
        category: 'fruits',
        question: 'Orange',
        answer: 'Sinaasappel'
    },
    {
        category: 'fruits',
        question: 'Cerise',
        answer: 'Kers'
    },
    {
        category: 'fruits',
        question: 'Banane',
        answer: 'Banaan'
    },
    {
        category: 'fruits',
        question: 'Poire',
        answer: 'Peer'
    },
    {
        category: 'fruits',
        question: 'Pomme',
        answer: 'Appel'
    },
    {
        category: 'fruits',
        question: 'Pêche',
        answer: 'Perzik'
    }
]

//TODO : Create function for initialising on page load

// Turning a question into a flashcard 
function createCard(cardObject) {
    const board = document.getElementById('board');
    let newDiv = document.createElement('div');
    newDiv.classList.add('flashcard');
    let newQuestion = document.createElement('p');
    let newAnswer = document.createElement('p');
    newQuestion.classList.add('question');
    newAnswer.classList.add('answer');
    newQuestion.innerText = cardObject.question;
    newAnswer.innerText = cardObject.answer;
    newDiv.appendChild(newQuestion);
    newDiv.appendChild(newAnswer);
    board.appendChild(newDiv);
}

// Creating all flashcards
function loadCards(cardsArray) {
    clearBoard();
    for (const card of cardsArray) {
        createCard(card);
    }
    addEventListeners();
}
// loadCards(arrayOfQuestions);

// Deleting a card

// Adding event listeners to the cards
function addEventListeners() {
    const cards = document.getElementsByClassName('flashcard');
    for (const card of cards) {
        card.addEventListener('click', function (event) {
            const children = card.childNodes;
            const arrChildren = Array.from(children);
            arrChildren[1].classList.toggle('show');
        })
    }
}
addEventListeners();

// Displaying a random card
function randomCard() {
    const randomIndex = Math.floor(Math.random() * arrayOfQuestions.length);
    clearBoard();
    createCard(arrayOfQuestions[randomIndex]);
    addEventListeners();
}

// Event listener for random button and space bar
let randBtn = document.getElementById("randBtn");
randBtn.addEventListener("click", randomCard);
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        randomCard();
    }
}

// Event listener to show full collection 
let showFullBtn = document.getElementById('showFullBtn');
showFullBtn.addEventListener("click", () => {loadCards(arrayOfQuestions)});

// Clearing board
function clearBoard() {
    const board = document.getElementById('board');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    };
};