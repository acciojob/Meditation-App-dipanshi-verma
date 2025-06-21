//your JS code here. If required.
const app = document.getElementById('app');
const video = document.getElementById('bg-video');
const sound = document.getElementById('meditation-sound');
const playBtn = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = document.querySelectorAll('#time-select button');
const soundButtons = document.querySelectorAll('.sound-picker button');

let fakeDuration = 600; // default 10 min
let timer;

// Update time on screen
function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Play / Pause toggle
playBtn.addEventListener('click', () => {
  if (sound.paused) {
    sound.play();
    video.play();
    playBtn.textContent = 'Pause';

    timer = setInterval(() => {
      fakeDuration--;
      updateTimeDisplay(fakeDuration);

      if (fakeDuration <= 0) {
        clearInterval(timer);
        sound.pause();
        video.pause();
        sound.currentTime = 0;
        updateTimeDisplay(fakeDuration = 600);
        playBtn.textContent = 'Play';
      }
    }, 1000);
  } else {
    sound.pause();
    video.pause();
    clearInterval(timer);
    playBtn.textContent = 'Play';
  }
});

// Change duration
timeButtons.forEach(button => {
  button.addEventListener('click', function () {
    fakeDuration = this.getAttribute('data-time');
    updateTimeDisplay(fakeDuration);
  });
});

// Switch sound & video
soundButtons.forEach(button => {
  button.addEventListener('click', function () {
    sound.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    if (!sound.paused) {
      sound.play();
      video.play();
    }
  });
});

// Initial time display
updateTimeDisplay(fakeDuration);
