/* --- Day-Night Cycle --- */
(function() {
  // Configuration
  const cycleMinutes = 6; // full 24h cycle duration in real minutes
  const cycleDuration = cycleMinutes * 60 * 1000; // in ms
  const body = document.body;

  // Create sun and moon elements
  const sun = document.createElement('div');
  const moon = document.createElement('div');

  [sun, moon].forEach(el => {
    el.style.position = 'fixed';
    el.style.width = '80px';
    el.style.height = '80px';
    el.style.borderRadius = '50%';
    el.style.top = '50%';
    el.style.left = '50%';
    el.style.transform = 'translate(-50%, -50%)';
    el.style.zIndex = '5';
    el.style.pointerEvents = 'none';
  });

  sun.style.background = 'yellow';
  moon.style.background = 'white';
  body.appendChild(sun);
  body.appendChild(moon);

  // Background gradient keyframes (morning, day, evening, night)
  const bgColors = [
    { time: 0, color: '#FFA07A' },    // sunrise
    { time: 0.25, color: '#87CEFA' }, // day
    { time: 0.5, color: '#FF8C00' },  // sunset
    { time: 0.75, color: '#2c3e50' }, // night
    { time: 1, color: '#FFA07A' }     // back to sunrise
  ];

  function lerpColor(a, b, t) {
    // Convert hex to RGB
    const ah = parseInt(a.slice(1),16), bh = parseInt(b.slice(1),16);
    const ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
    const br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return `rgb(${rr},${rg},${rb})`;
  }

  function getBackgroundColor(progress) {
    for (let i = 0; i < bgColors.length - 1; i++) {
      const curr = bgColors[i], next = bgColors[i + 1];
      if (progress >= curr.time && progress <= next.time) {
        const localT = (progress - curr.time) / (next.time - curr.time);
        return lerpColor(curr.color, next.color, localT);
      }
    }
    return bgColors[0].color;
  }

  function updateSunMoon(progress) {
    const angle = progress * 360; // 0 → 360 degrees
    const radius = window.innerWidth / 2 - 50;
    const x = window.innerWidth/2 + radius * Math.cos((angle-90)*Math.PI/180);
    const y = window.innerHeight/2 + radius * Math.sin((angle-90)*Math.PI/180);
    sun.style.left = `${x}px`;
    sun.style.top = `${y}px`;
    moon.style.left = `${window.innerWidth - x}px`;
    moon.style.top = `${window.innerHeight - y}px`;
    sun.style.opacity = Math.max(0, Math.sin(angle * Math.PI/180));
    moon.style.opacity = Math.max(0, Math.sin((angle+180) * Math.PI/180));
  }

  const startTime = Date.now();
  function animateCycle() {
    const elapsed = (Date.now() - startTime) % cycleDuration;
    const progress = elapsed / cycleDuration; // 0 → 1
    body.style.background = getBackgroundColor(progress);
    updateSunMoon(progress);
    requestAnimationFrame(animateCycle);
  }

  animateCycle();

  // Optional: adjust on resize
  window.addEventListener('resize', () => {
    updateSunMoon((Date.now() - startTime) / cycleDuration);
  });
})();
