// Define the favicon URLs
const faviconUrls = {
  1: 'icons/canvas.ico',
  2: 'icons/google-classroom.ico',
  3: 'icons/google-drive.ico',
  4: 'icons/google-mail.ico',
  5: 'icons/google-slides.ico',
  6: 'icons/google-docs.ico',
  7: 'icons/google.ico',
  8: 'icons/turnitin.ico',
  9: 'icons/default.ico'
};

const buttons = document.querySelectorAll('button');

// Adds Click Listeners
buttons.forEach(button => {
  button.addEventListener('click', event => {
    // Get Btn ID
    const buttonId = event.target.id;

    // Get Favicon URL
    const faviconUrl = faviconUrls[buttonId];

    // Change Favicon
    changeFavicon(faviconUrl);
  });
});

// Update Favicon
function changeFavicon(url) {
  const favicon = document.querySelector('link[rel="icon"]');
  favicon.href = url;
}