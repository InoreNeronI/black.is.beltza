// @see https://codepen.io/tahadib/pen/vYOEdBp

//ELEMENT SELECTORS
const player = document.querySelector('.player');
const video = document.querySelector('#video');
const playBtn = document.querySelector('#control-play');
const stopBtn = document.querySelector('#control-stop');
const volumeBtn = document.querySelector('#control-volume');
const volumeSlider = document.querySelector('.volume-slider');
const volumeFill = document.querySelector('.volume-filled');
const progressSlider = document.querySelector('.progress');
const progressFill = document.querySelector('.progress-filled');
const textCurrent = document.querySelector('.time-current');
//const textTotal = document.querySelector('.time-total');
const speedBtns = document.querySelectorAll('.speed-item');
const fullscreenBtn = document.querySelector('#control-fullscreen');

//GLOBAL VARS
let lastVolume = 1;

//PLAYER FUNCTIONS
function stopPlay(ev) {
  ev.preventDefault();
  video.pause();
  video.currentTime = 0;
}

function togglePlay(ev) {
  ev.preventDefault();
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function togglePlayBtn() {
  if (video.paused) {
    playBtn.textContent = 'play_arrow';
  } else {
    playBtn.textContent = 'pause';
  }
}

function syncVolume(volume) {
  if (volume > 0.5) {
    volumeBtn.textContent = 'volume_up';
  } else if (volume < 0.5 && volume > 0) {
    volumeBtn.textContent = 'volume_down';
  } else if (volume === 0) {
    volumeBtn.textContent = 'volume_mute';
  }
}

function toggleMute(ev) {
  ev.preventDefault();
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBtn.textContent = 'volume_mute';
    volumeFill.style.width = '0';
  } else {
    video.volume = lastVolume;
    syncVolume(video.volume);
    volumeFill.style.width = `${video.volume * 100}%`;
  }
}
function changeVolume({ offsetX }) {
  let volume = offsetX / volumeSlider.offsetWidth;
  volume < 0.1 ? (volume = 0) : volume;
  volumeFill.style.width = `${volume * 100}%`;
  video.volume = volume;
  syncVolume(volume);
  lastVolume = volume;
}
function neatTime(time) {
  // const hours = Math.floor((time % 86400) / 3600)
  const minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}
function updateProgress() {
  progressFill.style.width = `${(video.currentTime / video.duration) * 100}%`;
  textCurrent.innerHTML = `${neatTime(video.currentTime)} / ${neatTime(video.duration)}`;
  // textTotal.innerHTML = neatTime(video.duration);
}
function setProgress({ offsetX }) {
  const newTime = offsetX / progressSlider.offsetWidth;
  progressFill.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}
function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
let fullscreen = false;
function toggleFullscreen(ev) {
  ev.preventDefault();
  if (fullscreen) {
    exitFullscreen();
    fullscreenBtn.textContent = 'fullscreen';
  } else {
    launchIntoFullscreen(player);
    fullscreenBtn.textContent = 'fullscreen_exit';
  }
  fullscreen = !fullscreen;
}
function setSpeed() {
  video.playbackRate = this.dataset.speed;
  speedBtns.forEach(({ classList }) => classList.remove('active'));
  this.classList.add('active');
}
function handleKeypress({ key }) {
  switch (key) {
    case ' ':
      togglePlay(new Event('click'));
      break;
    case 'ArrowRight':
      video.currentTime += 5;
      break;
    case 'ArrowLeft':
      video.currentTime -= 5;
      break;
  }
}
//EVENT LISTENERS
playBtn.addEventListener('click', togglePlay);
stopBtn.addEventListener('click', stopPlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayBtn);
video.addEventListener('pause', togglePlayBtn);
video.addEventListener('ended', togglePlayBtn);
video.addEventListener('timeupdate', updateProgress);
volumeBtn.addEventListener('click', toggleMute);
volumeSlider.addEventListener('click', changeVolume);
progressSlider.addEventListener('click', setProgress);
fullscreenBtn.addEventListener('click', toggleFullscreen);
speedBtns.forEach((speedBtn) => {
  speedBtn.addEventListener('click', setSpeed);
});
window.addEventListener('keydown', handleKeypress);

// @see https://codepen.io/eastcoastdeveloper/pen/LmxqKa
const mp4 = document.getElementById('mp4');
const webm = document.getElementById('webm');
const selected = document.getElementById('selected');
let mp4Url = '';
let webmUrl = '';
function playVideo(ID) {
  switch (ID) {
    case 1:
      mp4Url = 'https://fredrickjaxx.is/_assets/video/blossoms.mp4';
      webmUrl = 'https://fredrickjaxx.is/_assets/video/blossoms.Webm';
      break;
    case 2:
      mp4Url = 'https://fredrickjaxx.is/_assets/video/splash.mp4';
      webmUrl = 'https://fredrickjaxx.is/_assets/video/splash.Webm';
      break;
    case 3:
      mp4Url = 'https://fredrickjaxx.is/_assets/video/transport.mp4';
      webmUrl = 'https://fredrickjaxx.is/_assets/video/transport.Webm';
      break;
    case 4:
      mp4Url = 'https://fredrickjaxx.is/_assets/video/walking.mp4';
      webmUrl = 'https://fredrickjaxx.is/_assets/video/walking.Webm';
      break;
  }
  mp4.setAttribute('src', mp4Url);
  webm.setAttribute('src', webmUrl);
  selected.setAttribute('value', ID);
  video.load();
  video.play();
}

// Previous & Next
document.getElementById('control-previous').addEventListener('click', (ev) => {
  ev.preventDefault();
  const id = parseInt(selected.getAttribute('value'));
  playVideo(id === 1 ? 4 : id - 1);
});
document.getElementById('control-next').addEventListener('click', (ev) => {
  ev.preventDefault();
  const id = parseInt(selected.getAttribute('value'));
  playVideo(id === 4 ? 1 : id + 1);
});
