/**task #7 */

"use strict";

//circle details, like size, spacing between them,num of rows and columns
let circles = [];
const circleSize = 40;
const spacing = 39;
const rows = 11;
const cols = 11;

function setup() {
    createCanvas(400, 400);
    //  circles with random colors
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            circles.push({
                x: j * spacing + spacing / 2,
                y: i * spacing + spacing / 2,
                color: color(random(255), random(255), random(255))
            });
        }
    }
}

function draw() {
    background(240);
    // Displaying all circles
    circles.forEach(circle => {
        fill(circle.color);
        noStroke();
        ellipse(circle.x, circle.y, circleSize);
    });
}

function keyPressed() {
    if (keyCode === 32) { // Spacebar keypressed
        // Change colors of all circles with spacebar key
        circles.forEach(circle => {
            circle.color = color(random(255), random(255), random(255));
        });
    }
}
