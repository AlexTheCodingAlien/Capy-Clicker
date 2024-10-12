let score = 0; // Initial score
let cpc = 1; // Capys per click
let cps = 0; // Capys per second
let soundEnabled = true; // Sound toggle

// Get elements from the DOM
const scoreDisplay = document.getElementById('score');
const cpcDisplay = document.getElementById('cpc');
const cpsDisplay = document.getElementById('cps');
const capybara = document.getElementById('capybara');
const shopButton = document.getElementById('shopButton');
const resetButton = document.getElementById('resetButton');
const settingsButton = document.getElementById('settingsButton');
const shopDiv = document.querySelector('.side-shop');
const toggleSoundButton = document.getElementById('toggleSoundButton');
const closeSettingsButton = document.getElementById('closeSettingsButton');

// Upgrades array
const capyUpgrades = [
    { name: "Baby Capy", price: 10, type: 'ppc', value: 1 },
    { name: "Capy Trainer", price: 20, type: 'cps', value: 1 },
    { name: "School Capy", price: 50, type: 'ppc', value: 5 },
    { name: "Capy Academy", price: 100, type: 'cps', value: 3 },
    { name: "Adult Capy", price: 200, type: 'ppc', value: 10 },
    { name: "Capy Breeder", price: 500, type: 'cps', value: 5 },
    { name: "Wise Capy", price: 1000, type: 'ppc', value: 15 },
    { name: "Capy Mansion", price: 2000, type: 'cps', value: 10 },
    { name: "Capy Master", price: 5000, type: 'ppc', value: 25 },
    { name: "Capy Empire", price: 10000, type: 'cps', value: 20 },
    { name: "Capy Baron", price: 20000, type: 'ppc', value: 50 },
    { name: "Capy Baroness", price: 50000, type: 'cps', value: 30 },
    { name: "Capy Mayor", price: 100000, type: 'ppc', value: 100 },
    { name: "Capy Senator", price: 250000, type: 'cps', value: 50 },
    { name: "Capy King", price: 500000, type: 'ppc', value: 200 },
    { name: "Capy Queen", price: 1000000, type: 'cps', value: 100 },
    { name: "Capy God", price: 2000000, type: 'ppc', value: 500 },
    { name: "Capy Universe", price: 5000000, type: 'cps', value: 250 },
    // Add more upgrades as needed
];

// Load game state from local storage
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('capybaraGame'));
    if (savedGame) {
        score = savedGame.score || 0; // Fallback to 0 if undefined
        cpc = savedGame.cpc || 1; // Fallback to 1 if undefined
        cps = savedGame.cps || 0; // Fallback to 0 if undefined
        soundEnabled = savedGame.soundEnabled !== undefined ? savedGame.soundEnabled : true; // Fallback to true if undefined
    }
    updateScore();
    toggleSoundButton.textContent = `Sound: ${soundEnabled ? 'ON' : 'OFF'}`;
}

// Function to update the score display
function updateScore() {
    scoreDisplay.innerText = `Score: ${score}`;
    cpcDisplay.innerText = `Capys Per Click (CPC): ${cpc}`;
    cpsDisplay.innerText = `Capys Per Second (CPS): ${cps}`;
    saveGame(); // Save the game state every time the score is updated
}

// Handle click on the capybara
capybara.addEventListener('click', () => {
    // Increment score based on Capys per click
    score += cpc;
    updateScore();
    if (soundEnabled) {
        new Audio('Sounds/button.mp3').play(); // Play button sound
    }
});

// Show shop when the shop button is clicked
shopButton.addEventListener('click', () => {
    shopDiv.style.display = shopDiv.style.display === 'none' ? 'block' : 'none';
    // Clear previous shop contents
    shopDiv.innerHTML = '';
    
    // Create shop items
    capyUpgrades.forEach(upgrade => {
        const upgradeButton = document.createElement('button');
        upgradeButton.textContent = `${upgrade.name} - Cost: ${upgrade.price} points`;
        upgradeButton.addEventListener('click', () => buyUpgrade(upgrade));
        shopDiv.appendChild(upgradeButton);
    });
});

// Buy an upgrade
function buyUpgrade(upgrade) {
    if (score >= upgrade.price) {
        score -= upgrade.price; // Deduct the cost
        if (upgrade.type === 'ppc') {
            cpc += upgrade.value; // Increase Capys per click
        } else if (upgrade.type === 'cps') {
            cps += upgrade.value; // Increase Capys per second
        }
        updateScore();
    }
}

// Start the CPS loop
setInterval(() => {
    score += cps; // Increment score by CPS
    updateScore();
}, 1000); // Every second

// Reset the game
resetButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the game?')) {
        score = 0;
        cpc = 1;
        cps = 0; // Reset CPS as well
        soundEnabled = true; // Reset sound to ON
        updateScore();
        localStorage.removeItem('capybaraGame'); // Clear local storage
    }
});

// Settings menu handling
settingsButton.addEventListener('click', () => {
    const settingsDiv = document.getElementById('settings');
    settingsDiv.style.display = settingsDiv.style.display === 'none' ? 'block' : 'none';
});

// Toggle sound on/off
toggleSoundButton.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    toggleSoundButton.textContent = `Sound: ${soundEnabled ? 'ON' : 'OFF'}`;
    saveGame(); // Save the sound setting
});

// Close settings menu
closeSettingsButton.addEventListener('click', () => {
    const settingsDiv = document.getElementById('settings');
    settingsDiv.style.display = 'none';
});

// Save game state to local storage
function saveGame() {
    const gameState = {
        score: score,
        cpc: cpc,
        cps: cps,
        soundEnabled: soundEnabled
    };
    localStorage.setItem('capybaraGame', JSON.stringify(gameState));
}

// Start the game
loadGame();
