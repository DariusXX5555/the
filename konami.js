// konami.js

// 1) The magic sequence
const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let pos = 0;

// 2) On page load, set default favicon to apple.png
window.addEventListener('DOMContentLoaded', () => {
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = 'apple.png';
});

// 3) Listen for key presses
document.addEventListener('keydown', e => {
  if (e.keyCode === KONAMI[pos]) {
    pos++;
    if (pos === KONAMI.length) {
      triggerEasterEgg();
      pos = 0;
    }
  } else {
    pos = 0;
  }
});

// 4) What happens on Konami success
function triggerEasterEgg() {
  const imgName = 'он есть он.jpg';

  // Change page title & favicon
  document.title = imgName;
  let link = document.querySelector('link[rel="icon"]') || (() => {
    const l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); return l;
  })();
  link.href = imgName;

  // Clear body and set background
  document.body.innerHTML = '';
  document.body.style.cssText = `
    margin:0;
    padding:0;
    background: url('${imgName}') no-repeat center center fixed;
    background-size: cover;
    height: 100vh;
    overflow: hidden;
  `;

  // Center the image
  const img = document.createElement('img');
  img.src = imgName;
  img.alt = imgName;
  Object.assign(img.style, {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  document.body.appendChild(img);

  // Play audio **via a temporary click overlay**
  const audio = new Audio('Mysterious Place.mp3');
  audio.loop = true;

  // Create an invisible "click-to-play" overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;cursor:pointer;z-index:10001;
  `;
  overlay.addEventListener('click', () => {
    audio.play();
    overlay.remove(); // remove overlay after first click
  });
  document.body.appendChild(overlay);

  // Optional: prompt user to click if autoplay blocked
  audio.play().catch(() => {
    console.warn('Autoplay prevented—click anywhere to start music!');
  });
}
