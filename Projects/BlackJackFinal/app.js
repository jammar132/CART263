// Game State
const state = {
    user: null,
    settings: {
        tableColor: 'green',
        cardColor: 'red',
        musicVolume: 50
    },
    currentScreen: 'login',
    gameState: {
        playerHand: [],
        dealerHand: [],
        currentBet: 0,
        gameStatus: 'betting'
    }
};

// Audio Setup
var backgroundMusic = new Audio('music/casinoJazz.mp3');
backgroundMusic.loop = true;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const gameContainer = document.getElementById('gameContainer');
const welcomeScreen = document.getElementById('welcomeScreen');
const rulesScreen = document.getElementById('rulesScreen');
const gameScreen = document.getElementById('gameScreen');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const settingsBtn = document.getElementById('settingsBtn');
const settingsMenu = document.getElementById('settingsMenu');
const backNavigation = document.getElementById('backNavigation');
const navBackBtn = document.getElementById('navBackBtn');

// Screen History
let screenHistory = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeGame);
loginForm.addEventListener('submit', handleLogin);
volumeBtn.addEventListener('click', toggleVolumeControl);
settingsBtn.addEventListener('click', toggleSettings);
document.getElementById('playButton').addEventListener('click', () => showScreen('game'));
document.getElementById('rulesButton').addEventListener('click', () => showScreen('rules'));
navBackBtn.addEventListener('click', handleBackNavigation);

// Volume Control
volumeSlider.querySelector('input').addEventListener('input', (e) => {
    state.settings.musicVolume = parseInt(e.target.value);
    backgroundMusic.volume = state.settings.musicVolume / 100;
    volumeBtn.textContent = state.settings.musicVolume === 0 ? '🔇' : '🔊';
});

// Click Outside Handlers
document.addEventListener('click', (e) => {
    if (!volumeSlider.contains(e.target) && !volumeBtn.contains(e.target)) {
        volumeSlider.classList.add('hidden');
    }
    if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsMenu.classList.add('hidden');
    }
});

// Initialize Game
function initializeGame() {
    // Set up settings color buttons
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            const setting = parent.previousElementSibling.textContent.toLowerCase().includes('table') ? 'tableColor' : 'cardColor';
            state.settings[setting] = button.dataset.color;
            if (window.blackjackGame) {
                window.blackjackGame.updateDisplay(); // Refresh the display to show new card colors
            }
            updateTableColor();
        });
    });

    // Initialize leaderboard
    updateLeaderboard();
}

// Leaderboard Functions
function updateLeaderboard() {
    const users = JSON.parse(localStorage.getItem('blackjack_users') || '{}');
    const leaderboardData = Object.values(users)
        .sort((a, b) => b.tokens - a.tokens)
        .slice(0, 5);

    const leaderboardHTML = `
        <div class="leaderboard">
            <h2>🏆 Top Players 🏆</h2>
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Player</th>
                        <th>Tokens</th>
                    </tr>
                </thead>
                <tbody>
                    ${leaderboardData.map((user, index) => `
                        <tr>
                            <td class="leaderboard-rank">${index + 1}</td>
                            <td>${user.username}</td>
                            <td class="leaderboard-tokens">${user.tokens.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    // Update or create leaderboard
    let leaderboardElement = document.querySelector('.leaderboard');
    if (leaderboardElement) {
        leaderboardElement.outerHTML = leaderboardHTML;
    } else {
        document.getElementById('welcomeScreen').insertAdjacentHTML('beforeend', leaderboardHTML);
    }
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const pin = document.getElementById('pin').value;

    if (!username || !pin) {
        loginError.textContent = 'Please fill in all fields';
        return;
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
        loginError.textContent = 'PIN must be exactly 4 numbers';
        return;
    }

    // Check local storage
    let users = JSON.parse(localStorage.getItem('blackjack_users') || '{}');
    
    if (users[username]) {
        if (users[username].pin !== pin) {
            loginError.textContent = 'Incorrect PIN';
            return;
        }
        state.user = users[username];
    } else {
        state.user = {
            username,
            pin,
            tokens: 1000,
            highScore: 1000
        };
        users[username] = state.user;
        localStorage.setItem('blackjack_users', JSON.stringify(users));
    }

    loginScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    backgroundMusic.play();
    showScreen('welcome');
    updateLeaderboard();
}

// Screen Management
function showScreen(screenName) {
    const screens = ['welcome', 'rules', 'game'];
    screens.forEach(screen => {
        document.getElementById(`${screen}Screen`).classList.add('hidden');
    });
    document.getElementById(`${screenName}Screen`).classList.remove('hidden');
    
    // Update screen history and back button visibility
    if (state.currentScreen !== screenName) {
        screenHistory.push(state.currentScreen);
    }
    state.currentScreen = screenName;
    
    // Show/hide back button based on screen
    backNavigation.classList.toggle('hidden', screenName === 'welcome');
    
    updateTableColor();
    
    // Update leaderboard when showing welcome screen
    if (screenName === 'welcome') {
        updateLeaderboard();
    }
}

// Back Navigation
function handleBackNavigation() {
    if (screenHistory.length > 0) {
        const previousScreen = screenHistory.pop();
        showScreen(previousScreen);
    }
}

// Controls
function toggleVolumeControl() {
    volumeSlider.classList.toggle('hidden');
}

function toggleSettings() {
    settingsMenu.classList.toggle('hidden');
}

// Table Color
function updateTableColor() {
    if (state.currentScreen === 'welcome' || state.currentScreen === 'game') {
        const screen = document.getElementById(`${state.currentScreen}Screen`);
        screen.style.backgroundColor = state.settings.tableColor === 'green' ? 'var(--green-table)' : 'var(--red-table)';
    }
}