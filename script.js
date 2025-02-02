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

// Define word object with expected outputs
let wordsObj = {
    BOAT: ["AT", "TO", "BAT", "OAT", "TAB", "BOAT"],
    CARD: ["ARC", "CAR", "CARD"]
};

let randomWord = "",
    currentWord = "",
    inputWord = "";
let foundWords = [];
let count = 0;

// Function to retrieve a random value from an array or object
const randomValue = (arr, obj = false) => {
    if (obj) {
        let keysArr = Object.keys(arr);
        return keysArr[Math.floor(Math.random() * keysArr.length)];
    } else {
        return arr[Math.floor(Math.random() * arr.length)];
    }
};

// Event listener for submit button
submitButton.addEventListener("click", () => {
    errMessage.innerText = "";
    inputContainer.innerText = "";

    // Get the expected words array
    let expectedOutputs = wordsObj[currentWord];
    let expectedSections = document.querySelectorAll(".expected-section");

    // Check if input word is expected and not already found
    if (expectedOutputs.includes(inputWord) && !foundWords.includes(inputWord)) {
        count += 1;
        foundWords.push(inputWord);
        let index = expectedOutputs.indexOf(inputWord);
        expectedSections[index].innerHTML = inputWord;
    } else {
        errMessage.innerText = foundWords.includes(inputWord) ? "Already Entered" : "Invalid Word";
    }

    // Check if all expected words have been found
    if (count === expectedOutputs.length) {
        coverScreen.classList.remove("hide");
        container.classList.add("hide");
        result.classList.remove("hide");
        startButton.innerText = "Restart";
        submitButton.disabled = true;
    }
    
    // Reset input words
    inputWord = "";
});

// Function to handle letter selection
const selectLetter = (e) => {
    errMessage.innerText = "";
    inputWord += e.target.innerText;
    inputContainer.innerText += e.target.innerText;
};

// Function to display dashed for expected words
const displayDashes = () => {
    let expectedOutputs = wordsObj[currentWord];
    expectedOutputs.forEach((element) => {
        let displayItems = element.replace(/./g, `<span class="dashes">_</span>`);
        validWords.innerHTML += `<div class="expected-section">${displayItems}</div>`;
    });
};

// Event listener for start button
startButton.addEventListener("click", () => {
    // Hide cover screen and show game container    
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

    // Get a random word
    currentWord = randomValue(wordsObj, true);
    randomWord = currentWord.split("").sort(() => 0.5 - Math.random());
    
    // Display dashed for expected words
    displayDashes();

    // Display letters
    randomWord.forEach((letter) => {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = letter;
        button.addEventListener("click", selectLetter);
        wordDisplay.appendChild(button);
    });
});

// Initialize the game screen on window load
window.onload = () => {
    coverScreen.classList.remove("hide");
    container.classList.add("hide");
    result.classList.add("hide");
};
