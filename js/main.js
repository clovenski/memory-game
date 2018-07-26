const GAME_SIZE = 16;           // number of boxes in window
const INIT_LIVES = 10;          // amount of lives player starts with
const MATCH_COLOR = "#33cc33";  // background color for matched elements
var firstChoice;                // will hold player's first choice
var secondChoice;               // will hold player's second choice
var solvedBoxes;                // amount of boxes that have been matched
var lives;                      // number of lives player currently has

function pressPowerButton() {
    var button = document.getElementById("power_button");
    button.innerHTML == "Start Game" ? startGame() : exitGame();
}

function startGame() {
    // change power button to "Exit Game"
    document.getElementById("power_button").innerHTML = "Exit Game";
    // show game window
    document.getElementById("window").style.display = "block";
    // initialize game variables
    lives = INIT_LIVES;
    updateStatus("Good luck!");
    firstChoice = secondChoice = undefined;
    solvedBoxes = 0;

    // set up grid elements
    var randomNum;
    var targetElement;
    for (var i = 1; i <= GAME_SIZE / 2; i++) {
        for (var j = 0; j < 2;) {
            randomNum = Math.floor(Math.random() * 16) + 1;
            targetElement = document.getElementById("element" + randomNum);
            if (targetElement.innerHTML == "") {
                targetElement.innerHTML = i;
                j++;
            }
        }
    }
}

function exitGame() {
    var targetBox;
    var targetButton;
    var targetElement;

    // for every box in window, reset its button and game element to initial state
    for (var i = 1; i <= GAME_SIZE; i++) {
        targetBox = document.getElementById("box" + i);
        targetButton = targetBox.children[0];
        targetElement = targetBox.children[1];
        targetButton.style.display = "inline";
        targetElement.style.backgroundColor = "transparent";
        targetElement.style.display = "none";
        targetElement.innerHTML = "";
    }

    document.getElementById("window").style.display = "none";
    document.getElementById("power_button").innerHTML = "Start Game";
    document.getElementById("status").innerHTML = "";
}

function pressBoxButton(boxNumber) {
    var targetBox = document.getElementById("box" + boxNumber);

    // if player is making their first choice
    if (typeof firstChoice === 'undefined') {
        firstChoice = {
            box: targetBox,
            button: targetBox.children[0],
            element: targetBox.children[1]
        };

        // show game element
        firstChoice.element.style.display = "block";
        // hide button
        firstChoice.button.style.display = "none";

    } else { // player is making their second choice
        // check for equal box elements:
        // if match then change background color to green and hide both buttons
        // else hide both box elements and show first choice button
        secondChoice = {
            box: targetBox,
            button: targetBox.children[0],
            element: targetBox.children[1]
        };

        // if the game elements match, ie. contain the same number
        if (firstChoice.element.innerHTML == secondChoice.element.innerHTML) {
            firstChoice.element.style.backgroundColor = MATCH_COLOR;
            secondChoice.button.style.display = "none";
            secondChoice.element.style.backgroundColor = MATCH_COLOR;
            secondChoice.element.style.display = "block";
            solvedBoxes += 2;
            solvedBoxes == GAME_SIZE ? winGame() : updateStatus("That was a match!");
        } else {
            firstChoice.button.style.display = "inline";
            firstChoice.element.style.display = "none";
            lives--;
            lives == 0 ? loseGame() : updateStatus("That was not a match!");
        }
        
        firstChoice = secondChoice = undefined;
    }
}

function updateStatus(message) {
    var statusString = "You have " + lives + (lives > 1 ? " lives" : " life") + " left! " + message;
    document.getElementById("status").innerHTML = statusString;
}

function loseGame() {
    var targetBox;
    var targetButton;
    var targetElement;

    document.getElementById("status").innerHTML = "You lost!";
    // for every box in window, show its element and hide its button
    for (var i = 1; i <= GAME_SIZE; i++) {
        targetBox = document.getElementById("box" + i);
        targetButton = targetBox.children[0];
        targetElement = targetBox.children[1];

        targetButton.style.display = "none";
        targetElement.style.display = "block";
    }
}

function winGame() {
    var winMessage = "You won! You had " + lives + (lives > 1 ? " lives" : " life") + " left!";
    document.getElementById("status").innerHTML = winMessage;
}
