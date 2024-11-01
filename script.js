const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireflies = [];
let memoryIndex = 0;

function init() {
    for (let i = 0; i < 20; i++) {
        fireflies.push(createFirefly());
    }
    requestAnimationFrame(update);
}

function createFirefly() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 5 + Math.random() * 5,
        color: 'rgba(255, 255, 0, 0.8)',
        memory: `Memory ${++memoryIndex}: A warm summer night with friends.`
    };
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireflies.forEach(firefly => {
        drawFirefly(firefly);
    });
    requestAnimationFrame(update);
}

function drawFirefly(firefly) {
    ctx.beginPath();
    ctx.arc(firefly.x, firefly.y, firefly.radius, 0, Math.PI * 2);
    ctx.fillStyle = firefly.color;
    ctx.fill();
}

canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    fireflies.forEach(firefly => {
        const dx = firefly.x - x;
        const dy = firefly.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < firefly.radius) {
            alert(firefly.memory);
            firefly.x = Math.random() * canvas.width;
            firefly.y = Math.random() * canvas.height;
        }
    });
});

init();
