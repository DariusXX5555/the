/* --- Red Alert Rain Feature --- */
function triggerRainAlert() {
  // Show red alert banner
  let alertDiv = document.createElement('div');
  alertDiv.id = "redWeatherAlert";
  alertDiv.textContent = "⚠️ Rain is about to begin!";
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "40px";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translateX(-50%)";
  alertDiv.style.background = "#ff1a1a";
  alertDiv.style.color = "#fff";
  alertDiv.style.padding = "18px 36px";
  alertDiv.style.zIndex = "10000";
  alertDiv.style.fontWeight = "bold";
  alertDiv.style.border = "3px solid #fff";
  alertDiv.style.fontSize = "1.3em";
  alertDiv.style.borderRadius = "12px";
  alertDiv.style.boxShadow = "0 2px 20px #900a";
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.textContent = "🌧️ Rain is now falling!";
    startRainEffect();
    setTimeout(() => alertDiv.remove(), 4000);
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
