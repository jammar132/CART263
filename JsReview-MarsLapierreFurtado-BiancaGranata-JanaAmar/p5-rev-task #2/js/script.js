/**task #2 */

"use strict";

function setup() {
    console.log("go")
    createCanvas(500, 500);
}

function draw() {
    drawEllipse(10, 10, 10, 10, 45, 200, 20);
    drawEllipse(30, 30, 30, 30, 15, 100, 100);
    drawEllipse(100, 100, 100, 100, 145, 110,0);
}

function drawEllipse(x, y, w, h, r, g, b) {
    fill(r, g, b);
    ellipse(x, y, w, h);
}