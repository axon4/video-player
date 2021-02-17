const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playPauseButton = document.getElementById('play-pause-button');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('select');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const pictureInPictureButton = document.querySelector('#picture-in-picture');
const fullScreenButton = document.querySelector('#fullscreen');

function showPlayIcon() {
	playPauseButton.classList.replace('fa-pause', 'fa-play');
	playPauseButton.setAttribute('title', 'play');
};

function togglePlay() {
	if (video.paused) {
		video.play();
		playPauseButton.classList.replace('fa-play', 'fa-pause');
		playPauseButton.setAttribute('title', 'pause');
	} else {
		video.pause();
		showPlayIcon();
	};
};

function disPlayTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);

	seconds = seconds > 9 ? seconds : `0${seconds}`;

	return `${minutes}:${seconds}`;
};

function upDateProgress() {
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;

	// displayTime(64);

	currentTime.textContent = disPlayTime(video.currentTime);
	duration.textContent = disPlayTime(video.duration);
};

function setProgress(event) {
	const newTime = event.offsetX / progressRange.offsetWidth;

	progressBar.style.width = `${newTime * 100}%`;
	video.currentTime = newTime * video.duration;
};

let lastVolume = 1;

function changeVolume(event) {
	let volume = event.offsetX / volumeRange.offsetWidth;

	if (volume < 0.1) {
		volume = 0;
	} else if (volume > 0.9) {
		volume = 1;
	};

	volumeBar.style.width = `${volume * 100}%`;
	video.volume = volume;
	lastVolume = volume;

	volumeIcon.className = '';

	if (volume > 0.7) {
		volumeIcon.classList.add('fas', 'fa-volume-up');
	} else if (volume < 0.7 && volume > 0) {
		volumeIcon.classList.add('fas', 'fa-volume-down');
	} else {
		volumeIcon.classList.add('fas', 'fa-volume-off');
	};
};

function toggleMute() {
	volumeIcon.className = '';

	if (video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBar.style.width = 0;

		volumeIcon.classList.add('fas', 'fa-volume-mute');
		volumeIcon.setAttribute('title', 'unMute');
	} else {
		video.volume = lastVolume;
		volumeBar.style.width = `${lastVolume * 100}%`;

		if (lastVolume > 0.7) {
			volumeIcon.classList.add('fas', 'fa-volume-up');
		} else if (lastVolume < 0.7 && lastVolume > 0) {
			volumeIcon.classList.add('fas', 'fa-volume-down');
		} else {
			volumeIcon.classList.add('fas', 'fa-volume-off');
		};

		volumeIcon.setAttribute('title', 'mute');
	};
};

function changeSpeed() {
	video.playbackRate = speed.value;
};

function openFullScreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) { // FireFox
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) { // Chrome/Safari/Opera
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) { // Internet Explorer / Edge
		element.msRequestFullscreen();
	};

	video.classList.add('video-fullscreen');
};

function closeFullScreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { // Firefox
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { // Chrome/Safari/Opera
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { // Internet Explorer / Edge
		document.msExitFullscreen();
	};

	video.classList.remove('video-fullscreen');
};

let fullScreen = false;

function toggleFullScreen() {
	!fullScreen ? openFullScreen(player) : closeFullScreen();

	fullScreen = !fullScreen;
};

playPauseButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('canplay', upDateProgress);
video.addEventListener('timeupdate', upDateProgress);
video.addEventListener('ended', showPlayIcon);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
pictureInPictureButton.addEventListener('click', async () => {await video.requestPictureInPicture()});
fullScreenButton.addEventListener('click', toggleFullScreen);