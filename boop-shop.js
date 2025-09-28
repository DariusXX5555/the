// Out-of-context Boop Shop for Darius' website (no saving, session-only, more chaos!)

function playSound(url, volume=1) {
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play();
}

const shopItems = [
  {
    name: "Apple Rain Button",
    desc: "Adds a button to make apples rain whenever you want.",
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
        alert('Apple Rain button unlocked!');
      }
    }
  },
  {
    name: "Dancing Rat",
    desc: "A rat dances across your screen for 10 seconds.",
    cost: 35,
    id: "dancingRat",
    onBuy: function() {
      const img = document.createElement('img');
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
      setTimeout(() => img.remove(), 10000);
      alert('A dancing rat appears!');
    }
  },
  {
    name: "Confetti Explosion",
    desc: "Explode confetti in the center of the screen.",
    cost: 10,
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
  },
  {
    name: "Disco Mode",
    desc: "Party for 10 seconds. Colors everywhere.",
    cost: 40,
    id: "disco",
    onBuy: function() {
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
  },
  {
    name: "Rubber Duck Debugger",
    desc: "Summon a rubber duck to your screen. Quack.",
    cost: 14,
    id: "duck",
    onBuy: function() {
      const duck = document.createElement('img');
      duck.src = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Rubber_duck_assorted_colors.jpg";
      duck.alt = "Rubber Duck";
      duck.style.position = "fixed";
      duck.style.bottom = "10px";
      duck.style.right = "10px";
      duck.style.width = "60px";
      duck.title = "Quack.";
      document.body.appendChild(duck);
      playSound('https://www.soundjay.com/animal/duck-quack-01.mp3', 0.3);
      setTimeout(()=>duck.remove(), 15000);
    }
  },
  {
    name: "Beans Rain",
    desc: "Rains beans across your page once.",
    cost: 15,
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
    }
  },
  {
    name: "Tiny Text Mode",
    desc: "All text on the page shrinks for 7 seconds.",
    cost: 19,
    id: "tinyText",
    onBuy: function() {
      const oldSize = document.body.style.fontSize;
      document.body.style.fontSize = "7px";
      document.body.style.letterSpacing = "-1px";
      setTimeout(()=>{
        document.body.style.fontSize = oldSize;
        document.body.style.letterSpacing = "";
      }, 7000);
    }
  },
  {
    name: "Random Meme Popup",
    desc: "Spawns a meme image somewhere on the page.",
    cost: 18,
    id: "memePop",
    onBuy: function() {
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
    }
  },
  {
    name: "Banana Cursor",
    desc: "Your cursor is now a banana for 20 seconds.",
    cost: 16,
    id: "banana",
    onBuy: function() {
      const old = document.body.style.cursor;
      document.body.style.cursor = "url('https://raw.githubusercontent.com/curtiscross/banana-cursor/main/banana-cursor.png') 16 16, auto";
      setTimeout(()=>document.body.style.cursor=old, 20000);
    }
  },
  {
    name: "Cat Visitor",
    desc: "A cat GIF peeks in from the left for 6 seconds.",
    cost: 17,
    id: "cat",
    onBuy: function() {
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
      setTimeout(()=>cat.remove(), 6000);
    }
  },
  {
    name: "Screen Flip",
    desc: "Flips the whole website upside down for 5 seconds.",
    cost: 24,
    id: "flip",
    onBuy: function() {
      document.body.style.transform = "rotate(180deg)";
      setTimeout(()=>document.body.style.transform="", 5000);
    }
  },
  {
    name: "Random Lie Fact",
    desc: "Your next Fun Fact will definitely be a lie.",
    cost: 7,
    id: "lieFact",
    onBuy: function() {
      const lies = [
        "The moon is made of cheese pizza.",
        "Every time you blink, a potato is born.",
        "Penguins invented the internet in 1992.",
        "Your keyboard is 1% cake.",
        "Fish can fly when nobody looks at them."
      ];
      document.getElementById('randomFact').textContent =
        "Fun Fact: " + lies[Math.floor(Math.random()*lies.length)];
    }
  }
];

// Shop UI rendering and logic
function renderShop() {
  const ul = document.getElementById('shopItems');
  if (!ul) return;
  ul.innerHTML = '';
  shopItems.forEach(item => {
    let btn;
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.name}</strong> — <span>${item.cost} boops</span><br>
      <em style="font-size:0.96em">${item.desc}</em> `;
    btn = document.createElement('button');
    btn.textContent = "Buy";
    btn.disabled = window.boops < item.cost;
    btn.onclick = function() {
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
  });
}

// Render shop on page load
window.addEventListener('DOMContentLoaded', renderShop);
