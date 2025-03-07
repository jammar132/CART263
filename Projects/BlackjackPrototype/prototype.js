// Initialize variables
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

function setup() {
    createCanvas(640, 480);
    createDeck();
    shuffleDeck();

    // Deal initial cards
    for (let i = 0; i < 2; i++) {
        playerHand.push(deck.pop());
        dealerHand.push(deck.pop());
    }

    // Buttons
    let hitButton = createButton("Hit");
    hitButton.position(275, height - 60);
    hitButton.mousePressed(playerHit);

    let standButton = createButton("Stand");
    standButton.position(320, height - 60);
    standButton.mousePressed(playerStand);
}

function draw() {
    background(34, 139, 34);
  
  // Calculate the total width of the cards to be displayed
    let padding = 20; // Space between cards

    let totalCardWidth = playerHand.length * 60 +(playerHand.length - 1) * padding; // Total width of player cards
    let totalDealerWidth = dealerHand.length * 60 + (dealerHand.length - 1) * padding; // Total width of dealer cards

  // Center the player cards
    let playerStartX = (width - totalCardWidth) / 2;

  // Center the dealer cards
    let dealerStartX = (width - totalDealerWidth) / 2;

    // Display dealer's cards
    textSize(20);
    fill(255);
    text("Dealer's Hand:", dealerStartX - 50, 70);
    for (let i = 0; i < dealerHand.length; i++) {
        let cardX = dealerStartX + i * (60 + padding); // Spread the cards
        if (i === 0 && !gameOver) {
            drawCard("Hidden", cardX, 100); // Hide the dealer's first card
        } else {
            drawCard(dealerHand[i], cardX, 100);
        }
    }

    // Display player's cards
    textSize(20);
    fill(255);
    text("Your Hand:", playerStartX - 50, 270);
    for (let i = 0; i < playerHand.length; i++) {
        let cardX = playerStartX + i * (60 + padding); // Spread the cards
        drawCard(playerHand[i], cardX, 300);
    }

    // Scores
    text(`Dealer's Score: ${dealerScore}`, width / 2, 200);
    text(`Your Score: ${playerScore}`, width / 2, 400);
  
    // Endgame message
    if (gameOver) {
        let result = determineWinner();
      
        fill(34, 100, 34);
        stroke(0); // Black border
        strokeWeight(3); // Border thickness
      
        /*
        rect(100, 200, 450, 70);
        triangle(50, 220, 100, 205, 100, 232.5);
        triangle(50, 252.5, 100, 240, 100, 265);
        triangle(600, 220, 550, 205, 550, 232.5);
        triangle(600, 252.5, 550, 240, 550, 265);
      
        fill(255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text(result, width / 2, height / 2);
        */
      // Banner 
        rect(100, 25, 450, 70);
        triangle(50, 45, 100, 30, 100, 57.5);
        triangle(50, 77.5, 100, 65, 100, 90);
        triangle(600, 45, 550, 30, 550, 57.5);
        triangle(600, 77.5, 550, 65, 550, 90);
      
        fill(255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text(result, width / 2, 62.5);
    }
}

// Create deck of cards
function createDeck() {
    const suits = ["♥", "♦", "♣", "♠"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

// Shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Calculate the score of a hand
function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    for (let card of hand) {
        if (["J", "Q", "K"].includes(card.value)) {
            score += 10;
        } else if (card.value === "A") {
            aces++;
            score += 11;
        } else {
            score += parseInt(card.value);
        }
    }

    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }

    return score;
}

// Draw a card on the screen
function drawCard(card, x, y) {
    fill(255);
    rect(x, y, 60, 90); // Card shape
    fill(0);
    if (card === "Hidden") {
        // Draw the red back for a face-down card
        fill(200, 0, 0); // Red color
        stroke(255); // Black border
        strokeWeight(1); // Border thickness
        rect(x, y, 60, 90); // Card shape

        // Add decorative pattern 
        fill(255); // White for pattern
        for (let i = x + 5; i < x + 60; i += 10) { // Columns
            for (let j = y + 5; j < y + 90; j += 10) { // Rows
                ellipse(i, j, 4); // Small circle
            }
        }
    } else {
        // Draw the face-up card
        fill(255);
        stroke(0);
        strokeWeight(1);
        rect(x, y, 60, 90); // Card shape

        // Set color based on suit
        if (card.suit === "♥" || card.suit === "♦") {
            fill(255, 0, 0); // Red for Hearts and Diamonds
        } else {
            fill(0); // Black for Clubs and Spades
        }
      
        // Draw the value and suit
        textSize(16);
        noStroke();
        textAlign(LEFT, TOP);
        text(`${card.value}${card.suit}`, x + 5, y + 5); // Visible card value
      
        // Reset fill color to default (black) for subsequent drawings
        fill(0);
    }
}

// Player hits
function playerHit() {
    if (!gameOver) {
        playerHand.push(deck.pop());
        playerScore = calculateScore(playerHand);
        if (playerScore > 21) {
            gameOver = true;
        }
    }
}

// Player stands
function playerStand() {
    if (!gameOver) {
        dealerPlay();
        gameOver = true;
    }
}

// Dealer plays
function dealerPlay() {
    dealerScore = calculateScore(dealerHand);
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerScore = calculateScore(dealerHand);
    }
}

// Determine the winner
function determineWinner() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);

    if (playerScore > 21) {
        return "You Busted! Dealer Wins!";
    } else if (dealerScore > 21) {
        return "Dealer Busted! You Win!";
    } else if (playerScore > dealerScore) {
        return "You Win!";
    } else if (playerScore < dealerScore) {
        return "Dealer Wins!";
    } else {
        return "It's a Tie!";
    }
}