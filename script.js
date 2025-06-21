soundButtons.forEach(button => {
  button.addEventListener("click", function () {
    const newSound = this.getAttribute("data-sound");
    const newVideo = this.getAttribute("data-video");

    sound.src = newSound;
    video.src = newVideo;

    if (isPlaying) {
      sound.play();
      video.play();
    }
  });
});
