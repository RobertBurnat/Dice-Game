let scores, roundScore, activePlayer, gamePlaying, scoreInput, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click',() => {
    if(gamePlaying) {
    // 1. Random number    
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;    

    //2. Display the result
    let diceDOM = document.getElementById('dice-1');
    let diceDOM2 = document.getElementById('dice-2');
    diceDOM.style.display = 'block';
    diceDOM.src = './img/dice-' + dice1 + '.png';
    diceDOM2.style.display = 'block';
    diceDOM2.src = './img/dice-' + dice2 + '.png';

    //3. Update the round score IF the rolled number was NOT a 1.
        if(dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
            }
        }
    });

document.querySelector('.btn-hold').addEventListener('click', () => {
    if(gamePlaying) {
        
        // Add CURRENT score to GLOBAL score
        
        scores[activePlayer] += roundScore;
    
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        scoreInput = document.querySelector('.score-input').value;
        
        if(scoreInput) {
            winningScore = scoreInput;
        } else {
            winningScore = 100;
        }

        //Chceck if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDices();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
        //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        hideDices();
}

document.querySelector('.btn-new').addEventListener('click', init);

function hideDices() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    hideDices();
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}
