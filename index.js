// Creating array of questions
let arrayOfQuestions = [{
        category: 'fruit',
        question: 'Fraise',
        answer: 'Aardbei'
    },
    {
        category: 'fruit',
        question: 'Orange',
        answer: 'Sinaasappel'
    },
    {
        category: 'fruit',
        question: 'Cerise',
        answer: 'Kers'
    },
    {
        category: 'fruit',
        question: 'Banane',
        answer: 'Banaan'
    },
    {
        category: 'fruit',
        question: 'Poire',
        answer: 'Peer'
    },
    {
        category: 'fruit',
        question: 'Pomme',
        answer: 'Appel'
    },
    {
        category: 'fruit',
        question: 'Pêche',
        answer: 'Perzik'
    },
    {
        category: 'vegetable',
        question: 'Poivron',
        answer: 'Paprika'
    },
    {
        category: 'vegetable',
        question: 'Oignon',
        answer: 'Ui'
    },
    {
        category: 'vegetable',
        question: 'Haricot vert',
        answer: 'Sperzieboon'
    }
]

//TODO : Create function to initialize on page load

// Turning a question into a flashcard 
function createCard(cardObject) {
    const board = document.getElementById('board');
    let newDiv = document.createElement('div');
    newDiv.classList.add('flashcard');
    // let deleteBtn = document.createElement('p');
    let newQuestion = document.createElement('p');
    let newAnswer = document.createElement('p');
    newQuestion.classList.add('question');
    newAnswer.classList.add('answer');
    // deleteBtn.classList.add('deleteBtn');
    // deleteBtn.innerText = 'X';
    newQuestion.innerText = cardObject.question;
    newAnswer.innerText = cardObject.answer;
    newDiv.appendChild(newQuestion);
    newDiv.appendChild(newAnswer);
    // newDiv.appendChild(deleteBtn);
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
// function deleteCard() {
//     const deleteBtns = document.getElementsByClassName('deleteBtn');
//     for (const deleteBtn of DeleteBtns) {
//         deleteBtn.addEventListener('click', function (event) {
//             const parentCard = deleteBtn.parentElement;
//             console.log(parentCard);
//             // const arrChildren = Array.from(children);
//             parentCard.classList.toggle('show');
//         })
//     }
// }

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

// Event listeners for filters
let showFruitsBtn = document.getElementById('showFruitsBtn');
showFruitsBtn.addEventListener("click", () => {loadCards(arrayOfQuestions.filter(function(card){return card.category === "fruit"}))});

let showVegetablesBtn = document.getElementById('showVegetablesBtn');
showVegetablesBtn.addEventListener("click", () => {loadCards(arrayOfQuestions.filter(function(card){return card.category === "vegetable"}))});

// Clearing board
function clearBoard() {
    const board = document.getElementById('board');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    };
};

// Adding new card through user input
const addCardBtn = document.querySelector('#addCard');
addCardBtn.addEventListener('click', addNewCard);

function addNewCard(){
    let categoryInput = document.getElementById('newCategory');
    let questionInput = document.getElementById('newQuestion');
    let answerInput = document.getElementById('newAnswer');
    let newCat = categoryInput.value;
    let newQuestion = questionInput.value;
    let newAnswer = answerInput.value;
    const newCard = {
        category: newCat,
        question: newQuestion,
        answer: newAnswer  
    };
    arrayOfQuestions.push(newCard);
    categoryInput.value = null;
    questionInput.value = null;
    answerInput.value = null;
    loadCards(arrayOfQuestions);
}

// TODO : Add capitalize function