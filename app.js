const words = [
  "perro",
  "gato",
  "leon",
  "elefante",
  "cebra",
  "jirafa",
  "chancho",
  "caballo",
  "pajaro",
  "aguila",
  "paloma",
  "tigre",
  "chita",
  "leopardo",
  "cocodrilo",
  "ciervo",
  "cocodrilo",
  "yaguarete",
  "oso",
  "pez",
  "tiburon",
  "delfin",
  "raya",
  "serpiente",
  "ballena",
  "foca",
  "lobo",
  "pinguino",
  "orca",
  "ardilla",
  "rata",
  "condor",
  "llama",
  "guanaco",
  "rinoceronte",
  "sapo",
  "rana",
  "mono",
  "gorila",
  "raton",
  "loro",
  "cotorra",
  "toro",
  "vaca",
  "pollo",
  "cerdo",
  "gallo",
  "gallina",
  "koala",
  "orangutan",
  "mandril",
  "huron",
  "camaleon",
  "flamenco",
  "pato",
  "cisne",
  "vibora",
];

let wordStatus;
let answer;
let guessed = [];
let wrongLettersDisplay = [];
let maxMistakes = 6;
let mistakesCount = 0;
const keyboard = document.querySelector(".keyboard");
const resetBtn = document.querySelector(".play-btn");
const wrongLetters = document.querySelector("#wrong-letters");
const manFigure = document.querySelectorAll(".man-figure");
const answerDisplay = document.querySelector("#show-answer");

const randomWord = () => {
  answer = words[Math.floor(Math.random() * words.length)];
};

const generateKeyboard = () => {
  let buttons = "abcdefghijklmnñopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
        <button 
        class='btn' 
        id='` +
        letter +
        `'
        onClick='handleGuess("` +
        letter +
        `")'>` +
        letter +
        `
        </button>`
    )
    .join("");

  keyboard.innerHTML = buttons;
};

const guessedWord = () => {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.querySelector("#word").innerHTML = wordStatus;
};

const handleGuess = (chosenLetter) => {
  if (guessed.indexOf(chosenLetter) === -1) {
    guessed.push(chosenLetter);
  } else {
    guessed.push(null);
  }

  //Disable btn when clicked once
  const btnClicked = document.getElementById(chosenLetter);
  btnClicked.setAttribute("disabled", true);
  btnClicked.style.opacity = "0.6";

  // If guess is correct vs not correct
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    isGameOver();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakesCount++;
    wrongLettersDisplay.push(chosenLetter);
    wrongLetters.innerHTML = wrongLettersDisplay;
    isGameOver();
    manFigure[mistakesCount - 1].style.display = "block";
  }
};

// Check if user won or lost
const isGameOver = () => {
  if (mistakesCount === maxMistakes) {
    keyboard.innerHTML = "Se acabaron las oportunidades! Perdiste.";
    answerDisplay.innerHTML = `La palabra era: ${answer}`;
    keyboard.classList.add("is-game-over");
    resetBtn.classList.add("fadeIn");
    resetBtn.classList.remove("fadeOut");
  }
  if (wordStatus === answer) {
    keyboard.innerHTML = "Descubriste la palabra! Ganaste.";
    keyboard.classList.add("is-game-over");
    resetBtn.classList.add("fadeIn");
    resetBtn.classList.remove("fadeOut");
  }
};

const playAgain = () => {
  resetBtn.addEventListener("click", () => {
    guessed = [];
    mistakesCount = 0;
    wordStatus = null;
    generateKeyboard();
    wrongLettersDisplay = [];
    keyboard.classList.remove("is-game-over");
    resetBtn.classList.remove("fadeIn");
    resetBtn.classList.add("fadeOut");
    randomWord();
    guessedWord();
    wrongLetters.innerHTML = "";
    for (manPart of manFigure) {
      manPart.style.display = "none";
    }
    answerDisplay.innerHTML = "";
  });
};

randomWord();
generateKeyboard();
guessedWord();
playAgain();
