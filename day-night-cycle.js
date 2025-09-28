// --- Day/Night Cycle with Stylized Clock ---
(function() {
  const body = document.body;

  // Create sun/moon elements
  const sun = document.createElement('div');
  const moon = document.createElement('div');
  Object.assign(sun.style, {
    position: 'fixed',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'yellow',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 40px rgba(255,255,0,0.7)',
    zIndex: 1000
  });
  Object.assign(moon.style, {
    position: 'fixed',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#ddd',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0 0 20px rgba(255,255,255,0.6)',
    zIndex: 1000
  });
  body.appendChild(sun);
  body.appendChild(moon);

  // Create clock element
  const clock = document.createElement('div');
  clock.id = 'dncClock';
  Object.assign(clock.style, {
    position: 'fixed',
    top: '14px',
    right: '14px',
    background: '#0008',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '1em',
    fontWeight: 'bold',
    zIndex: 2000,
    boxShadow: '0 2px 10px #0004'
  });
  body.appendChild(clock);

  const cycleLength = 6 * 60 * 1000; // 6 minutes full day
  const start = Date.now();

  function updateCycle() {
    const now = Date.now();
    const elapsed = (now - start) % cycleLength;
    const fraction = elapsed / cycleLength; // 0–1 for the full day

    // Calculate hour/minute for clock (0-24h)
    const totalHours = fraction * 24;
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    clock.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`;

    // Background color based on time (simple gradient)
    // Night: dark blue, Day: light blue, Sunrise/Sunset: orange/purple
    let bgColor;
    if (fraction < 0.25) bgColor = `rgb(${30 + fraction*120}, ${30 + fraction*60}, ${80 + fraction*50})`; // morning
    else if (fraction < 0.5) bgColor = `rgb(${150 + (fraction-0.25)*120}, ${180 + (fraction-0.25)*50}, ${220})`; // noon
    else if (fraction < 0.75) bgColor = `rgb(${220 - (fraction-0.5)*120}, ${180 - (fraction-0.5)*60}, ${220 - (fraction-0.5)*100})`; // evening
    else bgColor = `rgb(${30 + (fraction-0.75)*120}, ${30 + (fraction-0.75)*60}, ${80 + (fraction-0.75)*50})`; // night
    body.style.background = bgColor;

    // Sun/moon vertical movement (0% top = horizon, 50% top = high in sky)
    const sunY = Math.sin(fraction * 2 * Math.PI) * 40 + 10; // top position in %
    const moonY = Math.sin(fraction * 2 * Math.PI + Math.PI) * 40 + 10;
    sun.style.top = `${sunY}%`;
    moon.style.top = `${moonY}%`;

    requestAnimationFrame(updateCycle);
  }
  updateCycle();
})();
