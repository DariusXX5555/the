// Apple rain effect script

// Listen for the key sequence "A P P L E"
const sequence = ['A', 'P', 'P', 'L', 'E'];
let userInput = [];

document.addEventListener('keydown', function(event) {
    userInput.push(event.key.toUpperCase());
    if (userInput.length > sequence.length) userInput.shift();

    if (userInput.join('') === sequence.join('')) {
        startAppleRain();
        userInput = [];
    }
});

// Function to start raining apples
function startAppleRain() {
    const appleEmoji = '🍎';
    const numApples = 30;
    for (let i = 0; i < numApples; i++) {
        createApple();
    }
    // Optionally, stop the rain after some time
    setTimeout(() => {
        document.querySelectorAll('.falling-apple').forEach(a => a.remove());
    }, 5000);
}

function createApple() {
    const apple = document.createElement('div');
    apple.className = 'falling-apple';
    apple.textContent = '🍎';
    apple.style.position = 'fixed';
    apple.style.left = Math.random() * 100 + 'vw';
    apple.style.top = '-2em';
    apple.style.fontSize = (Math.random() * 24 + 24) + 'px';
    apple.style.pointerEvents = 'none';
    apple.style.transition = `top 2s linear, opacity 0.5s`;
    document.body.appendChild(apple);

    setTimeout(() => {
        apple.style.top = '100vh';
        apple.style.opacity = 0;
    }, 50);

    setTimeout(() => {
        apple.remove();
    }, 2200);
}

// Optional: Add some basic CSS for the apples
const style = document.createElement('style');
style.textContent = `
.falling-apple {
    z-index: 9999;
    opacity: 1;
    user-select: none;
    will-change: top, opacity;
}
`;
document.head.appendChild(style);
