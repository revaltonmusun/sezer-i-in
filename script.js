<button id="playBtn">Şarkıyı Başlat 🎵</button>

<audio id="bgMusic">
    <source src="music.mp3" type="audio/mpeg">
</audio>

<script>
document.getElementById("playBtn").addEventListener("click", function() {
    const music = document.getElementById("bgMusic");
    music.volume = 0.7;
    music.play();
    this.innerText = "Şarkı Çalıyor 🎶";
});
</script>
