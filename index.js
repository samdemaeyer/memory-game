let totalCards = 16;
let selectedCards = [];
let correctCards = 0;

function initiateGame() {
  const cards = [...Array(totalCards).keys()];
  const availableColors = ['red', 'green', 'blue', 'gray', 'purple', 'yellow', 'pink', 'teal'];
  const gameColors = [];
  const gameContainer = document.querySelector('.container');
  gameContainer.innerHTML = '';

  for (let i = 0; i < totalCards / 2; i++) {
    gameColors.push(availableColors[i]);
    gameColors.push(availableColors[i]);
  }
  shuffleArray(gameColors);

  cards.forEach(i => {
    const cardColor = gameColors[i];
    const card = document.createElement('div');
    card.classList.add('flip-card');
    card.setAttribute('data-card-id', cardColor);
    const innerCard = document.createElement('div');
    innerCard.classList.add('flip-card-inner');
    const cardFront = document.createElement('div');
    cardFront.classList.add('flip-card-front', `bg-${cardColor}`);
    const cardBack = document.createElement('div');
    cardBack.classList.add('flip-card-back');
    const title = document.createElement('h4');
    title.innerText = 'Memory Game';
    cardBack.appendChild(title);
    innerCard.appendChild(cardFront);
    innerCard.appendChild(cardBack);
    card.appendChild(innerCard);
    card.addEventListener('click', clickEvent);
    gameContainer.appendChild(card);
  });
}

initiateGame();

function clickEvent({ target }) {
  const clickedCard = target.closest('.flip-card');
  clickedCard.classList.add('flipped');
  selectedCards.push(clickedCard);

  if (!selectedCards[1]) { return; }

  if (!cardsMatch(selectedCards)) {
    setTimeout(() => {
      selectedCards.forEach(card => card.classList.remove('flipped'));
      selectedCards = [];
    }, 800);
  } else {
    selectedCards = [];
    correctCards++;
  }
  if (totalCards / 2 === correctCards) {
    setTimeout(fireWorks, 800);
    setTimeout(initiateGame, 11600);
    correctCards = 0;
  }
};

function cardsMatch(cards) {
  return cards[0].getAttribute('data-card-id') === cards[1].getAttribute('data-card-id');
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

function selectTotalCards({ value }) {
  totalCards = Number(value);
  initiateGame();
}

document.addEventListener('keyup', ({ keyCode }) => {
  if (keyCode === 27) {
    resetAll();
  }
});