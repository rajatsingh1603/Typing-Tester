const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
var interval;
var timeRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):

function helper(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:

function setTimer() {
    let currentTime = helper(timer[0]) + ":" + helper(timer[1]) + ":" + helper(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100 - (timer[0] * 60)));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}


// Match the text entered with the provided text on the page:

function spellCheck() {
    let enteredText = testArea.value;
    let originTextnew = originText.substring(0, enteredText.length);

    if (enteredText == originText) {
        testWrapper.style.borderColor = "#90EE90";
        clearInterval(interval);
    }
    else {
        if (enteredText == originTextnew) {
            testWrapper.style.borderColor = "#65CCF3";
        }
        else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}


// Start the timer:

function start() {
    let enterdTextLength = testArea.value.length;
    if (enterdTextLength === 0 && !timeRunning) {
        timeRunning = true;
        interval = setInterval(setTimer, 10);
    }
}


// Reset everything:

function reset() {
    clearInterval(interval);
    timer = [0, 0, 0, 0];
    timeRunning = false;
    interval = null;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";


}


// Event listeners for keyboard input and the reset button:

testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
