const xVelRad = 1;
const minYVel = 0.01, maxYVel = 10;

class Particle {
    constructor(initialPos = null) {
        this.pos = createVector();
        this.vel = createVector();
        this.initialized = false;
        if (initialPos) {
            reinit(initialPos);
        }
    }

    reinit(initialPos) {
        this.pos = initialPos.copy();
        this.vel = createVector(random(-xVelRad, xVelRad), -random(minYVel, maxYVel));
        this.initialized = true;
    }

    update(acc = null) {
        if (!this.initialized) {
            return;
        }

        if (!acc) {
            acc = createVector(random(-xVelRad, xVelRad) * 0.5, 0);
            acc = createVector();
        }

        this.vel.add(acc);
        this.pos.add(this.vel);

        if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x > width || this.pos.y > height) {
            this.initialized = false;
        }
    }

    draw(c = color(0)) {
        if (!this.initialized) {
            return;
        }

        fill(c);
        noStroke();
        circle(this.pos.x, this.pos.y, width / 100);
    }
}