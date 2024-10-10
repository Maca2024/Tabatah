// script.js

// Selectors
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timeDisplay = document.getElementById('timeDisplay');
const startSound = document.getElementById('startSound');
const endSound = document.getElementById('endSound');
const workDurationInput = document.getElementById('workDuration');
const restDurationInput = document.getElementById('restDuration');
const progressCircle = document.querySelector('.progress-ring__circle');

// Timer instellingen
let workTime = parseInt(workDurationInput.value);
let restTime = parseInt(restDurationInput.value);
let isWorkPhase = true;
let currentTime = workTime;
let timerInterval;
let isPaused = false;

// Voortgangscirkel instellen
const radius = progressCircle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// Voortgang bijwerken
function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

// Timer starten
function startTimer() {
    if (isPaused) {
        isPaused = false;
    } else {
        workTime = parseInt(workDurationInput.value);
        restTime = parseInt(restDurationInput.value);
        currentTime = isWorkPhase ? workTime : restTime;
        timeDisplay.textContent = formatTime(currentTime);
        playStartSound();
    }

    timerInterval = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            timeDisplay.textContent = formatTime(currentTime);
            let totalTime = isWorkPhase ? workTime : restTime;
            let percent = ((totalTime - currentTime) / totalTime) * 100;
            setProgress(percent);
        } else {
            clearInterval(timerInterval);
            isWorkPhase = !isWorkPhase;
            currentTime = isWorkPhase ? workTime : restTime;
            timeDisplay.textContent = formatTime(currentTime);
            if (isWorkPhase) {
                playStartSound();
            } else {
                playEndSound();
            }
            setProgress(0);
            startTimer();
        }
    }, 1000);
}

// Timer pauzeren
function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
}

// Timer resetten
function resetTimer() {
    clearInterval(timerInterval);
    isWorkPhase = true;
    isPaused = false;
    workTime = parseInt(workDurationInput.value);
    restTime = parseInt(restDurationInput.value);
    currentTime = workTime;
    timeDisplay.textContent = formatTime(currentTime);
    setProgress(0);
}

// Startgeluid afspelen
function playStartSound() {
    startSound.play();
}

// Eindgeluid afspelen
function playEndSound() {
    endSound.play();
}

// Helperfunctie om tijd te formatteren
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;
    return `${mins}:${secs}`;
}

// Event Listeners
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    pauseButton.disabled = false;
    startTimer();
});

pauseButton.addEventListener('click', () => {
    pauseButton.disabled = true;
    startButton.disabled = false;
    pauseTimer();
});

resetButton.addEventListener('click', () => {
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetTimer();
});

// Pauzeknop initialiseren als uitgeschakeld
pauseButton.disabled = true;
