// script.js

// Selectors
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const timeDisplay = document.getElementById('timeDisplay');
const startSound = document.getElementById('startSound');
const endSound = document.getElementById('endSound');

// Timer settings
let workTime = 20;  // 20 seconds of work
let restTime = 10;  // 10 seconds of rest
let isWorkPhase = true;  // Toggle between work and rest
let countdown = 3;  // Last 3 seconds countdown
let timerInterval;

// Start the Timer
function startTimer() {
    playStartSound();  // Play sound at the start of the work period
    let currentTime = isWorkPhase ? workTime : restTime;

    timerInterval = setInterval(() => {
        // Countdown logic
        if (currentTime > 0) {
            currentTime--;
            timeDisplay.textContent = formatTime(currentTime);

            // Play countdown sound in the last 3 seconds
            if (currentTime <= countdown && isWorkPhase) {
                playCountdownSound();
            }
        } else {
            // Switch between work/rest phases
            clearInterval(timerInterval);
            isWorkPhase = !isWorkPhase;
            if (isWorkPhase) {
                playStartSound();  // New work period
                currentTime = workTime;
            } else {
                playEndSound();  // End of work, enter rest period
                currentTime = restTime;
            }
            startTimer();  // Restart timer for next phase
        }
    }, 1000);  // 1-second interval
}

// Play start sound
function playStartSound() {
    startSound.play();
}

// Play end sound
function playEndSound() {
    endSound.play();
}

// Reset the Timer
function resetTimer() {
    clearInterval(timerInterval);
    isWorkPhase = true;
    timeDisplay.textContent = "00:20";  // Reset display
}

// Helper function to format time
function formatTime(seconds) {
    return seconds < 10 ? `00:0${seconds}` : `00:${seconds}`;
}

// Event Listeners
startButton.addEventListener('click', () => {
    startButton.disabled = true;  // Disable start button once timer begins
    startTimer();
});

resetButton.addEventListener('click', resetTimer);


// Selectors
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const timeDisplay = document.getElementById('timeDisplay');
const startSound = document.getElementById('startSound');
const endSound = document.getElementById('endSound');

// Timer settings
let workTime = 20;  // 20 seconds of work
let restTime = 10;  // 10 seconds of rest
let isWorkPhase = true;  // Toggle between work and rest
let countdown = 3;  // Last 3 seconds countdown
let timerInterval;

// Start the Timer
function startTimer() {
    playStartSound();  // Play sound at the start of the work period
    let currentTime = isWorkPhase ? workTime : restTime;

    timerInterval = setInterval(() => {
        // Countdown logic
        if (currentTime > 0) {
            currentTime--;
            timeDisplay.textContent = formatTime(currentTime);

            // Play countdown sound in the last 3 seconds
            if (currentTime <= countdown && isWorkPhase) {
                playCountdownSound();
            }
        } else {
            // Switch between work/rest phases
            clearInterval(timerInterval);
            isWorkPhase = !isWorkPhase;
            if (isWorkPhase) {
                playStartSound();  // New work period
                currentTime = workTime;
            } else {
                playEndSound();  // End of work, enter rest period
                currentTime = restTime;
            }
            startTimer();  // Restart timer for next phase
        }
    }, 1000);  // 1-second interval
}

// Play start sound
function playStartSound() {
    startSound.play();
}

// Play end sound
function playEndSound() {
    endSound.play();
}

// Reset the Timer
function resetTimer() {
    clearInterval(timerInterval);
    isWorkPhase = true;
    timeDisplay.textContent = "00:20";  // Reset display
}

// Helper function to format time
function formatTime(seconds) {
    return seconds < 10 ? `00:0${seconds}` : `00:${seconds}`;
}

// Event Listeners
startButton.addEventListener('click', () => {
    startButton.disabled = true;  // Disable start button once timer begins
    startTimer();
});

resetButton.addEventListener('click', resetTimer);
