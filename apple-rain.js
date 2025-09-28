// Apple rain effect script using apple.png and continuous rain

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

function startAppleRain() {
    const duration = 10000; // 10 seconds
    const interval = 120;   // ms between apples
    let raining = true;

    function createApple() {
        if (!raining) return;
        const apple = document.createElement('img');
        apple.className = 'falling-apple';
        apple.src = 'apple.png'; // Ensure apple.png is at root or change path accordingly
        apple.alt = 'apple';
        apple.style.position = 'fixed';
        apple.style.left = Math.random() * 100 + 'vw';
        apple.style.top = '-60px';
        apple.style.width = apple.style.height = (Math.random() * 24 + 24) + 'px';
        apple.style.pointerEvents = 'none';
        apple.style.transition = `top 5s linear, opacity 1.5s`;
        document.body.appendChild(apple);

        setTimeout(() => {
            apple.style.top = '100vh';
            apple.style.opacity = 0;
        }, 50);

        setTimeout(() => {
            apple.remove();
        }, 5200);
    }

    // Rain apples every interval ms for duration ms
    const rainInterval = setInterval(createApple, interval);

    setTimeout(() => {
        raining = false;
        clearInterval(rainInterval);
        // Clean up any remaining apples after a short delay
        setTimeout(() => {
            document.querySelectorAll('.falling-apple').forEach(a => a.remove());
        }, 2500);
    }, duration);
}

// Optional: Add some basic CSS for the apples (if not already present)
const style = document.createElement('style');
style.textContent = `
.falling-apple {
    z-index: 9999;
    opacity: 1;
    user-select: none;
    will-change: top, opacity;
    pointer-events: none;
}
`;
document.head.appendChild(style);
