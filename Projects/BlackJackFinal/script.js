// Card deck and game mechanics
const SUITS = ['♠', '♣', '♥', '♦'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Sound Effect
const cardSound = new Audio('music/flipcard.mp3');
cardSound.volume = 0.5;

// Sample data for recommendations
const blackjackRecommendations = [
    {
        condition: { playerTotal: [2, 3, 4, 5, 6, 7, 8], dealerCard: "any" },
        action: "Hit",
    },
    {
        condition: { playerTotal: [9], dealerCard: [3, 4, 5, 6] },
        action: "Double Down",
    },
    {
        condition: { playerTotal: [9], dealerCard: [2, 7, 8, 9, 10, "A"] },
        action: "Hit",
    },
    {
        condition: { playerTotal: [10], dealerCard: [2, 3, 4, 5, 6, 7, 8, 9] },
        action: "Double Down",
    },
    {
        condition: { playerTotal: [10], dealerCard: [10, "A"] },
        action: "Hit",
    },
    {
        condition: { playerTotal: [11], dealerCard: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
        action: "Double Down",
    },
    {
        condition: { playerTotal: [11], dealerCard: ["A"] },
        action: "Hit",
    },
    {
        condition: { playerTotal: [12], dealerCard: [4, 5, 6] },
        action: "Stand",
    },
    {
        condition: { playerTotal: [12], dealerCard: [2, 3, 7, 8, 9, 10, "A"] },
        action: "Hit",
    },
    {
        condition: { playerTotal: [13, 14, 15, 16], dealerCard: [2, 3, 4, 5, 6] },
        action: "Stand",
    },
    {
        condition: { playerTotal: [13, 14, 15, 16], dealerCard: [7, 8, 9, 10, "A"] },
        action: "Hit",
    },
    {
        condition: { playerTotal: [17, 18, 19, 20, 21], dealerCard: "any" },
        action: "Stand",
    },
    // Soft hands (with Ace)
    {
        condition: { playerTotal: ["A2", "A3"], dealerCard: [5, 6] },
        action: "Double Down",
    },
    {
        condition: { playerTotal: ["A2", "A3"], dealerCard: "any" },
        action: "Hit",
    },
    {
        condition: { playerTotal: ["A4", "A5"], dealerCard: [4, 5, 6] },
        action: "Double Down",
    },
    {
        condition: { playerTotal: ["A4", "A5"], dealerCard: "any" },
        action: "Hit",
    },
    {
        condition: { playerTotal: ["A6"], dealerCard: [3, 4, 5, 6] },
        action: "Double Down",
    },
    {
        condition: { playerTotal: ["A6"], dealerCard: "any" },
        action: "Hit",
    },
    {
        condition: { playerTotal: ["A7"], dealerCard: [2, 7, 8] },
        action: "Stand",
    },
    {
        condition: { playerTotal: ["A7"], dealerCard: [3, 4, 5, 6] },
        action: "Double Down",
    },
    {
        condition: { playerTotal: ["A7"], dealerCard: [9, 10, "A"] },
        action: "Hit",
    },
    {
        condition: { playerTotal: ["A8", "A9"], dealerCard: "any" },
        action: "Stand",
    }
];

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.isHidden = false;
    }

    getColor() {
        return ['♥', '♦'].includes(this.suit) ? 'red' : 'black';
    }

    getHTML() {
        const root = document.documentElement;
        if (state.settings.cardColor === 'blue') {
            root.style.setProperty('--card-back-color', '#0066cc');
            root.style.setProperty('--card-back-base', '#004999');
        } else {
            root.style.setProperty('--card-back-color', '#b22222');
            root.style.setProperty('--card-back-base', '#800000');
        }

        if (this.isHidden) {
            return `<div class="card back"></div>`;
        }
        return `
            <div class="card" style="color: ${this.getColor()}">
                <div class="card-value">${this.value}</div>
                <div class="card-suit">${this.suit}</div>
            </div>
        `;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.reset();
        this.shuffle();
    }

    reset() {
        this.cards = SUITS.flatMap(suit => 
            VALUES.map(value => new Card(suit, value))
        );
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        const card = this.cards.pop();
        cardSound.currentTime = 0;
        cardSound.play();
        return card;
    }
}

class BlackjackGame {
    constructor() {
        this.deck = new Deck();
        this.playerHand = [];
        this.dealerHand = [];
        this.currentBet = 0;
        this.gameStatus = 'betting';
        this.setupGameControls();
        this.setupHelperControl();
    }

    getRecommendation(playerTotal, dealerCard) {
        // Convert face cards to 10 for dealer's card
        if (['J', 'Q', 'K'].includes(dealerCard)) dealerCard = '10';
        
        // Check for soft hands first
        const hasAce = this.playerHand.some(card => card.value === 'A');
        let handType = '';
        
        if (hasAce) {
            const nonAceCards = this.playerHand.filter(card => card.value !== 'A');
            const nonAceTotal = this.calculateHand(nonAceCards);
            handType = `A${nonAceTotal}`;
        }

        const recommendation = blackjackRecommendations.find(({ condition }) => {
            if (hasAce) {
                const withinPlayerRange = Array.isArray(condition.playerTotal) 
                    ? condition.playerTotal.includes(handType)
                    : condition.playerTotal === handType;
                const dealerMatch = condition.dealerCard === "any" ||
                    (Array.isArray(condition.dealerCard)
                        ? condition.dealerCard.includes(dealerCard)
                        : condition.dealerCard === dealerCard);
                return withinPlayerRange && dealerMatch;
            } else {
                const withinPlayerRange = Array.isArray(condition.playerTotal)
                    ? condition.playerTotal.includes(playerTotal)
                    : condition.playerTotal === playerTotal;
                const dealerMatch = condition.dealerCard === "any" ||
                    (Array.isArray(condition.dealerCard)
                        ? condition.dealerCard.includes(dealerCard)
                        : condition.dealerCard === dealerCard);
                return withinPlayerRange && dealerMatch;
            }
        });

        return recommendation?.action || "Stand";
    }

    setupHelperControl() {
        const helperControl = document.createElement('div');
        helperControl.id = 'helperControl';
        helperControl.className = 'control-button';
        helperControl.innerHTML = `
            <button id="helperBtn">❓</button>
            <div id="strategyHelper" class="strategy-container hidden">
                <table id="recommendationTable">
                    <thead>
                        <tr>
                            <th>Your Hand</th>
                            <th>Dealer's Card</th>
                            <th>Recommendation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>--</td>
                            <td>--</td>
                            <td>--</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        
        document.querySelector('.game-table').appendChild(helperControl);

        const helperBtn = document.getElementById('helperBtn');
        const strategyHelper = document.getElementById('strategyHelper');

        helperBtn.addEventListener('click', () => {
            strategyHelper.classList.toggle('hidden');
            if (!strategyHelper.classList.contains('hidden')) {
                this.updateStrategyRecommendation();
            }
        });

        // Close helper when clicking outside
        document.addEventListener('click', (e) => {
            if (!strategyHelper.contains(e.target) && !helperBtn.contains(e.target)) {
                strategyHelper.classList.add('hidden');
            }
        });
    }

    updateStrategyRecommendation() {
        if (this.playerHand.length === 0 || this.dealerHand.length === 0) return;

        const playerScore = this.calculateHand(this.playerHand);
        const dealerCard = this.dealerHand[0].value;
        const recommendation = this.getRecommendation(playerScore, dealerCard);

        const tbody = document.querySelector('#recommendationTable tbody');
        tbody.innerHTML = `
            <tr>
                <td>${playerScore}</td>
                <td>${dealerCard}</td>
                <td class="${recommendation.toLowerCase()}">${recommendation}</td>
            </tr>
        `;
    }

    showOutcomeBanner(result, playerScore, dealerScore) {
        const banner = document.createElement('div');
        banner.className = `outcome-banner ${result}`;
        
        let message = '';
        switch (result) {
            case 'blackjack':
                message = '🎰 BLACKJACK! 🎰';
                break;
            case 'win':
                message = playerScore > 21 ? '💥 BUSTED! 💥' : 
                         dealerScore > 21 ? '🎉 DEALER BUSTED! 🎉' : 
                         '🏆 YOU WIN! 🏆';
                break;
            case 'lose':
                message = playerScore > 21 ? '💥 BUSTED! 💥' : 
                         '❌ DEALER WINS ❌';
                break;
            case 'push':
                message = '🤝 PUSH 🤝';
                break;
        }
        
        banner.textContent = message;
        document.body.appendChild(banner);

        setTimeout(() => {
            banner.remove();
            this.resetGame();
        }, 2000);
    }

    setupGameControls() {
        const controls = document.getElementById('gameControls');
        controls.innerHTML = `
            <div class="betting-controls">
                <input type="number" id="betAmount" min="10" max="${state.user.tokens}" step="10" value="10">
                <button id="placeBet">Place Bet</button>
            </div>
            <div class="game-buttons hidden">
                <button id="hitButton">Hit</button>
                <button id="standButton">Stand</button>
                <button id="doubleButton">Double Down</button>
            </div>
            <div class="game-info">
                <p>Tokens: <span id="tokenDisplay">${state.user.tokens}</span></p>
                <p>Current Bet: <span id="betDisplay">0</span></p>
            </div>
        `;

        document.getElementById('placeBet').addEventListener('click', () => this.startRound());
        document.getElementById('hitButton').addEventListener('click', () => this.hit());
        document.getElementById('standButton').addEventListener('click', () => this.stand());
        document.getElementById('doubleButton').addEventListener('click', () => this.doubleDown());
    }

    startRound() {
        const betAmount = parseInt(document.getElementById('betAmount').value);
        if (betAmount > state.user.tokens || betAmount < 10) {
            alert('Invalid bet amount!');
            return;
        }

        this.currentBet = betAmount;
        state.user.tokens -= betAmount;
        this.updateDisplay();

        this.playerHand = [this.deck.deal(), this.deck.deal()];
        this.dealerHand = [this.deck.deal(), this.deck.deal()];
        this.dealerHand[1].isHidden = true;

        document.querySelector('.betting-controls').classList.add('hidden');
        document.querySelector('.game-buttons').classList.remove('hidden');

        this.updateDisplay();
        this.updateStrategyRecommendation();
        this.checkForBlackjack();
    }

    hit() {
        this.playerHand.push(this.deck.deal());
        this.updateDisplay();
        this.updateStrategyRecommendation();
        
        const playerScore = this.calculateHand(this.playerHand);
        if (playerScore > 21) {
            this.endRound('lose', playerScore, this.calculateHand(this.dealerHand));
        }
    }

    stand() {
        this.dealerHand[1].isHidden = false;
        this.updateDisplay();
        
        let dealerScore = this.calculateHand(this.dealerHand);
        while (dealerScore < 17) {
            this.dealerHand.push(this.deck.deal());
            dealerScore = this.calculateHand(this.dealerHand);
            this.updateDisplay();
        }

        const playerScore = this.calculateHand(this.playerHand);

        if (dealerScore > 21) {
            this.endRound('win', playerScore, dealerScore);
        } else if (dealerScore > playerScore) {
            this.endRound('lose', playerScore, dealerScore);
        } else if (playerScore > dealerScore) {
            this.endRound('win', playerScore, dealerScore);
        } else {
            this.endRound('push', playerScore, dealerScore);
        }
    }

    doubleDown() {
        if (state.user.tokens < this.currentBet) {
            alert('Not enough tokens to double down!');
            return;
        }

        state.user.tokens -= this.currentBet;
        this.currentBet *= 2;
        this.hit();
        
        const playerScore = this.calculateHand(this.playerHand);
        if (playerScore <= 21) {
            this.stand();
        }
    }

    calculateHand(hand) {
        let total = 0;
        let aces = 0;

        for (const card of hand) {
            if (card.value === 'A') {
                aces++;
            } else if (['J', 'Q', 'K'].includes(card.value)) {
                total += 10;
            } else {
                total += parseInt(card.value);
            }
        }

        for (let i = 0; i < aces; i++) {
            if (total + 11 <= 21) {
                total += 11;
            } else {
                total += 1;
            }
        }

        return total;
    }

    checkForBlackjack() {
        const playerScore = this.calculateHand(this.playerHand);
        const dealerScore = this.calculateHand(this.dealerHand);

        if (playerScore === 21 || dealerScore === 21) {
            this.dealerHand[1].isHidden = false;
            this.updateDisplay();

            if (playerScore === 21 && dealerScore === 21) {
                this.endRound('push', playerScore, dealerScore);
            } else if (playerScore === 21) {
                this.endRound('blackjack', playerScore, dealerScore);
            } else {
                this.endRound('lose', playerScore, dealerScore);
            }
        }
    }

    endRound(result, playerScore, dealerScore) {
        this.dealerHand[1].isHidden = false;
        this.updateDisplay();

        switch (result) {
            case 'win':
                state.user.tokens += this.currentBet * 2;
                break;
            case 'lose':
                break;
            case 'push':
                state.user.tokens += this.currentBet;
                break;
            case 'blackjack':
                state.user.tokens += Math.floor(this.currentBet * 2.5);
                break;
        }

        this.showOutcomeBanner(result, playerScore, dealerScore);

        // Save user data
        let users = JSON.parse(localStorage.getItem('blackjack_users') || '{}');
        users[state.user.username] = state.user;
        localStorage.setItem('blackjack_users', JSON.stringify(users));
    }

    resetGame() {
        this.deck = new Deck();
        this.playerHand = [];
        this.dealerHand = [];
        this.currentBet = 0;
        document.querySelector('.betting-controls').classList.remove('hidden');
        document.querySelector('.game-buttons').classList.add('hidden');
        this.updateDisplay();
    }

    updateDisplay() {
        const dealerHandEl = document.getElementById('dealerHand');
        const playerHandEl = document.getElementById('playerHand');
        const tokenDisplay = document.getElementById('tokenDisplay');
        const betDisplay = document.getElementById('betDisplay');

        // Update dealer's hand with total
        const dealerScore = this.dealerHand[1]?.isHidden ? this.calculateHand([this.dealerHand[0]]) : this.calculateHand(this.dealerHand);
        dealerHandEl.innerHTML = `
            <div class="hand-container">
                <div class="hand">${this.dealerHand.map(card => card.getHTML()).join('')}</div>
                <div class="hand-total">Dealer's Total: ${dealerScore}</div>
            </div>
        `;

        // Update player's hand with total
        const playerScore = this.calculateHand(this.playerHand);
        playerHandEl.innerHTML = `
            <div class="hand-container">
                <div class="hand">${this.playerHand.map(card => card.getHTML()).join('')}</div>
                <div class="hand-total">Your Total: ${playerScore}</div>
            </div>
        `;

        tokenDisplay.textContent = state.user.tokens;
        betDisplay.textContent = this.currentBet;
    }
}

// Initialize game when game screen is shown
document.getElementById('playButton').addEventListener('click', () => {
    window.blackjackGame = new BlackjackGame();
});