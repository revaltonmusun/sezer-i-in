const playBtn = document.getElementById("playMusic");
const bgMusic = document.getElementById("bgMusic");

// Müzik Çalma Fonksiyonu (Senin mevcut kodun)
if (playBtn) {
    playBtn.addEventListener("click", () => {
        bgMusic.play();
        playBtn.innerText = "🎶 Müzik Çalıyor";
    });
}

// --- KONUM BULMA SİSTEMİ BAŞLANGIÇ ---
function konumuGetir() {
    const konumMetni = document.getElementById("konum-bilgi");
    if (!konumMetni) return; // Eğer sayfada bu ID yoksa hata vermemesi için

    // 1. Aşama: IP üzerinden hızlı şehir tahmini (Kullanıcıya hemen bir şey göstermek için)
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            konumMetni.innerText = `${data.city}, ${data.country_name} civarından bağlanıyorsun...`;
            
            // 2. Aşama: Tarayıcıdan tam koordinat izni iste (Hassas konum için)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude.toFixed(4);
                        const lng = position.coords.longitude.toFixed(4);
                        konumMetni.innerText = `Tam konumun: ${data.city} (${lat}, ${lng}) 📍`;
                        console.log("Hassas Konum Alındı:", lat, lng);
                    },
                    (error) => {
                        console.log("Hassas konum reddedildi veya bulunamadı, IP ile devam ediliyor.");
                    }
                );
            }
        })
        .catch(err => {
            konumMetni.innerText = "Konum bilgisi şu an alınamıyor.";
            console.error("Konum hatası:", err);
        });
}

// Sayfa yüklendiğinde konumu getir
window.addEventListener('load', konumuGetir);
// --- KONUM BULMA SİSTEMİ BİTİŞ ---
