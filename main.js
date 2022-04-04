const originalCard = [
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

// const cards = originalCard;
const cards = shuffleArray(originalCard);

const scoreH3 = document.createElement("h1");
scoreH3.innerText = "score: 0";
scoreH3.className = "score";
const playerDiv = document.querySelector(".player-state");
playerDiv.append(scoreH3);

let startingGameTimer = 8;
const timerH1 = document.createElement("h1");
timerH1.innerText = `time left to start the game: ${startingGameTimer}`;
timerH1.className = "starting-timer";
playerDiv.append(timerH1);

const playPageDiv = document.querySelector(".playing-page");

const scorePage = document.querySelector(".score-page");

const startGame = () => {
  const homeDiv = document.querySelector(".home-page");
  homeDiv.style.display = "none";

  playPageDiv.style.display = "block";

  const setIntervalId = setInterval(() => {
    startingGameTimer--;
    timerH1.innerText = `time left to start the game: ${startingGameTimer}`;
  }, 1000);

  setTimeout(() => {
    clearInterval(setIntervalId);
    renderCards();

    ///////////////////////////////////////
    if (startingGameTimer === 0) {
      timerH1.style.display = "none";
      let finishingGameTimer = 20;
      const finishGameTimerH1 = document.createElement("h1");
      finishGameTimerH1.innerText = `time left to finish the game: ${finishingGameTimer}`;
      finishGameTimerH1.className = "finish-timer";
      playerDiv.append(finishGameTimerH1);

      const setIntervalFinishId = setInterval(() => {
        finishingGameTimer--;
        finishGameTimerH1.innerText = `time left to finish the game: ${finishingGameTimer}`;
      }, 1000);

      setTimeout(() => {
        clearInterval(setIntervalFinishId);
        if (finishingGameTimer === 0) {
          playPageDiv.style.display = "none";
          scorePage.style.display = "block";
          scoreList();
        }
      }, 20400); //we add 400 millisecond because in the code under we determine that it will take 300 millisecond to check the card so in the case in the last second the user manage to make a score it will be counted

      //the end of the condition
    }

    ////////////////////////////////////////
  }, 8000);
};

const playBtn = document.querySelector(".home__play-btn");
playBtn.addEventListener("click", startGame);

const cardsDiv = document.querySelector(".cards-container");

let visibleCards = [];
let idOfVisibleCards = [];
let score = 0;

const renderCards = () => {
  if (score === 30) {
    clearInterval(3);
    playPageDiv.style.display = "none";
    scorePage.style.display = "block";
    scoreList();
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
};

const showCard = (image, index) => {
  cards[index].isVisible = true;
  visibleCards.push(image);
  idOfVisibleCards.push(index);

  image.isVisible = true;
  if (visibleCards.length === 2) {
    // checkCards(cards[index]);
    setTimeout(() => {
      checkCards(cards[index]);
    }, 250);
  }
  renderCards();
};

const checkCards = () => {
  if (visibleCards[0].name !== visibleCards[1].name) {
    cards[idOfVisibleCards[0]].isVisible = false;
    cards[idOfVisibleCards[1]].isVisible = false;
    visibleCards = [];
    idOfVisibleCards = [];
  } else {
    cards[idOfVisibleCards[0]].opacity = 0.2;
    cards[idOfVisibleCards[1]].opacity = 0.2;
    visibleCards = [];
    idOfVisibleCards = [];
    score += 5;
    if (score === 25) {
      score = 30;
    }
    scoreH3.innerText = `your score: ${score}`;
  }
  renderCards();
};

const scoreList = () => {
  const currentScore = document.querySelector(".score__current-score");
  currentScore.innerText = `Your Score For This Game Is ${score}`;

  const playAgainBtn = document.querySelector(".score__play-again-btn");
  playAgainBtn.style.display = "none";

  // playAgainBtn.addEventListener("click", () => {
  //   window.location.reload();
  // });

  // invoking the localstorage function
  pervoiusScores();
};

const pervoiusScores = () => {
  if (localStorage.getItem("pervoiusScores") === null) {
    localStorage.setItem("pervoiusScores", [score]);
    //todo invoke the display prevous scores list function
    displayPreviousScores();
    return;
  } else {
    const storedScores = localStorage.getItem("pervoiusScores");
    const scoresArray = storedScores.split(",");
    const scoresNumbersArray = scoresArray.map((number) => +number); //this is called the unary + operator and it is used to convert string to numbers

    // score = 7;
    // const scoresNumbersArray = [5, 6, 8];

    if (scoresNumbersArray.length < 5) {
      scoresNumbersArray.push(score);
      const sortArray = scoresNumbersArray.sort((a, b) => b - a);
      localStorage.setItem("pervoiusScores", sortArray);
      // make a return while to get out of the function before continuing the code under
      displayPreviousScores();
      return;
    }

    const orderingArray = (array) => {
      const sortArrayAsce = array.sort((a, b) => a - b);

      sortArrayAsce[0] = score;

      const sortArrayDesc = sortArrayAsce.sort((a, b) => b - a);
      return sortArrayDesc;
    };
    const sortArray = orderingArray(scoresNumbersArray);

    localStorage.setItem("pervoiusScores", sortArray);

    displayPreviousScores();
  }
};

//localStorage.setItem('pervoiusScores', '0');
const displayPreviousScores = () => {
  const homePageDiv = document.querySelector(".home-page");
  homePageDiv.style.display = "none";

  const pervoiusScoresDiv = document.querySelector(".previous-score-list");

  // pervoiusScoresDiv.style.display = "block";
  pervoiusScoresDiv.style = "display: grid;place-items: center;";

  const pervoiusScoresList = localStorage.getItem("pervoiusScores");

  if (pervoiusScoresList === null) {
    const firstTimeDiv = document.querySelector(
      ".previous-score-list__first-time"
    );

    // firstTimeDiv.style.display = "block";
    firstTimeDiv.style = " display: grid; place-items: center; ";

    const goBackBtn = document.querySelector(
      ".previous-score-list__first-time button"
    );

    goBackBtn.addEventListener("click", () => {
      window.location.reload();
    });

    return;
  }

  const playedBeforeDiv = document.querySelector(
    ".previous-score-list__played-before"
  );

  // playedBeforeDiv.style.display = "block";
  playedBeforeDiv.style = "display: grid;";

  const topFiveH1 = document.createElement("h1");
  topFiveH1.innerText = "Your Top Five Scores";
  playedBeforeDiv.append(topFiveH1);

  const scoresArray = pervoiusScoresList.split(",");

  scoresArray.forEach((element) => {
    const h1 = document.createElement("h1");
    h1.innerText = `Score: ${element}`;
    playedBeforeDiv.append(h1);

    h1.style = "color: yellow;";
  });

  const playAgainBtn = document.createElement("button");
  playAgainBtn.innerText = "Play Again";
  playedBeforeDiv.append(playAgainBtn);

  playAgainBtn.addEventListener("click", () => {
    window.location.reload();
  });
};

const pervoiusScoresBtn = document.querySelector(".home__scores-btn");
pervoiusScoresBtn.addEventListener("click", displayPreviousScores);
