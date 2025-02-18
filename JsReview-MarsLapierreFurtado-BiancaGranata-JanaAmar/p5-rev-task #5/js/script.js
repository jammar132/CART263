/**task #5 */

"use strict";

let counter = 0;

let square = {
    x: 10,
    y: 10,
    w: 30,
    h: 30,
    color: {
        r: 255,
        g: 138,
        b: 0,
    }
};

let redSquare = {
    x: 50,
    y: 10,
    w: 30,
    h: 30,
    color: {
        r: 255,
        g: 0,
        b: 0,
    }
};

//Circle Properties
let radius = 50;
let ellipseAlpha = 30;


function setup() {
    console.log("go")
    createCanvas(600, 600);

};

function draw() {
    background(0);

    push();
    if (checkCollisionWithSquare(square)) {
        fill(255, 180, 100);
    } else {
        fill(square.color.r, square.color.g, square.color.b);
    }
    displaySquare();
    pop();

    push();
    if (checkCollisionWithSquare(redSquare)) {
        fill(255, 100, 100);
    } else {
        fill(redSquare.color.r, redSquare.color.g, redSquare.color.b);
    }
    displayRedSquare();
    pop();

    if (counter >= 1 && counter <= 10) {
        let i = 0;
        let currentRadius = radius;
        let currentAlpha = ellipseAlpha;

        while (i < counter) {
            drawCircle(width / 2, height / 2, currentRadius, currentAlpha);
            currentRadius += 20;
            currentAlpha += 20;
            i++;
        }
    }

};



function displaySquare() {
    push();
    rect(square.x, square.y, square.w, square.h);
    pop();
};

function displayRedSquare() {
    push();
    rect(redSquare.x, redSquare.y, redSquare.w, redSquare.h);
    pop();
};

function checkCollisionWithSquare(squareObj) {
    return mouseX >= squareObj.x &&
        mouseX <= squareObj.x + squareObj.w &&
        mouseY >= squareObj.y &&
        mouseY <= squareObj.h;
}

function drawCircle(x, y, r, alpha) {
    push();
    fill(255, 255, 255, alpha);
    noStroke();
    ellipse(x, y, r * 2);
    pop();
}

function mousePressed() {
    if (checkCollisionWithSquare(square)) {
        counter++;
    } else if (checkCollisionWithSquare(redSquare)) {
        counter--;
    }
}