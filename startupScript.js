// Disables Context (Right-Click) Menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Update Favicon & Title (ty chatgpt lol)
window.onload = function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = localStorage.getItem("faviconUrl");
    document.getElementsByTagName('head')[0].appendChild(link);
    var storedTitle = localStorage.getItem("title");
    if (storedTitle) {
        document.title = storedTitle;
    }
}
