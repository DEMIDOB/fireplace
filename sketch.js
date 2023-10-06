const PARTICLES_AMOUNT = 1024;
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
        p.draw(color(255, 255 * random(), 0, 255 * (p.pos.y - height + noiseHeight * 2) / height));
    }
    nextParticle = getNextParticle();
    while (nextParticle && currentX < width) {
        let cleanNoise = noise(currentX / NOISE_STEP, batch)
        let currentNoise = cleanNoise * noiseHeight;

        if (noise((currentX - 1) / NOISE_STEP, batch) < cleanNoise
            && noise((currentX + 1) / NOISE_STEP, batch) < cleanNoise) {
                let newY = height - currentNoise;
                nextParticle.reinit(createVector(currentX, newY));
        }

        currentX = ++currentX % width;
        nextParticle = getNextParticle();
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