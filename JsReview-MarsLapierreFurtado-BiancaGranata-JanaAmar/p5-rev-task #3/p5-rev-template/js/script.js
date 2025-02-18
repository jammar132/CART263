/**task #3 */

"use strict";

let firstRectx = 10;
let firstRecty = 10;
let secondRectx = 20;
let secondRecty = 20;
let thirdRecty = 40;

function setup() {
    console.log("go")
    createCanvas(600, 600);
}


function draw() {
    background(0);
    drawRect(firstRectx, firstRecty, 50, 50, 200, 100, 50);
    drawRect(secondRectx, secondRecty, 50, 50, 100, 200, 30);
    drawRect(50, thirdRecty, 50, 50, 50, 40, 150);

    thirdRecty++

    if (thirdRecty > height) {
        thirdRecty = 0
    }

}


function drawRect(x, y, w, h, r, g, b) {
    fill(r, g, b);
    rect(x, y, w, h);
}

function mousePressed() {
    firstRectx++;
    firstRecty++;
}

function keyPressed() {
    if (key === ' ' || keyCode === 32) {
        secondRectx++;
        secondRecty++;
    }
}