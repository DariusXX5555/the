// Supercharged Out-of-Context Boop Shop for Darius' Website

// Utility: Save and load shop unlocks
function setShopFlag(flag, value) {
  localStorage.setItem('shop_flag_' + flag, value ? "1" : "");
}
function getShopFlag(flag) {
  return localStorage.getItem('shop_flag_' + flag) === "1";
}

// Utility: Play sound
function playSound(url, volume=1) {
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play();
}

// The Out-of-Context Shop Items
const shopItems = [
  {
    name: "Apple Rain Button",
    desc: "Adds a button to rain apples whenever you want.",
    cost: 25,
    id: "appleRain",
    onBuy: function() {
      if (!document.getElementById('appleRainBtn')) {
        const btn = document.createElement('button');
        btn.id = 'appleRainBtn';
        btn.textContent = '🍏 Make It Rain Apples!';
        btn.style.marginLeft = '20px';
        btn.onclick = () => { if (typeof startAppleRain === 'function') startAppleRain(); };
        document.querySelector('.button-container').appendChild(btn);
        setShopFlag('appleRain', 1);
        alert('Apple Rain button unlocked!');
      }
    },
    check: () => getShopFlag('appleRain')
  },
  {
    name: "Dancing Rat",
    desc: "A rat dances across your screen. Why? Why not.",
    cost: 40,
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
        setShopFlag('dancingRat', 1);
        alert('A dancing rat appears!');
      }
    },
    check: () => getShopFlag('dancingRat')
  },
  {
    name: "Confetti Explosion",
    desc: "Explode confetti in the center of the screen.",
    cost: 15,
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
    },
    check: () => false // Not persistent
  },
  {
    name: "Invert Mode",
    desc: "Toggle: Flip all colors. It's like the Upside Down.",
    cost: 30,
    id: "invert",
    onBuy: function() {
      setShopFlag('invert', !getShopFlag('invert'));
      applyInvert();
    },
    check: () => getShopFlag('invert'),
    isToggle: true
  },
  {
    name: "Random Meme Pop-Up",
    desc: "Randomly show a meme image every minute. You can't stop it.",
    cost: 35,
    id: "memePop",
    onBuy: function() {
      setShopFlag('memePop', 1);
      startMemePop();
      alert('Memes will now visit you.');
    },
    check: () => getShopFlag('memePop')
  },
  {
    name: "Disco Mode",
    desc: "Toggle: Flashy background and disco music for 10s. Use wisely.",
    cost: 45,
    id: "disco",
    onBuy: function() {
      discoParty();
    },
    check: () => false // Not persistent
  },
  {
    name: "Tiny Text Mode",
    desc: "Toggle: All text shrinks to unreadable sizes until toggled off.",
    cost: 20,
    id: "tinyText",
    onBuy: function() {
      setShopFlag('tinyText', !getShopFlag('tinyText'));
      applyTinyText();
    },
    check: () => getShopFlag('tinyText'),
    isToggle: true
  },
  {
    name: "Rubber Duck Debugger",
    desc: "A rubber duck sits in the corner and judges you.",
    cost: 10,
    id: "duck",
    onBuy: function() {
      if (!document.getElementById('rubberDuck')) {
        const duck = document.createElement('img');
        duck.id = 'rubberDuck';
        duck.src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Rubber_duck_assorted_colors.jpg";
        duck.alt = "Rubber Duck";
        duck.style.position = "fixed";
        duck.style.bottom = "10px";
        duck.style.right = "10px";
        duck.style.width = "60px";
        duck.title = "Quack.";
        document.body.appendChild(duck);
        setShopFlag('duck', 1);
        playSound('https://www.soundjay.com/animal/duck-quack-01.mp3', 0.3);
      }
    },
    check: () => getShopFlag('duck')
  },
  {
    name: "Beans Rain",
    desc: "Rains beans across your page once.",
    cost: 22,
    id: "beans",
    onBuy: function() {
      for (let i=0; i<28; i++) {
        const bean = document.createElement('img');
        bean.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/Black_Bean.jpg";
        bean.style.position = "fixed";
        bean.style.left = Math.random()*100 + "vw";
        bean.style.top = "-60px";
        bean.style.width = bean.style.height = (Math.random()*16 + 28) + "px";
        bean.style.transition = "top 2.7s linear, opacity 1s";
        bean.style.pointerEvents = "none";
        bean.style.zIndex = "9999";
        document.body.appendChild(bean);
        setTimeout(()=> {
          bean.style.top = "100vh";
          bean.style.opacity = 0;
        }, 80);
        setTimeout(()=> bean.remove(), 2950);
      }
      playSound('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c1e.mp3', 0.4);
      alert("IT'S BEANIN' TIME");
    },
    check: () => false
  },
  {
    name: "Random Lies",
    desc: "Sometimes your Fun Fact is a blatant lie.",
    cost: 16,
    id: "lies",
    onBuy: function() {
      setShopFlag('lies', 1);
      alert("Trust nothing. Fun Facts may now be lies.");
    },
    check: () => getShopFlag('lies')
  },
  {
    name: "Dramatic Sound FX",
    desc: "Typing D R A M A plays a dramatic sound and flashes the screen.",
    cost: 19,
    id: "drama",
    onBuy: function() {
      setShopFlag('drama', 1);
      alert("D R A M A enabled.");
    },
    check: () => getShopFlag('drama')
  },
  {
    name: "Cat Visitor",
    desc: "A cat GIF peeks in from the corner at random times.",
    cost: 23,
    id: "cat",
    onBuy: function() {
      setShopFlag('cat', 1);
      startCatVisitor();
      alert("A cat will now occasionally visit.");
    },
    check: () => getShopFlag('cat')
  },
  {
    name: "Banana Cursor",
    desc: "Your cursor is now a banana. This is permanent.",
    cost: 33,
    id: "banana",
    onBuy: function() {
      setShopFlag('banana', 1);
      applyBananaCursor();
      alert("Banana cursor enabled. No refunds.");
    },
    check: () => getShopFlag('banana')
  }
];

// Shop UI rendering and logic
function renderShop() {
  const ul = document.getElementById('shopItems');
  if (!ul) return;
  ul.innerHTML = '';
  shopItems.forEach(item => {
    const bought = getShopFlag(item.id);
    const toggle = !!item.isToggle;
    let btn;
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.name}</strong> — <span>${item.cost} boops</span><br>
      <em style="font-size:0.96em">${item.desc}</em> `;
    btn = document.createElement('button');
    btn.textContent = bought && toggle ? (item.check() ? "ON" : "OFF") : (bought ? "Bought!" : "Buy");
    btn.disabled = window.boops < item.cost && !bought;
    btn.onclick = function() {
      // Toggle: allow repeated buy to toggle on/off
      if (toggle) {
        item.onBuy();
        renderShop();
        return;
      }
      if (bought) return;
      if (window.boops >= item.cost) {
        window.boops -= item.cost;
        localStorage.setItem(`dash_boops_${window.username}`, window.boops);
        document.getElementById('boopsCount').textContent = `Boops: ${window.boops}`;
        item.onBuy();
        renderShop();
      }
    };
    li.appendChild(btn);
    ul.appendChild(li);
    // Apply persistent effects if already bought
    if (bought && typeof item.onBuy === "function" && !toggle) setTimeout(item.onBuy, 0);
  });
}

// --- Out-of-context effect implementations ---

function applyInvert() {
  if (getShopFlag('invert')) {
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
  } else {
    document.body.style.filter = "";
  }
}
function applyTinyText() {
  if (getShopFlag('tinyText')) {
    document.body.style.fontSize = "7px";
    document.body.style.letterSpacing = "-1px";
  } else {
    document.body.style.fontSize = "";
    document.body.style.letterSpacing = "";
  }
}
function startMemePop() {
  if (window._memePopTimer) return;
  function popMeme() {
    if (!getShopFlag('memePop')) return;
    const memes = [
      "https://i.imgflip.com/30b1gx.jpg", // Drake
      "https://i.kym-cdn.com/photos/images/original/001/505/338/5e3.jpg", // Surprised Pikachu
      "https://i.kym-cdn.com/photos/images/newsfeed/001/018/150/2f6.jpg", // Expanding brain
      "https://i.kym-cdn.com/photos/images/newsfeed/002/250/753/6c7.jpg", // Woman yelling at cat
      "https://i.imgflip.com/1bij.jpg", // Distracted boyfriend
      "https://i.kym-cdn.com/entries/icons/original/000/041/365/silly_cat.jpg" // Silly cat
    ];
    const meme = document.createElement('img');
    meme.src = memes[Math.floor(Math.random()*memes.length)];
    meme.style.position = "fixed";
    meme.style.left = Math.random()*80 + "vw";
    meme.style.top = Math.random()*80 + "vh";
    meme.style.width = "200px";
    meme.style.zIndex = "9999";
    meme.style.border = "4px solid #fff";
    meme.style.boxShadow = "0 4px 12px #0007";
    meme.style.borderRadius = "12px";
    meme.style.transition = "opacity 1.1s";
    document.body.appendChild(meme);
    setTimeout(() => meme.style.opacity = 0, 3300);
    setTimeout(() => meme.remove(), 4400);
    window._memePopTimer = setTimeout(popMeme, 60000);
  }
  window._memePopTimer = setTimeout(popMeme, 60000);
}
function discoParty() {
  if (window._discoing) return;
  window._discoing = true;
  let discoColors = ["#f0f","#0ff","#ff0","#0f0","#f00","#00f","#fff"];
  let i = 0;
  const discoDiv = document.createElement('div');
  discoDiv.style.position = "fixed";
  discoDiv.style.top = "0";
  discoDiv.style.left = "0";
  discoDiv.style.width = "100vw";
  discoDiv.style.height = "100vh";
  discoDiv.style.zIndex = "99999";
  discoDiv.style.pointerEvents = "none";
  discoDiv.style.mixBlendMode = "multiply";
  document.body.appendChild(discoDiv);
  const discoInt = setInterval(()=>{
    discoDiv.style.background = discoColors[i%discoColors.length];
    i++;
  }, 120);
  playSound('https://cdn.pixabay.com/audio/2022/10/16/audio_12b0f1cfa2.mp3', 0.3);
  setTimeout(()=>{
    clearInterval(discoInt);
    discoDiv.remove();
    window._discoing = false;
  }, 10100);
}
function startCatVisitor() {
  if (window._catTimer) return;
  function showCat() {
    if (!getShopFlag('cat')) return;
    const cat = document.createElement('img');
    cat.src = "https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif";
    cat.style.position = "fixed";
    cat.style.left = "-180px";
    cat.style.bottom = "0";
    cat.style.width = "150px";
    cat.style.zIndex = "9999";
    cat.style.transition = "left 2s";
    document.body.appendChild(cat);
    setTimeout(()=>cat.style.left="10px", 90);
    setTimeout(()=>cat.style.left="-180px", 2900);
    setTimeout(()=>cat.remove(), 4800);
    window._catTimer = setTimeout(showCat, 40000 + Math.random()*30000);
  }
  window._catTimer = setTimeout(showCat, 15000 + Math.random()*10000);
}
function applyBananaCursor() {
  if (getShopFlag('banana')) {
    document.body.style.cursor = "url('https://raw.githubusercontent.com/curtiscross/banana-cursor/main/banana-cursor.png') 16 16, auto";
  }
}

// --- DRAMA KEY EFFECT ---
(function dramaEffect(){
  let seq = ['D','R','A','M','A'], pos=0;
  document.addEventListener('keydown', e=>{
    if (!getShopFlag('drama')) return;
    if (e.key.toUpperCase() === seq[pos]) {
      pos++; if (pos===seq.length) {
        // Play dramatic sound and flash screen
        playSound('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c1e.mp3', 0.6);
        const flash = document.createElement('div');
        flash.style.position = "fixed";
        flash.style.left = "0"; flash.style.top = "0";
        flash.style.width = "100vw"; flash.style.height = "100vh";
        flash.style.background = "#fff";
        flash.style.opacity = "0.92";
        flash.style.zIndex = "100000";
        document.body.appendChild(flash);
        setTimeout(()=>flash.remove(), 400);
        pos=0;
      }
    } else pos=0;
  });
})();

// --- FUN FACT LIES HACK ---
(function lieFactHack(){
  const realFacts = [
    "Honey never spoils.",
    "Avocados are berries.",
    "Bananas are herbs.",
    "Octopuses have three hearts.",
    "A group of flamingos is a 'flamboyance'."
  ];
  const lies = [
    "The moon is made of cheese pizza.",
    "Every time you blink, a potato is born.",
    "Penguins invented the internet in 1992.",
    "Your keyboard is 1% cake.",
    "Fish can fly when nobody looks at them."
  ];
  function patchFact() {
    if (!window.updateFact) return;
    window._origUpdateFact = window._origUpdateFact || window.updateFact;
    window.updateFact = function() {
      let useLie = getShopFlag('lies') && Math.random()<0.6;
      let text = useLie ? lies[Math.floor(Math.random()*lies.length)] :
        realFacts[Math.floor(Math.random()*realFacts.length)];
      document.getElementById('randomFact').textContent =
        "Fun Fact: " + text;
    };
  }
  setTimeout(patchFact, 400);
})();

// --- Apply persistent effects on load ---
window.addEventListener('DOMContentLoaded', function(){
  if (getShopFlag('invert')) applyInvert();
  if (getShopFlag('tinyText')) applyTinyText();
  if (getShopFlag('memePop')) startMemePop();
  if (getShopFlag('cat')) startCatVisitor();
  if (getShopFlag('banana')) applyBananaCursor();
  if (getShopFlag('duck')) shopItems.find(i=>i.id=="duck").onBuy();
  renderShop();
});
