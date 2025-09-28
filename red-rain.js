function triggerRainAlert() {
  const wa = document.createElement('div');
  wa.id = "weatherAlert"; // reuse the existing ID for styling
  wa.textContent = "⚠️ Rain is about to begin!";
  wa.style.background = "#ff4d4d"; // slightly red but still matches alert style
  wa.style.color = "#fff";
  wa.style.border = "2px solid #ff9999";
  wa.style.fontSize = "1.1em"; // same as fake alerts
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
    setTimeout(() => wa.remove(), 4000);
  }, 3000);
}

function startRainEffect() {
  // Play rain sound (loop)
  let rainAudio = document.createElement('audio');
  rainAudio.src = "rain.mp3";
  rainAudio.loop = true;
  rainAudio.volume = 0.3;
  rainAudio.autoplay = true;
  rainAudio.id = "rainAudio";
  document.body.appendChild(rainAudio);
  rainAudio.play();

  // Create rain container
  let rainDiv = document.createElement('div');
  rainDiv.id = "rainEffect";
  rainDiv.style.pointerEvents = 'none';
  rainDiv.style.position = 'fixed';
  rainDiv.style.top = '0';
  rainDiv.style.left = '0';
  rainDiv.style.width = '100vw';
  rainDiv.style.height = '100vh';
  rainDiv.style.zIndex = '9999';
  document.body.appendChild(rainDiv);

  // Make droplets
  let interval = setInterval(() => {
    let drop = document.createElement('div');
    drop.className = "rainDrop";
    let dropSize = Math.random() * 4 + 5;
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
    document.getElementById("rainEffect").appendChild(drop);
    setTimeout(() => {
      drop.style.top = "100vh";
      drop.style.opacity = "0.2";
    }, 30);
    setTimeout(() => drop.remove(), 2200);
  }, 80);

  // End rain after 12 seconds
  setTimeout(() => {
    clearInterval(interval);
    document.getElementById("rainEffect")?.remove();
    document.getElementById("rainAudio")?.pause();
    document.getElementById("rainAudio")?.remove();
  }, 12000);
}
