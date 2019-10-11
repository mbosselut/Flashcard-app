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
        category: 'fruit',
        question: 'Raisin',
        answer: 'Druif'
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
    },
    {
        category: 'vegetable',
        question: 'Epinards',
        answer: 'Spinazie'
    },
    {
        category: 'vegetable',
        question: 'Citrouille',
        answer: 'Pompoen'
    }
]

//Setting up local storage
let items;
// let data;

//On page load, checks if local storage present or uses hardcoded array
if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'))
} else {
    items = arrayOfQuestions;
}
updateLocalStorage(items);

//
function updateLocalStorage(items){
    localStorage.setItem('items', JSON.stringify(items));
    arrayOfQuestions = JSON.parse(localStorage.getItem('items'));
    // arrayOfQuestions = data;
};


//TODO : Create function to initialize on page load

// Turning a question into a flashcard 
function createCard(cardObject) {
    const board = document.getElementById('board');
    let newDiv = document.createElement('div');
    newDiv.classList.add('flashcard');
    if(cardObject.category === "fruit"){
        newDiv.classList.add('fruit');
    } else {
        newDiv.classList.add('vegetable');
    }
    let deleteBtn = document.createElement('p');
    let newQuestion = document.createElement('p');
    let newAnswer = document.createElement('p');
    newQuestion.classList.add('question');
    newAnswer.classList.add('answer');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerText = 'X Delete card';
    deleteBtn.classList.add('deleteBtn');
    newQuestion.innerText = cardObject.question;
    newAnswer.innerText = cardObject.answer;
    newDiv.appendChild(newQuestion);
    newDiv.appendChild(newAnswer);
    newDiv.appendChild(deleteBtn);
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

// Adding event listeners to the cards
function addEventListeners() {
    const cards = document.getElementsByClassName('flashcard');
    for (const card of cards) {
        card.addEventListener('click', function (event) {
            if (event.target.classList.contains('deleteBtn')) {
                const targetAnswer = event.target.previousSibling.innerText;
                //if broken : replace items by arrayOfQuestions to revert
                const filteredArr = items.filter(function(card){return card.answer !== targetAnswer});
                // console.log(filteredArr);
                //if broken : replace items by arrayOfQuestions to revert
                items = filteredArr;
                updateLocalStorage(items);
                loadCards(arrayOfQuestions);
            } else {
                const children = card.childNodes;
                const arrChildren = Array.from(children);
                arrChildren[1].classList.toggle('show');
            }
        })
    }
    return arrayOfQuestions;
}

// Displaying a random card
function randomCard() {
    const randomIndex = Math.floor(Math.random() * arrayOfQuestions.length);
    clearBoard();
    createCard(arrayOfQuestions[randomIndex]);
    addEventListeners();
    // deleteCard()

}
// Starting the app with a random card
randomCard();

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
    //    arrayOfQuestions.push(newCard);
    items.push(newCard);
    categoryInput.value = null;
    questionInput.value = null;
    answerInput.value = null;
    updateLocalStorage(items);
    loadCards(arrayOfQuestions);
}

// Switching languages
function switchLanguages(cardsArray){
    let arr = [];
    for(const card of cardsArray){
        const {question, answer} = card;
        card.question = answer;
        card.answer = question;
        arr.push(card);
    }
    randomCard();
}

const switchBtn = document.getElementById('switchLanguages');
switchBtn.addEventListener('click', () => {
    switchLanguages(arrayOfQuestions);
    document.getElementById('subtitle').innerHTML === "Dutch" ? 
    document.getElementById('subtitle').innerHTML = 'French' : 
    document.getElementById('subtitle').innerHTML = 'Dutch';
});
// TODO : Add capitalize function
