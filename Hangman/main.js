//IDEA ONE
//get letters container
let letterContainer = document.querySelector(".letters");
//generate letters
let letters = "abcdefghijklmnopqrstuvwxyz";
//make arr from letters
let lettersArray = [...letters];
//loop array
lettersArray.forEach((letter) => {
  //create span
  let span = document.createElement("span");
  //create textNode as letter
  let textNode = document.createTextNode(letter);
  //append letter to span
  span.appendChild(textNode);
  //add class to span
  span.className = "letter-box";
  //add span to letter container
  letterContainer.appendChild(span);
});

//SECOND IDEA
//object of words and categories
let words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scale",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
//GET RANDOM PROPERTY
let allKeys = Object.keys(words);
//random number depend on length
let propNumber = Math.floor(Math.random() * allKeys.length);
//category name
let propName = allKeys[propNumber];
//category words
let propValue = words[propName];
//random number depend on length
let valueNumber = Math.floor(Math.random() * propValue.length);
//chosen word
let valueValue = propValue[valueNumber];
//set category info
document.querySelector(".game-info span").innerHTML = propName;

//THIRD IDEA
//select letter guess ele
let letterGuessContainer = document.querySelector(".letters-guess");
//convert chosen word to array
let lettersAndSpace = Array.from(valueValue);
//create spans depend on word
lettersAndSpace.forEach((letter) => {
  //create empty spans
  let emptySpans = document.createElement("span");
  //if letter is space
  if (letter === " ") {
    emptySpans.className = "with-space";
  }
  //append span to guess container
  letterGuessContainer.appendChild(emptySpans);
});

//FOURTH IDEA
//get array of guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");
//set wrong attempts
let wrongAttempts = 0;
//select draw ele
let theDraw = document.querySelector(".hangman-draw");
//handle clicking on letters
let arrOfAnswer = [];
document.addEventListener("click", (e) => {
  //set the chose status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    //get clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    //compare clicked letter with chosen word
    let theChosenWord = Array.from(valueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (clickedLetter == wordLetter) {
        theStatus = true;
        //loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordLetter;
            if (span.innerHTML != " ") {
              arrOfAnswer.push(span.innerHTML);
            }
          }
        });
      }
    });
    // if letter is wrong
    if (theStatus !== true) {
      //increase wrong attempts
      wrongAttempts++;
      // add class wrong on the draw ele
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      //play fail sound
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        letterContainer.classList.add("finished");
      }
    } else {
      //play success sound
      document.getElementById("success").play();
    }
  }
  if (arrOfAnswer.length === [...valueValue].length) {
    successGame();
  }
});
let container = document.querySelector(".container");
function endGame() {
  let div = document.createElement("div");
  div.innerHTML = `Game Over, The Word Is ${valueValue} <span>&#128557<span><span>&#128557<span>`;
  div.className = "popup";
  container.style.opacity = 0.2;
  document.body.appendChild(div);
}
function successGame() {
  let div = document.createElement("div");
  div.innerHTML = `Good Jop, The Filar trial Is ${wrongAttempts} <span>&#128519<span><span>&#128519<span>`;
  div.className = "popupSuc";
  container.style.opacity = 0.2;
  document.body.appendChild(div);
}
