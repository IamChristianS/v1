const trackingID = 'G-M9KJ1XPKLF';

let startTime;

// Function to track the duration of a user's visit on a webpage
function trackPageDuration() {
  startTime = new Date();
}

// Function to send page duration data to Google Analytics
function sendPageDuration() {
  const endTime = new Date();
  const durationInSeconds = Math.round((endTime - startTime) / 1000);

  // Send page duration as a custom event to Google Analytics
  gtag('event', 'page_duration', {
    event_category: 'Page Duration',
    event_label: document.title,
    value: durationInSeconds
  });
}

// Load Google Analytics script
(function (i, s, o, g, r, a, m) {
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  };
  i[r].l = 1 * new Date();
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=' + trackingID, 'gtag');

// Set up Google Analytics tracking
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', trackingID);

// Event listeners to track page visibility
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    trackPageDuration();
  } else {
    sendPageDuration();
  }
});

window.addEventListener('beforeunload', sendPageDuration);
