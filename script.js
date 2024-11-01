let score = 0;
let timeLeft = 60;
let timerInterval;
const wordSet = new Set();
const gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const wordInput = document.getElementById('wordInput');
const submitButton = document.getElementById('submitWord');

// Create a random letter grid
function generateGrid() {
    gridElement.innerHTML = '';
    const letters = Array.from({ length: 16 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97));
    
    letters.forEach(letter => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = letter.toUpperCase();
        gridElement.appendChild(cell);
    });
}

// Start the game
function startGame() {
    generateGrid();
    score = 0;
    timeLeft = 60;
    wordSet.clear();
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}`;
    messageElement.textContent = '';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            messageElement.textContent = 'Time\'s up! Final Score: ' + score;
        }
    }, 1000);
}

// Check the submitted word
function checkWord() {
    const word = wordInput.value.toLowerCase();
    
    if (word.length < 3 || wordSet.has(word)) {
        messageElement.textContent = 'Invalid word or already used!';
        wordInput.value = '';
        return;
    }
    
    // Check if the word can be formed from the grid letters (basic implementation)
    const gridLetters = Array.from(gridElement.childNodes).map(cell => cell.textContent.toLowerCase());
    if (word.split('').every(letter => gridLetters.includes(letter))) {
        score += word.length;
        wordSet.add(word);
        scoreElement.textContent = `Score: ${score}`;
        wordInput.value = '';
        messageElement.textContent = 'Word accepted!';
    } else {
        messageElement.textContent = 'Word not found in grid!';
    }
}

// Event listeners
submitButton.addEventListener('click', checkWord);
window.addEventListener('load', startGame);
