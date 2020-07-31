/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying;
document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice-1').style.display = 'none';
document.querySelector('.nice-img').style.display = 'none';
init();
var lastDice;
var lastDiceOne;
var inputValue;
var defaultValue;
//scores = [0, 0];
//roundScore = 0;
//activePlayer = 0; // so the first player is 0 and the second is 1, bcs array we are using is 0 based

/*
dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);

// DOM Manipulation
// ***** SETTER ****
document.querySelector('#current-' + activePlayer).textContent = dice; 
  // We used Documnet Object with querySelector() to manipulate score 0 element from html and change the text to the text of dice var !!!
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>';
  // We can also use .innerHTML to change html too. but we dont need it now

// ***** GETTER *******
var x = document.querySelector('#score-0').textContent;
  // We can just read and store html elements to variables without typing the = after textContent. 
console.log(x);
*/



// ** EVENTS


document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // Random number
  var dice = Math.floor(Math.random() * 6) + 1;
  var diceOne = Math.floor(Math.random() * 6) + 1;
  
  // Display the result
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';
  var diceDOMone = document.querySelector('.dice-1');
  diceDOMone.style.display = 'block';
  diceDOMone.src = 'dice-' + diceOne + '.png';

  
  // Update the round score IF the rolled number wasn't 1
  if (dice === 6 && diceOne === 6) {
      //Lose score
      document.querySelector('#score-' + activePlayer).textContent = '0';
      console.log('boom u hitted two sixes')
      nextPlayer();
  } else if (dice !== 1 && diceOne !== 1) {
    //Add score
    roundScore = roundScore + dice + diceOne;
    //roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }  else {
    //Next player
    nextPlayer();
    }
  
  }
  
});



document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
      //Add current score to Global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Check if the player won the game
    defaultValue = 100;
    inputValue = document.getElementById("winning-score").value;
    
    if (scores[activePlayer] >= defaultValue) {
      document.querySelector('#name-' + activePlayer).textContent = 'You Won!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('.nice-img').style.display = 'block';
      gamePlaying = false;
    } else if (scores[activePlayer] >= inputValue && inputValue != 0) {
      document.querySelector('#name-' + activePlayer).textContent = 'You Won!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('.nice-img').style.display = 'block';
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.dice').style.display = 'none';
  //document.querySelector('.dice-1').style.display = 'none';
} 

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  inputValue = document.getElementById("winning-score").value = "";

  // WE CAN ALSO WORK WITH CSS
document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice-1').style.display = 'none';
document.querySelector('.nice-img').style.display = 'none';
// We selected the .dice and .dice-1 class, and used  .style.display to change it to 'none' NOTE that .display is the property of css and we changed it to none

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}








