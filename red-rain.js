// --- Random Rain Scheduler ---
function scheduleRandomRain() {
  // Random interval between 30s and 2 minutes
  const nextRain = Math.random() * (120000 - 30000) + 30000; 
  setTimeout(() => {
    triggerRainAlert();
    // Schedule the next rain after this one ends
    scheduleRandomRain();
  }, nextRain);
}

// --- Trigger Rain Alert & Start Effect ---
function triggerRainAlert() {
  const wa = document.createElement('div');
  wa.id = "weatherAlert";
  wa.textContent = "⚠️ Rain is about to begin!";
  wa.style.background = "#ff4d4d";
  wa.style.color = "#fff";
  wa.style.border = "2px solid #ff9999";
  wa.style.fontSize = "1.1em";
  wa.style.fontWeight = "bold";
  wa.style.padding = "12px 30px";
  wa.style.borderRadius = "8px";
  wa.style.boxShadow = "0 4px 18px #0002";
  wa.style.position = "fixed";
  wa.style.left = "50%";
  wa.style.top = "40px";
  wa.style.transform = "translateX(-50%)";
  wa.style.zIndex = "9998";
  wa.style.display = "block";
  wa.style.animation = "popIn .4s cubic-bezier(.17,1.41,.76,1.03)";
  document.body.appendChild(wa);

  setTimeout(() => {
    wa.textContent = "🌧️ Rain is now falling!";
    startRainEffect();
    // Remove alert after 5 seconds
    setTimeout(() => wa.remove(), 5000);
  }, 3000);
}

function startRainEffect() {
  // Play rain audio
  const rainAudio = document.createElement('audio');
  rainAudio.src = "rain.mp3";
  rainAudio.loop = true;
  rainAudio.volume = 0.3;
  rainAudio.autoplay = true;
  rainAudio.id = "rainAudio";
  document.body.appendChild(rainAudio);
  rainAudio.play();

  // Rain container
  const rainDiv = document.createElement('div');
  rainDiv.id = "rainEffect";
  rainDiv.style.pointerEvents = 'none';
  rainDiv.style.position = 'fixed';
  rainDiv.style.top = '0';
  rainDiv.style.left = '0';
  rainDiv.style.width = '100vw';
  rainDiv.style.height = '100vh';
  rainDiv.style.zIndex = '9999';
  document.body.appendChild(rainDiv);

  // Droplets
  const interval = setInterval(() => {
    const drop = document.createElement('div');
    drop.className = "rainDrop";
    const dropSize = Math.random() * 4 + 5;
    drop.style.position = "fixed";
    drop.style.left = (Math.random() * 100) + "vw";
    drop.style.top = "-20px";
    drop.style.width = dropSize + "px";
    drop.style.height = (dropSize * 2 + 8) + "px";
    drop.style.background = "linear-gradient(to bottom, #aee7fa 40%, #2980e3 90%)";
    drop.style.borderRadius = "30px";
    drop.style.opacity = "0.65";
    drop.style.boxShadow = "0 0 6px #0044cc44";
    drop.style.zIndex = "10000";
    drop.style.transition = "top 1.7s linear, opacity 0.5s";
    rainDiv.appendChild(drop);
    setTimeout(() => {
      drop.style.top = "100vh";
      drop.style.opacity = "0.2";
    }, 30);
    setTimeout(() => drop.remove(), 2200);
  }, 80);

  // Rain duration: 15–25 seconds
  const rainDuration = Math.random() * (25000 - 15000) + 15000;
  setTimeout(() => {
    clearInterval(interval);
    rainDiv.remove();
    rainAudio.pause();
    rainAudio.remove();
  }, rainDuration);
}

// Start the random scheduler
scheduleRandomRain();
