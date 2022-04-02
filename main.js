const cards = [
  {
    id: 1,
    name: "Angular",
    src: "./angular.png",
    isVisible: false,
    opacity: 1,
  },
  {
    id: 2,
    name: "Express",
    src: "./express.jpg",
    isVisible: false,
    opacity: 1,
  },
  {
    id: 3,
    name: "Javascript",
    src: "./javascript.png",
    isVisible: false,
    opacity: 1,
  },
  { id: 4, name: "jQuery", src: "./jquery.png", isVisible: false, opacity: 1 },
  { id: 5, name: "React", src: "./react.jpeg", isVisible: false, opacity: 1 },
  { id: 6, name: "Vue", src: "./vue.jpg", isVisible: false, opacity: 1 },
  {
    id: 7,
    name: "Angular",
    src: "./angular.png",
    isVisible: false,
    opacity: 1,
  },
  {
    id: 8,
    name: "Express",
    src: "./express.jpg",
    isVisible: false,
    opacity: 1,
  },
  {
    id: 9,
    name: "Javascript",
    src: "./javascript.png",
    isVisible: false,
    opacity: 1,
  },
  { id: 10, name: "jQuery", src: "./jquery.png", isVisible: false, opacity: 1 },
  { id: 11, name: "React", src: "./react.jpeg", isVisible: false, opacity: 1 },
  { id: 12, name: "Vue", src: "./vue.jpg", isVisible: false, opacity: 1 },
];

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

// if (true) shuffleArray(cards);

const scoreH3 = document.createElement("h3");
scoreH3.innerText = 0;

const playerDiv = document.querySelector(".player-state");

playerDiv.append(scoreH3);

const cardsDiv = document.querySelector(".cards-container");

let idOfVisibleCard = [];
let score = 0;

const renderCards = () => {
  //   const matchCard = cards.filter((element) => element.isVisible === true);

  if (score === 25) {
    const won = document.createElement("h1");
    won.innerText = "You Won";
    playerDiv.append(won);
  }

  cardsDiv.innerText = "";
  cards.forEach((element, index) => {
    const image = document.createElement("img");
    image.name = element.name;
    image.id = element.id;
    image.style.opacity = element.opacity;
    if (element.isVisible === false) {
      image.src = "./card back cover.png";
    } else {
      image.src = element.src;
    }

    cardsDiv.append(image);

    //we add the condition so that visible match card wont have an EventListener because having it would be a problem
    if (element.isVisible === false) {
      image.addEventListener("click", () => {
        showCard(element, index); //we pass the element img and index to the showCard function, this is how we pass parameter to the function eventListener
      });
    }
  });

  //   if (idOfVisibleCard.length === 2) {
  //     checkCards();
  //   }
};

// // how to make the card filp after the first timer reaches zero
// setTimeout(() => {
//   renderCards();
// }, 1000);

renderCards();

const showCard = (image, index) => {
  cards[index].isVisible = true;
  idOfVisibleCard.push(image);
  image.isVisible = true;
  if (idOfVisibleCard.length === 2) {
    // checkCards();
    setTimeout(() => {
      checkCards();
    }, 300);
  }
  renderCards();
};

const checkCards = () => {
  if (idOfVisibleCard[0].name !== idOfVisibleCard[1].name) {
    cards[idOfVisibleCard[0].id - 1].isVisible = false;
    cards[idOfVisibleCard[1].id - 1].isVisible = false;
    idOfVisibleCard = [];
  } else {
    cards[idOfVisibleCard[0].id - 1].opacity = 0.1;
    cards[idOfVisibleCard[1].id - 1].opacity = 0.1;
    idOfVisibleCard = [];
    score += 5;
    scoreH3.innerText = score;
  }
  renderCards();
};

// const checkCards = () => {
//   if (idOfVisibleCard[0].name !== idOfVisibleCard[1].name) {
//     cards[idOfVisibleCard[0].id - 1].isVisible = false;
//     cards[idOfVisibleCard[1].id - 1].isVisible = false;
//     idOfVisibleCard = [];
//   } else {
//     cards[idOfVisibleCard[0].id - 1].opacity = 0.1;
//     cards[idOfVisibleCard[1].id - 1].opacity = 0.1;

//     idOfVisibleCard = [];
//     score += 5;
//     scoreH3.innerText = score;
//   }
// };
