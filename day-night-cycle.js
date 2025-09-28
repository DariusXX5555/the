// --- Day/Night Cycle Script ---
const body = document.body;
const start = Date.now();
const cycleLength = 6 * 60 * 1000; // 6 minutes = full 24h cycle

// --- Sky Container ---
// --- Sky Container behind all content ---
const sky = document.createElement('div');
Object.assign(sky.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
  zIndex: -1, // <-- negative puts it behind content
});
body.appendChild(sky);

// --- Sun & Moon ---
const sun = document.createElement('div');
const moon = document.createElement('div');

Object.assign(sun.style, {
  position: 'absolute',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  background: 'yellow',
  boxShadow: '0 0 40px rgba(255,255,0,0.7)',
});

Object.assign(moon.style, {
  position: 'absolute',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: '#ddd',
  boxShadow: '0 0 20px rgba(255,255,255,0.6)',
});

sky.appendChild(sun);
sky.appendChild(moon);

// --- Clock Display ---
const clock = document.createElement('div');
clock.style.position = 'fixed';
clock.style.top = '14px';
clock.style.right = '14px';
clock.style.background = '#000a';
clock.style.color = '#0f0';
clock.style.fontFamily = 'monospace';
clock.style.fontSize = '1.1em';
clock.style.padding = '6px 12px';
clock.style.borderRadius = '6px';
clock.style.zIndex = '10000';
body.appendChild(clock);

// --- Update Function ---
function updateCycle() {
  const now = Date.now();
  const elapsed = (now - start) % cycleLength;
  const fraction = elapsed / cycleLength;

  // Background color: day (light) to night (dark)
  const dayColor = [135, 206, 235]; // sky blue
  const nightColor = [10, 10, 35]; // dark night
  const mix = (c1, c2, t) => c1.map((v, i) => v*(1-t)+c2[i]*t);
  let bgColor = mix(dayColor, nightColor, 0.5 - 0.5 * Math.cos(fraction * 2 * Math.PI));
  body.style.background = `rgb(${bgColor.map(v => Math.round(v)).join(',')})`;

  // Sun & Moon movement
  const sunY = 50 - Math.sin(fraction * 2 * Math.PI) * 40;
  const moonY = 50 - Math.sin(fraction * 2 * Math.PI + Math.PI) * 40;
  sun.style.top = `${sunY}%`;
  moon.style.top = `${moonY}%`;

  const sunX = 50 + Math.cos(fraction * 2 * Math.PI) * 40;
  const moonX = 50 + Math.cos(fraction * 2 * Math.PI + Math.PI) * 40;
  sun.style.left = `${sunX}%`;
  moon.style.left = `${moonX}%`;

  // Update clock
  let hours = Math.floor(fraction * 24);
  let minutes = Math.floor((fraction * 24 - hours) * 60);
  let seconds = Math.floor(((fraction * 24 - hours) * 60 - minutes) * 60);
  clock.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

  requestAnimationFrame(updateCycle);
}

// --- Start Cycle ---
updateCycle();
