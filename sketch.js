const PARTICLES_AMOUNT = 100;
const STEP = 10;
const NOISE_STEP = 75;

let particles = [];
let currentX = 0;
let batch = 0;

let nextParticle = null;

function setup() {
    background(0);
    // createCanvas(windowWidth, windowHeight);
    createCanvas(400, 400);
    // frameRate(1);

    background(0);

    for (let i = 0; i < PARTICLES_AMOUNT; ++i) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 100);

    let noiseHeight = height / 2;

    for (let p of particles) {
        p.update();
        p.draw(color(255, 200 * (height * 1.3 - p.pos.y) / height, 0, 255 * p.pos.y / height));
    }
    nextParticle = getNextParticle();
    while (mouseIsPressed && nextParticle && mouseX > 0 && mouseX < width) {
        nextParticle.reinit(createVector(mouseX, mouseY));
        nextParticle = getNextParticle();
    }

    for (let x = 0; x < width; x += STEP) {

    }

    batch += 0.1;
}

function getNextParticle() {
    for (let p of particles) {
        if (!p.initialized) {
            return p;
        }
    }

    return null;
}