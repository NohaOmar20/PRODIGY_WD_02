let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

// DOM Elements
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const lapsEl = document.getElementById("laps");

// Format time
function formatTime(time) {
  return time.toString().padStart(2, "0");
}

// Update display
function updateDisplay() {
  const time = elapsedTime;
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  hoursEl.textContent = formatTime(hours);
  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
  millisecondsEl.textContent = formatTime(milliseconds);
}

// Start the stopwatch
function startStopwatch() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

// Pause the stopwatch
function pauseStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  updateDisplay();
  laps = [];
  lapsEl.innerHTML = "";
}

// Record a lap
function recordLap() {
  if (timerInterval) {
    laps.push(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.className = "list-group-item";
    const time = elapsedTime;
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
    lapsEl.appendChild(lapItem);
  }
}

// Event listeners
document.getElementById("start-btn").addEventListener("click", startStopwatch);
document.getElementById("pause-btn").addEventListener("click", pauseStopwatch);
document.getElementById("reset-btn").addEventListener("click", resetStopwatch);
document.getElementById("lap-btn").addEventListener("click", recordLap);

// Initialize display
updateDisplay();
