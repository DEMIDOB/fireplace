let m;
let t = 0;

function setup() {
    // put setup code here
    createCanvas(300, 400);
    m = createImage(200, 400);
}

function draw() {
    background(0);
    m.loadPixels();
    for (let y = m.height - 1; y >= 0; --y) {
        //let xRadius = round(max(0, m.width / 2 * (y - m.height / 2)));
        //console.log(xRadius);
        xRadius = m.width / 2;
        for (let x = 0; x < m.width; ++x) {
            let loc = x + y * m.width;
            let fx = 0.003 * map(y, m.height, 0, 1, 10);
            // fx = 0.003;
            let fy = 0.01;
            let fz = 0.05;
            let a = 256;
            const factorHeight = m.height / 4;
            let noiseFactor = ((m.height - factorHeight) + factorHeight - y) / factorHeight;
            let nv = 1 - noiseFactor * noise((x) * fx, (y + t * 5) * fy, t * fz);

            let red = 0;
            let green = 0;
            let blue = 0;

            if (nv > 0.6 && nv < 0.75 && false) {
                fc = color(200, 0, 0); //, 512 * (y - m.height / 2) / m.height);
            } else {
                // fc = color((1 - nv) / noiseFactor * 200, (1 - nv) / noiseFactor * 200, 0); // , 512 * (y - m.height / 2) / m.height);
                red = nv * 255;
                green = max(0, map(nv, 0.3, 0.8, 0, 0.4)) * 255;
            }
            m.set(x, y, color(red, green, blue));
            // m.set(x, map(y, 0, m.height, m.height * (map(abs(x - m.width / 2), 0, m.width / 2, 0, 1) ** 3), m.height), color(red, green, blue));
        }
    }
    m.updatePixels();
    imageMode(CENTER);
    image(m, width / 2, height / 2);
    noFill();
    stroke(50, 0, 0);
    strokeWeight(10);
    rect((width - m.width) / 2, (height - m.height) / 2, m.width, m.height);

    t += 0.5;
}
