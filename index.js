// Create array of questions
let arrayOfQuestion = [
    {
        category : 'fruits',
        question : 'Fraise',
        answer : 'Aardbei'
    },
    {
        category : 'fruits',
        question : 'Orange',
        answer : 'Sinaasappel'
    },
    {
        category : 'fruits',
        question : 'Cerise',
        answer : 'Kers'
    },
    {
        category : 'fruits',
        question : 'Banane',
        answer : 'Banaan'
    }
]
// Function turning a question into a flashcard 
function createCard(cardObject) {
    let newDiv = document.createElement('div');
}
// Function looping through array to display them all

// Function deleting a card

let h1 = document.getElementById('clickMe');

// h1.onClick = function() {
//     console.log('you clicked me');
// }
h1.addEventListener('click', (e) => {
    console.log(e);
    h1.style.color = "yellow";
});

const cards = document.getElementsByClassName('flashcard');
for (const card of cards) {
    card.addEventListener('click', function(event) {
        const children = card.childNodes;
        const arrChildren = Array.from(children);
        arrChildren[3].classList.toggle('show');
    })
}