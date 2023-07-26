const faviconUrls = {
  1: 'https://i.ibb.co/kDxcVDx/canvas.png',
  2: 'https://i.ibb.co/YPyTYbJ/google-classroom.png',
  3: 'https://i.ibb.co/JcgBjC1/google-drive.png',
  4: 'https://i.ibb.co/5TfSsHK/google-mail.png',
  5: 'https://i.ibb.co/n62414w/google-slides.png',
  6: 'https://i.ibb.co/44MjCj9/google-docs.png',
  7: 'https://i.ibb.co/6XW9nQ6/google.png',
  8: 'https://i.ibb.co/CKrRjCG/turnitin.png',
  9: 'https://i.ibb.co/KW8NVz7/default.png'
};
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', event => {
    const buttonId = event.target.id;
    const faviconUrl = faviconUrls[buttonId];
    changeFavicon(faviconUrl);
  });
});

function changeFavicon(url) {
  const favicon = document.querySelector('link[rel="icon"]');
  favicon.href = url;
}
