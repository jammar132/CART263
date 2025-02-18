/**task #4 */

"use strict";

let color1 = { r: 0, g: 0, b: 255 };
let color2 = { r: 0, g: 100, b: 255 };
let color3 = { r: 0, g: 150, b: 255 };

function setup() {
    console.log("go")
    createCanvas(500, 500);
}

function draw() {

    let rect1Color = (mouseX > 0 && mouseX < width / 3 && mouseY > 0 && mouseY < height) ? { r: 255, g: 255, b: 255 } : color1;
    let rect2Color = (mouseX > width / 3 && mouseX < 2 * width / 3 && mouseY > 0 && mouseY < height) ? { r: 255, g: 255, b: 255 } : color2;
    let rect3Color = (mouseX > 2 * width / 3 && mouseX < width && mouseY > 0 && mouseY < height) ? { r: 255, g: 255, b: 255 } : color3;

    drawRectangle(0, 0, width / 3, height, rect1Color.r, rect1Color.g, rect1Color.b);
    drawRectangle(width / 3, 0, width / 3, height, rect2Color.r, rect2Color.g, rect2Color.b);
    drawRectangle(2 * width / 3, 0, width / 3, height, rect3Color.r, rect3Color.g, rect3Color.b);
}

function drawRectangle(x, y, w, h, r, g, b) {
    fill(r, g, b);
    rect(x, y, w, h);
}