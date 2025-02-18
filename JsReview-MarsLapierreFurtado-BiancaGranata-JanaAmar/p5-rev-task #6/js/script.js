/**task #6 */

"use strict";

function setup() {
    console.log("go")
    createCanvas(500, 500);
    textSize(28);
    fill(255);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);

    text("test", width / 2, height / 2);

    for (let i = 0; i < 10; i++) {
        text(i, 50 + i * 20, 30);
    }

    for (let i = 15; i > 0; i--) {
        text(i, 20, (16 - i) * 30);
    }

}
