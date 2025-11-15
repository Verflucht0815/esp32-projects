// Bastelwelt - JavaScript
// TikTok Videos Management

document.addEventListener('DOMContentLoaded', function() {
    console.log('Bastelwelt geladen - bereit für DIY Projekte!');
    
    // TikTok Video URLs hier eintragen
    // Du kannst BEIDE Formate verwenden:
    // - Kurz-Links: 'https://vm.tiktok.com/ZNdEqKxxB/'
    // - Lange Links: 'https://www.tiktok.com/@username/video/1234567890'
    const tiktokVideos = [
        'https://vm.tiktok.com/ZNdEqKxxB/',
        // Weitere Videos hier hinzufügen:
        // 'https://vm.tiktok.com/ZNdEqKyyy/',
        // 'https://vm.tiktok.com/ZNdEqKzzz/',
    ];
    
    loadTikTokVideos(tiktokVideos);
});

function loadTikTokVideos(videoUrls) {
    const container = document.getElementById('tiktokContainer');
    
    // Wenn keine Videos vorhanden sind
    if (videoUrls.length === 0) {
        container.innerHTML = `
            <div class="video-card">
                <p class="placeholder-text">
                    Noch keine Videos verfügbar.<br>
                    Füge deine TikTok Video-URLs in der script.js Datei hinzu!
                </p>
            </div>
        `;
        return;
    }
    
    // Container leeren
    container.innerHTML = '';
    
    // Videos laden (auch vm.tiktok.com Links)
    videoUrls.forEach(url => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        
        // TikTok oEmbed API verwenden für bessere Kompatibilität
        videoCard.innerHTML = `
            <blockquote class="tiktok-embed" cite="${url}" data-video-id="">
                <section>
                    <a target="_blank" href="${url}">Video ansehen auf TikTok</a>
                </section>
            </blockquote>
        `;
        
        container.appendChild(videoCard);
    });
    
    // TikTok Embed Script laden
    loadTikTokEmbedScript();
}

function extractTikTokVideoId(url) {
    // Extrahiert die Video-ID aus der TikTok URL
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : null;
}

function loadTikTokEmbedScript() {
    // Prüfen ob Script bereits geladen wurde
    if (document.getElementById('tiktok-embed-script')) {
        // Script neu ausführen falls bereits geladen
        if (window.tiktokEmbed) {
            window.tiktokEmbed.lib.render(document.querySelectorAll('.tiktok-embed'));
        }
        return;
    }
    
    const script = document.createElement('script');
    script.id = 'tiktok-embed-script';
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
}

// Funktion zum einfachen Hinzufügen neuer Videos
function addTikTokVideo(videoUrl) {
    console.log('Neues Video hinzugefügt:', videoUrl);
    // Diese Funktion kann später erweitert werden
}
