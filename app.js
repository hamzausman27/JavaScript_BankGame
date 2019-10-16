/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer,gamePlaying,lastDice; 
 
// document.querySelector('#current-' + activePlayer).textContent = dice;


document.addEventListener('DOMContentLoaded',setNew); 

 gamePlaying = true;

 document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
    var dice1 = Math.floor(Math.random() * 6)+1;
    var dice2 = Math.floor(Math.random() * 6)+1;
    document.getElementById('dice-1').style.display = 'block';
   // var diceDOM = document.querySelector('.dice');

    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-'+dice1 +'.png';
    document.getElementById('dice-2').src = 'dice-'+dice2 +'.png';
    if(dice1 === 6 && lastDice === 6){
      scores[activePlayer] = 0;
      document.getElementById('score-'+activePlayer).textContent = '0';
      nextPlayer();
    }
    else if(dice1 !== 1 && dice2 !== 1 ){
    roundScores +=dice1 + dice2;
      var element =  document.querySelector('#current-' + activePlayer);
      if(element){
        element.textContent = roundScores;
      }
    
    }
    else{
        
        nextPlayer();
     
    }
    lastDice = dice1;
    
}
 });

  document.querySelector('.btn-hold').addEventListener('click', function(){
    //document.getElementById('score-'+activePlayer).textContent = roundScores;
    var input = document.querySelector('.final-score').value;
    var winningScore;
    if(input){
      winningScore = input;
    }
    else{
      winningScore = 100;
    }
    if(gamePlaying){
    document.querySelector('.dice').style.display = 'none';
    scores[activePlayer] += roundScores;
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= winningScore){
        document.getElementById('name-'+activePlayer).textContent = 'Winner!!!';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        gamePlaying = false;
        
    }
    else{
        nextPlayer();
    }
}
  });

  
  function nextPlayer() {
    var element =  document.querySelector('#current-' + activePlayer);
    if(element){
      element.textContent = 0;
    }
  
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
   document.getElementById('dice-1').style.display = 'none';
   document.getElementById('dice-2').style.display = 'none';

  }


  document.querySelector('.btn-new').addEventListener('click', setNew);
  

  function setNew() {
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
   

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    gamePlaying = true;
  }