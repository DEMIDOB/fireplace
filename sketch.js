const PARTICLES_AMOUNT = 256;
let step = 1;
let NOISE_STEP = 20;

let particles = [];
let currentX = 0;
let batch = 0;

let nextParticle = null;

function setup() {
    background(0);
    // createCanvas(windowWidth, windowHeight);
    createCanvas(400, 400);
    // frameRate(1);
    step = width / 25;
    // NOISE_STEP = width / 20;

    background(0);

    for (let i = 0; i < PARTICLES_AMOUNT; ++i) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 50);

    let noiseHeight = height / 2;
    nextParticle = getNextParticle();
    while (mouseIsPressed && nextParticle && mouseX > 0 && mouseX < width) {
        nextParticle.reinit(createVector(mouseX, mouseY));
        nextParticle = getNextParticle();
    }

    let lastStep;
    for (let s = step; s < width; s *= 1.1) {
        lastStep = s;
    }

    for (let p of particles) {
        p.update();
        p.draw(color(255, 200 * (height * 1.3 - p.pos.y) / height, 0, 255 * (p.pos.y - height / 4) / height));
    }

    for (let s = step; s < width; s *= 1.1) {
        noStroke();
        fill(175,  100 * width / step / s, 0);
        beginShape();
        vertex(0, height);

        let ps = float("-inf");
        let pps = float("-inf");

        for (let x = 10; x < width; x += s) {
            let y = height - noise(x / NOISE_STEP, batch) * width / step / s * (noiseHeight - 2/3 * noiseHeight * 2 * abs(x - width / 2) / width);

            if (s - lastStep / (1.1 ** 10) < 1) {

                if (ps > pps && ps > y) {
                    nextParticle = getNextParticle();
                    if (nextParticle) {
                        nextParticle.reinit(createVector(x, y));
                    }
                }

                pps = ps;
                ps = y;
            }

            vertex(x, y);
        }
        vertex(width, height);
        endShape();
        // break;
    }

    batch += 0.05;
}

function getNextParticle() {
    for (let p of particles) {
        if (!p.initialized) {
            return p;
        }
    }

    return null;
}