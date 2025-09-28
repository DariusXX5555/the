// Boop Shop for Darius' website

const shopItems = [
  {
    name: "Apple Rain Button",
    cost: 50,
    id: "appleRain",
    onBuy: function() {
      if (!document.getElementById('appleRainBtn')) {
        const btn = document.createElement('button');
        btn.id = 'appleRainBtn';
        btn.textContent = '🍏 Make It Rain Apples!';
        btn.style.marginLeft = '20px';
        btn.onclick = () => { if (typeof startAppleRain === 'function') startAppleRain(); };
        document.querySelector('.button-container').appendChild(btn);
        alert('You unlocked the Apple Rain button!');
      }
    }
  },
  {
    name: "Dancing Rat",
    cost: 120,
    id: "dancingRat",
    onBuy: function() {
      if (!document.getElementById('dancingRatImg')) {
        const img = document.createElement('img');
        img.id = 'dancingRatImg';
        img.src = "ratcatcher.jpg";
        img.style.position = 'fixed';
        img.style.bottom = '0';
        img.style.left = '0';
        img.style.width = '80px';
        img.style.zIndex = '9999';
        img.style.animation = 'danceRat 2s infinite alternate';
        document.body.appendChild(img);

        // Add CSS for dancing
        if (!document.getElementById('dancingRatCSS')) {
          const style = document.createElement('style');
          style.id = 'dancingRatCSS';
          style.textContent = `
            @keyframes danceRat {
              0% { transform: translateX(0) rotate(-10deg);}
              50% { transform: translateX(40vw) rotate(10deg);}
              100% { transform: translateX(80vw) rotate(-10deg);}
            }
          `;
          document.head.appendChild(style);
        }
        alert('A dancing rat appears!');
      }
    }
  },
  {
    name: "Confetti Explosion",
    cost: 80,
    id: "confetti",
    onBuy: function() {
      for (let i = 0; i < 40; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        Object.assign(c.style, {
          left: `${window.innerWidth/2}px`,
          top: `${window.innerHeight/2}px`,
          background: `hsl(${Math.random()*360},80%,60%)`,
          width:'8px', height:'8px', position:'fixed'
        });
        const dx=(Math.random()-0.5)*600, dy=(Math.random()-0.7)*400;
        c.animate([
          {transform:'translate(0,0) rotate(0deg)',opacity:1},
          {transform:`translate(${dx}px,${dy}px) rotate(360deg) scale(.6)`,opacity:0}
        ],{duration:1800,easing:'ease-out'});
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 1850);
      }
      alert('Confetti everywhere!');
    }
  }
];

// Renders the shop UI
function renderShop() {
  const ul = document.getElementById('shopItems');
  if (!ul) return;
  ul.innerHTML = '';
  shopItems.forEach(item => {
    let bought = localStorage.getItem('shop_' + item.id);
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.name}</strong> — <span>${item.cost} boops</span>
      <button ${window.boops < item.cost || bought ? 'disabled' : ''} id="buy_${item.id}">
        ${bought ? "Bought!" : "Buy"}
      </button>`;
    ul.appendChild(li);

    if (!bought) {
      document.getElementById('buy_' + item.id).onclick = function() {
        if (window.boops >= item.cost) {
          window.boops -= item.cost;
          localStorage.setItem(`dash_boops_${window.username}`, window.boops);
          localStorage.setItem('shop_' + item.id, "1");
          item.onBuy();
          renderShop();
          document.getElementById('boopsCount').textContent = `Boops: ${window.boops}`;
        }
      }
    } else {
      // If bought and unlock is a button/feature, ensure it's enabled
      setTimeout(item.onBuy, 0);
    }
  });
}

// Render shop after DOM & global boops/username are ready
window.addEventListener('DOMContentLoaded', renderShop);
