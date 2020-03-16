const allChoices = ["rock","paper","scissors"];
const wonRounds = document.querySelector('#wins-num');
const tiedRounds = document.querySelector('#ties-num');
const lostRounds = document.querySelector('#losses-num');
const numRounds = document.querySelector('#round-number span');
const resultAnnouncer = document.querySelector('#round-number > p');
const tauntText = document.querySelector('#computer-taunt > p');
const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');
const historyContainer = document.querySelector('#round-history');
const attribution = document.querySelector('#attribution');
const imgSrc = 'images';

function generateRandIndex(array) {
    return Math.floor(Math.random()*array.length);
}

function computerPlay() {
    let choiceIndex = generateRandIndex(allChoices);
    return choiceIndex;
}

function decideWinner(playerChoice, computerIndex) {
    let playerIndex = allChoices.indexOf(playerChoice);
    
    // Uses array index of each choice to compute who wins, details at bottom of file
    let difference = playerIndex - computerIndex;
    if (Math.abs(difference) == 2) {
        difference *= -0.5
    }
    
    return difference;
}

function generateTaunt(result) {
    let computerWon = [
        `"I'm the best!"`,
        `"Get on my level!"`,
        `"Cry me a river~"`,
        `"Why so mad??"`
    ];
    let computerTied = [
        `"I'm not even trying!"`,
        `"Not gonna get me this time!"`
    ];
    let computerLost = [
        `"Pffft! You got lucky!"`,
        `"HOW??!!"`,
        `"You must have cheated!"`
    ];
    switch (result) {
        case 1:
            return computerLost[generateRandIndex(computerLost)];
        case -1:
            return computerWon[generateRandIndex(computerWon)];
        case 0:
            return computerTied[generateRandIndex(computerTied)];
    }
}

function increase(targetIntegerString) {
    targetIntegerString.textContent = `${Number(targetIntegerString.textContent)+1}`;
}

function recordRound(playerRoundIcon, computerRoundIcon) {
    if (Number(numRounds.textContent) > 3) {
        let toRemove = document.querySelector(`#history-top`);
        let nextRecord = toRemove.nextSibling;
        historyContainer.removeChild(toRemove);
        nextRecord.id = 'history-top';
    }
    let roundRecord = document.createElement('div');
    let player = document.createElement('img');
    let computer = document.createElement('img');
    let round = document.createElement('p');

    roundRecord.classList.add('round-history-entry');
    if (Number(numRounds.textContent) == 1) {
        roundRecord.id = 'history-top';
        attribution.style.visibility = 'visible';
    }

    player.src = `${imgSrc}/${playerRoundIcon}`;
    player.classList.add('history-img');

    computer.src = `${imgSrc}/${computerRoundIcon}`;
    computer.classList.add('history-img');

    round.textContent = numRounds.textContent;

    roundRecord.appendChild(player);
    roundRecord.appendChild(round);
    roundRecord.appendChild(computer);

    historyContainer.appendChild(roundRecord);
}

function updateDisplay(playerChoice, computerChoice, result, taunt) {
    let playerRoundIcon, computerRoundIcon;
    increase(numRounds);
    switch (result) {
        case 1:
            increase(wonRounds);
            resultAnnouncer.textContent = `You won! ${playerChoice} beats ${computerChoice}!`;
            resultAnnouncer.style.color = 'var(--custom-green)';
            playerRoundIcon = `${playerChoice}-green.png`;
            computerRoundIcon = `${computerChoice}-red.png`;
            break;
        case -1:
            increase(lostRounds);
            resultAnnouncer.textContent = `You lost! ${playerChoice} loses to ${computerChoice}!`;
            resultAnnouncer.style.color = 'var(--custom-red)';
            playerRoundIcon = `${playerChoice}-red.png`;
            computerRoundIcon = `${computerChoice}-green.png`;
            break;
        case 0:
            increase(tiedRounds);
            resultAnnouncer.textContent = `It's a tie! ${playerChoice}! does nothing against ${computerChoice}!`;
            resultAnnouncer.style.color = 'var(--custom-grey)';
            playerRoundIcon = `${playerChoice}.png`;
            computerRoundIcon = `${computerChoice}.png`;
    }
    recordRound(playerRoundIcon, computerRoundIcon);
    tauntText.textContent = taunt;
}

function playRound(playerChoice) {
    let result;
    let taunt;
    let computerIndex = computerPlay();
    let computerChoice = allChoices[computerIndex];
    result = decideWinner(playerChoice, computerIndex);
    taunt = generateTaunt(result);
    updateDisplay(playerChoice, computerChoice, result, taunt);
}

const choiceButtons = document.querySelectorAll('.player-buttons');
choiceButtons.forEach((button) => {
    button.addEventListener('click', () => playRound(button.id));
});

/*
Using the indexes of the choices wrt the array allChoices:
    Rock: 0, Paper: 1, Scissors: 2
And taking the difference to be calculated using 
playerIndex - computerIndex = difference:
    (a) If rock vs paper: 0 - 1 = -1 (lose)
    (b) If paper vs rock: 1 - 0 = 1 (win)
    (c) If rock vs scissors: 0 - 2 = -2 (win)
    (d) If scissors vs rock: 2 - 0 = 2 (lose)
    (e) If scissors vs paper: 2 - 1 = 1 (win)
    (f) If paper vs scissors: 1 - 2 = -1 (lose)
    (g) draw cases: difference of 0

If absolute difference = 2, multiply result by -0.5:
    Case (c) difference becomes 1
    Case (d) becomes -1
and we end up with:
    1 = player wins, -1 = player loses, 0 = draw 
*/