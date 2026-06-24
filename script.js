let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

let gameActive = true;

updateScore();

function playGame(playerMove) {

    if (!gameActive) {
        return;
    }

    gameActive = false;

    document.querySelectorAll('.move-button')
    .forEach(button => {
        button.classList.add('disabled');
    });

    const computerMove = pickComputerMove();

    const playerHand = document.querySelector('.js-player-move');
    const computerHand = document.querySelector('.js-computer-move');

    playerHand.classList.remove('hit-left');
    computerHand.classList.remove('hit-right');

    void playerHand.offsetWidth;

    playerHand.classList.add('hit-left');
    computerHand.classList.add('hit-right');

    let result = '';

    if (playerMove === 'rock') {

        if (computerMove === 'rock') {
            result = 'Draw 🤝';
        }
        else if (computerMove === 'paper') {
            result = 'You Lose 😢';
        }
        else {
            result = 'You Won 🎉';
        }

    }

    else if (playerMove === 'paper') {

        if (computerMove === 'rock') {
            result = 'You Won 🎉';
        }
        else if (computerMove === 'paper') {
            result = 'Draw 🤝';
        }
        else {
            result = 'You Lose 😢';
        }

    }

    else if (playerMove === 'scissors') {

        if (computerMove === 'rock') {
            result = 'You Lose 😢';
        }
        else if (computerMove === 'paper') {
            result = 'You Won 🎉';
        }
        else {
            result = 'Draw 🤝';
        }

    }

    const resultElement = document.querySelector('.js-result');

    resultElement.classList.remove(
        'result-win',
        'result-lose',
        'result-draw'
    );

    resultElement.innerText = 'Rock...';

    setTimeout(() => {
        resultElement.innerText = 'Paper...';
    }, 300);

    setTimeout(() => {
        resultElement.innerText = 'Scissors...';
    }, 600);

    setTimeout(() => {

        document.querySelector('.js-player-move').innerHTML = getEmoji(playerMove);
        document.querySelector('.js-computer-move').innerHTML = getEmoji(computerMove);

        resultElement.innerText = result;

        resultElement.classList.remove(
            'result-win',
            'result-lose',
            'result-draw'
        );

        if (result.includes('Won')) {
            score.wins++;
            resultElement.classList.add('result-win');
        }
        else if (result.includes('Lose')) {
            score.losses++;
            resultElement.classList.add('result-lose');
        }
        else {
            score.ties++;
            resultElement.classList.add('result-draw');
        }

        localStorage.setItem('score',JSON.stringify(score));

        updateScore();

        document.querySelectorAll('.move-button')
        .forEach(button => {
            button.classList.remove('disabled');
        });

        gameActive = true;

    }, 900);
}

function updateScore() {

    document.querySelector('.wins').textContent = `Win : ${score.wins}`;

    document.querySelector('.losses').textContent = `Lose : ${score.losses}`;

    document.querySelector('.draws').textContent = `Draw : ${score.ties}`;
}

function resetGame() {

    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };

    localStorage.removeItem('score');

    updateScore();

    const resultElement = document.querySelector('.js-result');
    resultElement.innerText = 'Make your move!';

    resultElement.classList.remove(
        'result-win',
        'result-lose',
        'result-draw'
    );

    document.querySelector('.js-player-move').innerHTML = '✊';
    document.querySelector('.js-computer-move').innerHTML = '✊';

    document.querySelectorAll('.move-button').
    forEach(button => {
        button.classList.remove('disabled');
    });

    gameActive = true;
}

function pickComputerMove() {

    const randomNumber = Math.random();

    if (randomNumber < 1 / 3) {
        return 'rock';
    }
    else if (randomNumber < 2 / 3) {
        return 'paper';
    }
    else {
        return 'scissors';
    }
}

function getEmoji(move) {

    if (move === 'rock') {
        return '✊';
    }

    if (move === 'paper') {
        return '✋';
    }

    if (move === 'scissors') {
        return '✌️';
    }

}

document.addEventListener('keydown', (event) => {

    const key = event.key.toLowerCase();

    if (key === 'r') {
        playGame('rock');
    }

    else if (key === 'p') {
        playGame('paper');
    }

    else if (key === 's') {
        playGame('scissors');
    }

});