// script.js

// Selectors
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timeDisplay = document.getElementById('timeDisplay');
const phaseDisplay = document.getElementById('phaseDisplay');
const startSound = document.getElementById('startSound');
const endSound = document.getElementById('endSound');
const workDurationInput = document.getElementById('workDuration');
const restDurationInput = document.getElementById('restDuration');
const roundsInput = document.getElementById('rounds');
const progressCircle = document.querySelector('.progress-ring__circle');

// Timer instellingen
let workTime = parseInt(workDurationInput.value);
let restTime = parseInt(restDurationInput.value);
let totalRounds = parseInt(roundsInput.value);
let currentRound = 1;
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
        totalRounds = parseInt(roundsInput.value);
        currentTime = isWorkPhase ? workTime : restTime;
        timeDisplay.textContent = formatTime(currentTime);
        phaseDisplay.textContent = isWorkPhase ? 'Werkfase' : 'Rustfase';
        playStartSound();
    }

    startButton.disabled = true;
    pauseButton.disabled = false;
    workDurationInput.disabled = true;
    restDurationInput.disabled = true;
    roundsInput.disabled = true;

    timerInterval = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            timeDisplay.textContent = formatTime(currentTime);
            let totalTime = isWorkPhase ? workTime : restTime;
            let percent = ((totalTime - currentTime) / totalTime) * 100;
            setProgress(percent);
        } else {
            clearInterval(timerInterval);

            // Check of alle rondes zijn voltooid
            if (!isWorkPhase) {
                if (currentRound >= totalRounds) {
                    // Timer is voltooid
                    playEndSound();
                    timeDisplay.textContent = 'Klaar!';
                    phaseDisplay.textContent = '';
                    startButton.disabled = true;
                    pauseButton.disabled = true;
                    return;
                } else {
                    currentRound++;
                }
            }

            // Wisselen tussen werk- en rustfase
            isWorkPhase = !isWorkPhase;
            currentTime = isWorkPhase ? workTime : restTime;
            timeDisplay.textContent = formatTime(currentTime);
            phaseDisplay.textContent = isWorkPhase ? 'Werkfase' : 'Rustfase';

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
    startButton.disabled = false;
    pauseButton.disabled = true;
}

// Timer resetten
function resetTimer() {
    clearInterval(timerInterval);
    isWorkPhase = true;
    isPaused = false;
    currentRound = 1;
    workTime = parseInt(workDurationInput.value);
    restTime = parseInt(restDurationInput.value);
    totalRounds = parseInt(roundsInput.value);
    currentTime = workTime;
    timeDisplay.textContent = formatTime(currentTime);
    phaseDisplay.textContent = 'Werkfase';
    setProgress(0);

    startButton.disabled = false;
    pauseButton.disabled = true;
    workDurationInput.disabled = false;
    restDurationInput.disabled = false;
    roundsInput.disabled = false;
}

// Startgeluid afspelen
function playStartSound() {
    startSound.currentTime = 0;
    startSound.play();
}

// Eindgeluid afspelen
function playEndSound() {
    endSound.currentTime = 0;
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
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
