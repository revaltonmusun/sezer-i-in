const playBtn = document.getElementById("playMusic");
const bgMusic = document.getElementById("bgMusic");

playBtn.addEventListener("click", () => {
    bgMusic.play();
    playBtn.innerText = "🎶 Müzik Çalıyor";
});
