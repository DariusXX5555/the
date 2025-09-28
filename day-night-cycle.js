// Sun & Moon container behind content
const sky = document.createElement('div');
Object.assign(sky.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
  zIndex: 0,
});
body.appendChild(sky);

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

// Inside the animation loop:
function updateCycle() {
  const now = Date.now();
  const elapsed = (now - start) % cycleLength;
  const fraction = elapsed / cycleLength;

  // Flip sun/moon movement
  const sunY = 60 - Math.sin(fraction * 2 * Math.PI) * 40; // 0% top = horizon, 60% = below
  const moonY = 60 - Math.sin(fraction * 2 * Math.PI + Math.PI) * 40;
  sun.style.top = `${sunY}%`;
  moon.style.top = `${moonY}%`;
  // Horizontal movement if you want:
  sun.style.left = `${50 + Math.cos(fraction*2*Math.PI)*40}%`;
  moon.style.left = `${50 + Math.cos(fraction*2*Math.PI + Math.PI)*40}%`;

  requestAnimationFrame(updateCycle);
}
