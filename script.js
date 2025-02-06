// Get reference to HTML elements
const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
const container = document.querySelector(".container");
const wordDisplay = document.querySelector(".word-display");
const inputContainer = document.querySelector(".input-container");
const validWords = document.querySelector(".valid-words");
const submitButton = document.querySelector("#submit-button");
const errMessage = document.getElementById("err-message");
const stopButton = document.getElementById("stop-button");
const levelDisplay = document.getElementById("level-display");
const timerDisplay = document.getElementById("timer-display");

// Define words for the game
let wordsObj = {
    BOAT: ["AT", "TO", "BAT", "OAT", "TAB", "BOAT"],
    CARD: ["ARC", "CAR", "CARD"],
    SHIP: ["HIP", "SIP", "SHIP"],
    GAME: ["MAG", "AGE", "GAM", "GAME"],
    STAR: ["SAT", "TAR", "ART", "STAR"],
    PLAN: ["PAN", "NAP", "PLAN"],
};

let randomWord = "",
    currentWord = "",
    inputWord = "";
let foundWords = [];
let count = 0;
let timer;
let timeLeft = 60;

// Level variables
let currentLevel = 1;
const maxLevel = 4;

// Function to get a random word
const randomValue = (arr, obj = false) => {
    if (obj) {
        let keysArr = Object.keys(arr);
        return keysArr[Math.floor(Math.random() * keysArr.length)];
    } else {
        return arr[Math.floor(Math.random() * arr.length)];
    }
};

// Function to display dashes for expected words
const displayDashes = () => {
    validWords.innerHTML = "";
    let expectedOutputs = wordsObj[currentWord];

    expectedOutputs.forEach((word) => {
        let displayItems = word.replace(/./g, `<span class="dashes">_</span>`);
        validWords.innerHTML += `<div class="expected-section">${displayItems}</div>`;
    });
};

// Function to start the game timer
const startTimer = () => {
    timeLeft = 60; // Reset timer
    timerDisplay.innerText = `Time: ${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
    
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.innerText = `Time: ${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
        } else {
            clearInterval(timer);
            errMessage.innerText = "Time's up!";
            submitButton.disabled = true;

            // Show "Time's up!" on cover screen
            result.innerText = "Time's up!";
            coverScreen.classList.remove("hide");
            container.classList.add("hide");
            result.classList.remove("hide");
            startButton.innerText = "Restart";
        }
    }, 1000);
};

// Function to handle letter selection
const selectLetter = (e) => {
    errMessage.innerText = "";
    inputWord += e.target.innerText;
    inputContainer.innerText += e.target.innerText;
};

// Event listener for submit button
submitButton.addEventListener("click", () => {
    errMessage.innerText = "";
    inputContainer.innerText = "";

    let expectedOutputs = wordsObj[currentWord];
    let expectedSections = document.querySelectorAll(".expected-section");

    if (expectedOutputs.includes(inputWord) && !foundWords.includes(inputWord)) {
        count += 1;
        foundWords.push(inputWord);
        let index = expectedOutputs.indexOf(inputWord);
        expectedSections[index].innerHTML = inputWord;
    } else {
        errMessage.innerText = foundWords.includes(inputWord) ? "Already Entered" : "Invalid Word";
    }

    if (count === expectedOutputs.length) {
        clearInterval(timer);

        if (currentLevel < maxLevel) {
            currentLevel++; // Move to the next level
            levelDisplay.innerText = `Level: ${currentLevel}`;
            startGame(); // Start next level
        } else {
            // Game completed at level 4
            coverScreen.classList.remove("hide");
            container.classList.add("hide");
            result.innerText = "You won!";
            result.classList.remove("hide");
            startButton.innerText = "Restart";
            submitButton.disabled = true;
        }
    }

    inputWord = "";
});

// Function to start/restart the game
const startGame = () => {
    container.classList.remove("hide");
    coverScreen.classList.add("hide");
    errMessage.innerText = "";
    inputContainer.innerText = "";
    wordDisplay.innerHTML = "";
    inputWord = "";
    count = 0;
    submitButton.disabled = false;
    validWords.innerHTML = "";
    foundWords = [];
    timeLeft = 60;

    // Get a random word
    currentWord = randomValue(wordsObj, true);
    randomWord = currentWord.split("").sort(() => 0.5 - Math.random());

    displayDashes();

    // Display shuffled letters as buttons
    randomWord.forEach((letter) => {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = letter;
        button.addEventListener("click", selectLetter);
        wordDisplay.appendChild(button);
    });

    startTimer();
};

// Event listener for start button
startButton.addEventListener("click", () => {
    currentLevel = 1; // Reset to Level 1 when restarting
    levelDisplay.innerText = `Level: ${currentLevel}`;
    startGame();
});

// Event listener for stop button
stopButton.addEventListener("click", () => {
    clearInterval(timer); // Stop the timer
    container.classList.add("hide");
    coverScreen.classList.remove("hide");

    errMessage.innerText = "";
    inputContainer.innerText = "";
    wordDisplay.innerHTML = "";
    validWords.innerHTML = "";
    foundWords = [];
    count = 0;
    startButton.innerText = "Start Game";
    submitButton.disabled = false;
    timeLeft = 60;
    timerDisplay.innerText = `Time: 00:00`;
});

// Initialize the game screen on window load
window.onload = () => {
    coverScreen.classList.remove("hide");
    container.classList.add("hide");
    result.classList.add("hide");
};
