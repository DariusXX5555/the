// konami.js

// 1) The magic sequence
const KONAMI = [38,38,40,40,37,39,37,39,66,65];
let pos = 0;

// 2) Set initial favicon to apple.png
window.addEventListener('DOMContentLoaded', () => {
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = 'apple.png';
});

// 3) Key listener
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

function triggerEasterEgg() {
  const imgName = 'он есть он.jpg';

  // a) Change page title
  document.title = imgName;

  // b) Change favicon
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = imgName;

  // c) Clear body
  document.body.innerHTML = '';

  // d) Fullscreen background
  document.body.style.cssText = `
    margin:0; padding:0;
    background: url('${imgName}') no-repeat center center fixed;
    background-size: cover;
    height:100vh;
    overflow:hidden;
  `;

  // e) Centered image
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

  // f) Play music on loop
  const audio = new Audio('Mysterious Place.mp3');
  audio.loop = true;
  audio.play();
}
