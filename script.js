// Bastelwelt - JavaScript
// TikTok Videos Management

document.addEventListener('DOMContentLoaded', function() {
    console.log('Bastelwelt geladen - bereit für DIY Projekte!');
    
    // TikTok Video URLs hier eintragen
    // Format: 'https://www.tiktok.com/@username/video/1234567890'
    const tiktokVideos = [
        // Beispiel URLs - ersetze diese mit deinen echten Video-Links:
        // 'https://www.tiktok.com/@npc0815/video/7123456789',
        // 'https://www.tiktok.com/@npc0815/video/7234567890',
        // 'https://www.tiktok.com/@npc0815/video/7345678901',
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
    
    // Videos laden
    videoUrls.forEach(url => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        
        // TikTok Embed erstellen
        const videoId = extractTikTokVideoId(url);
        if (videoId) {
            videoCard.innerHTML = `
                <blockquote class="tiktok-embed" cite="${url}" data-video-id="${videoId}">
                    <section></section>
                </blockquote>
            `;
        } else {
            videoCard.innerHTML = `<p class="placeholder-text">Ungültige Video-URL</p>`;
        }
        
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
