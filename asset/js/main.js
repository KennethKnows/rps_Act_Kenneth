document.addEventListener("DOMContentLoaded", () => {
    let choices = ['Rock', 'Paper', 'Scissors'];

    let rpsPlayer = document.querySelector("#rpsPlayer");
    let rpsComputer = document.querySelector("#rpsComputer");
    let rpsResult = document.querySelector("#rpsResult");
    let selectButtons = document.querySelectorAll('.selectBtn');
    let resetButton = document.getElementById('resetBtn');
    let historyList = document.querySelector('#historyList');
    let playerScoreElement = document.querySelector('#playerScore');
    let computerScoreElement = document.querySelector('#computerScore');

    let playerChoice;
    let computerChoice;
    let playerWins = 0;
    let computerWins = 0;
    let roundsPlayed = 0;

    // Diri ka mag kuha ug function paras Computer
    function getComputerChoice() {
        let randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // HERE'S THE CODE PARA MA DETERMINE UG KINSAY DAOG -> GA ERROR GIHAPON SA TIE
    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'Tie';
        } else if (
            (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
            (playerChoice === 'Paper' && computerChoice === 'Rock') ||
            (playerChoice === 'Scissors' && computerChoice === 'Paper')
        ) {
            return 'Player Win';
        } else {
            return 'Computer Win';
        }
    }

    // UPDATE GAME RESULT ALL FIXED NA.
    function updateGameResult(playerChoice, computerChoice, result) {
        rpsPlayer.textContent = `Player: ${playerChoice}`;
        rpsComputer.textContent = `Computer: ${computerChoice}`;
        rpsResult.textContent = `Result: ${result}`;
        
        if (result === 'Player Win') {
            playerWins++;
        } else if (result === 'Computer Win') {
            computerWins++;
        }
    }

    // Game history -> dili ma record 
    function updateGameHistory(playerChoice, computerChoice, result) {
        if (roundsPlayed < 3) {
            let listItem = document.createElement("li");
            listItem.textContent = `Player chose ${playerChoice}, Computer chose ${computerChoice}, Result: ${result}`;
            historyList.appendChild(listItem);
        }
    }

    // Score board
    function updateScoreBoard() {
        playerScoreElement.textContent = `Player: ${playerWins}`;
        computerScoreElement.textContent = `Computer: ${computerWins}`;
    }

    // Function to check for a champion
    function checkChampion() {
        if (playerWins >= 2) {
            alert("Congratulations! You are the champion.");
        } else if (computerWins >= 2) {
            alert("The computer is the champion. Better luck next time!");
        }
    }

    // Reset the game
    function resetGame() {
        console.log('Reset button clicked'); //Trial kay di mo gana ang RESET KALAGOT!
        playerWins = 0;
        computerWins = 0;
        roundsPlayed = 0;
        playerChoice = 0;
        computerChoice = 0;
        historyList.innerHTML = "";
        rpsPlayer.textContent = "Player: "; //apil ni
        rpsComputer.textContent = "Computer: "; //MAO NIY PAG FIXED SA ERROR GITAWAG RA NAKO
        rpsResult.textContent = "Result: "; //apil ni
        updateScoreBoard();

    }
    console.log('playerWins:', playerWins);
    console.log('computerWins:', computerWins);
    console.log('roundsPlayed:', roundsPlayed);

    // Add event listeners for each select button
    selectButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (roundsPlayed < 3) {
                playerChoice = choices[index];
                computerChoice = getComputerChoice();
                const result = determineWinner(playerChoice, computerChoice);
                updateGameResult(playerChoice, computerChoice, result);
                updateGameHistory(playerChoice, computerChoice, result);
                updateScoreBoard();
                checkChampion();
                roundsPlayed++;
            }
        });
    });

    // Add event listener for the reset button
    resetButton.addEventListener('click', resetGame);
});
