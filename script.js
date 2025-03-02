const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let fireworks = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.alpha = 1;
        this.exploded = false;
        this.particles = [];
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        if (!this.exploded) {
            this.y -= 5;
            if (this.size > 0) this.size -= 0.05;
            if (this.size <= 0) {
                this.exploded = true;
                this.createParticles();
            }
        } else {
            this.updateParticles();
        }
    }

    createParticles() {
        const particleCount = Math.random() * 100 + 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    updateParticles() {
        this.particles = this.particles.filter(p => p.alpha > 0);
        for (let particle of this.particles) particle.update();
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            for (let particle of this.particles) particle.draw();
        }
        ctx.globalAlpha = 1;
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.alpha = 1;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
    }
}

function createFirework() {
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(firework => firework.update());
    fireworks.forEach(firework => firework.draw());
    requestAnimationFrame(animate);
}

setInterval(createFirework, 400);
animate
();
