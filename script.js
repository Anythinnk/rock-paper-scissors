const allChoices = ["rock","paper","scissors"];

function computerPlay() {
    let choiceIndex = Math.floor(Math.random()*allChoices.length);
    return choiceIndex;
}

function decideWinner(playerChoice, computerIndex) {
    let computerChoice = allChoices[computerIndex];
    let playerIndex = allChoices.indexOf(playerChoice);
    
    // Uses array index of each choice to compute who wins, details at bottom of file
    let difference = playerIndex - computerIndex;
    if (Math.abs(difference) == 2) {
        difference *= -0.5
    }
    
    if (difference == 1) {
        return `You win! Your choice "${playerChoice.toLowerCase()}" beats computer choice "${computerChoice}".`
    } else if (difference == -1) {
        return `You lose! Your choice "${playerChoice.toLowerCase()}" loses to computer choice "${computerChoice}".`
    } else {
        return `It was a draw! Your choice "${playerChoice.toLowerCase()}" ties with computer choice "${computerChoice}".`
    }
}

function oneRound(roundNum = false) {
    let playerChoice;
    let result;
    
    if (roundNum) {
        playerChoice = prompt(`Round ${roundNum}: What is your choice?`,"");
    } else {
        playerChoice = prompt("What is your choice?","");
    }

    if (playerChoice == null) {
        // Handle player clicking 'cancel' on prompt
        result = "Game cancelled.";
    } else if (allChoices.includes(playerChoice.toLowerCase())) {
        // Normal round
        let computerIndex = computerPlay();
        result = decideWinner(playerChoice, computerIndex);
    } else {
        // Repeat prompt if player enters invalid value
        alert("Please choose either 'rock', 'paper' or 'scissors'!");
        result = oneRound(roundNum);
    }
    return result;
}

function startGame(rounds = 5) {
    let roundsWon = 0;
    let roundsLost = 0;
    let roundsDraw = 0;
    let result;

    repeatRounds:
    for (let n = 0; n < rounds; n++) {
        let roundResult = oneRound(n+1);
        console.log(roundResult);
        switch (true) {
            case roundResult.includes("win"):
                roundsWon += 1;
                break;
            case roundResult.includes("lose"):
                roundsLost += 1;
                break;
            case roundResult.includes("draw"):
                roundsDraw += 1;
                break;
            case roundResult.includes("cancel"):
                result = `You prematurely ended the game before round ${n+1} with ${roundsWon} wins, ${roundsLost} losses and ${roundsDraw} draws.`;
                break repeatRounds;
        }
    }

    if (result == undefined) {
        switch (true) {
            case (roundsWon == roundsLost):
                result = `You drew with the computer with ${roundsWon} wins, ${roundsLost} losses and ${roundsDraw} draws. Not bad!`;
                break;
            case (roundsWon > roundsLost):
                result = `You are the winner with ${roundsWon} wins, ${roundsLost} losses and ${roundsDraw} draws. Congratulations!`;
                break;
            case (roundsLost > roundsWon):
                result = `Unfortunately, you lost with only ${roundsWon} wins, but ${roundsLost} losses and ${roundsDraw} draws. Better luck next time!`;
        }
    }
    return result;
}
//console.log(startGame());

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