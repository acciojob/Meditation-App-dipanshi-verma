const video = document.getElementById("bg-video");
const audio = document.getElementById("meditation-audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600;
let currentTime = 0;
let isPlaying = false;
let timer = null;

function updateDisplay(timeLeft) {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function startTimer() {
  timer = setInterval(() => {
    currentTime++;
    const timeLeft = duration - currentTime;
    updateDisplay(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      audio.pause();
      video.pause();
      audio.currentTime = 0;
      video.currentTime = 0;
      currentTime = 0;
      playBtn.textContent = "►";
      isPlaying = false;
      updateDisplay(duration);
    }
  }, 1000);
}

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    video.play();
    isPlaying = true;
    playBtn.textContent = "❚❚";
    startTimer();
  } else {
    audio.pause();
    video.pause();
    clearInterval(timer);
    isPlaying = false;
    playBtn.textContent = "►";
  }
});

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    duration = parseInt(button.dataset.time);
    currentTime = 0;
    updateDisplay(duration);
  });
});

soundButtons.forEach((button) => {
  button.addEventListener("click", () => {
    audio.src = button.dataset.sound;
    video.src = button.dataset.video;
    if (isPlaying) {
      audio.play();
      video.play();
    }
  });
});

updateDisplay(duration);
