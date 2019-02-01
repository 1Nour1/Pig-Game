/*
 2 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
*/
var scores, roundScore, activePlayer, gamePlaying, lastDice, scoreBeg;

init();

//When I press ROLL DICE
//I can add an anonymous function in the second parameter which means it has no name & it can't be used anywhere else
document.querySelector('.btn-roll').addEventListener('click',function(){
        if (gamePlaying) {
                 //1] Random number
                        
                var dice=Math.floor(Math.random()*6) +1;

                //2] Display the result
                var diceDOM =document.querySelector('.dice');
                diceDOM.style.display='block';
                diceDOM.src = 'dice-' +dice+ '.png';
                        

                //3] Update the round score if the rolled number wasn't 1
                if (lastDice===6 && dice===6) {
                    scores[activePlayer]=0;
                    document.querySelector('#score-' + activePlayer).textContent = '0';
                    nextPlayer();
                }
                else  if (dice !== 1 ) {
                    //Add score
                    roundScore += dice;
                    document.querySelector('#current-'+activePlayer).textContent= roundScore;
            }
                 else {
                //Next player
                        nextPlayer();

                }
                lastDice =dice;
                        
        }     
});

document.querySelector('.btn-hold').addEventListener('click', function(){
        if (gamePlaying) {
            //Add Current score to the Global Score
            //activePlayer is either 0 or 1 so here i will access the right place in the array for each player
            scores[activePlayer] += roundScore;

            //Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            //To take input from the user as winning score
            var input= document.querySelector('.final-score').value;
            var winningScore;
            if (input) {
                winningScore = input;
            } else {
                winningScore =100;
            }
            //Check if the player won the game
            if(scores[activePlayer] >= winningScore){
                    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                    document.querySelector('.dice').style.display='none';
                    document.querySelector('.player-' +activePlayer + '-panel').classList.add('winner');
                    document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
                    //Setting gamePlaying to false so he can't be able to press roll dice when we have a winner
                    gamePlaying=false;

            }else{
                    //Next player
                    nextPlayer();
            }
        }           
});

function nextPlayer(){
         //Next player
         activePlayer === 0 ? activePlayer = 1: activePlayer =0;
         roundScore=0;
         sum=0;

         // This to make the score in the red box equals to zero when the other player is chosen
         document.getElementById('current-0').textContent = '0';
         document.getElementById('current-1').textContent = '0';

         //Here to toggle between the players to change the active status 
         document.querySelector('.player-0-panel').classList.toggle('active');
         document.querySelector('.player-1-panel').classList.toggle('active');

         document.querySelector('.dice').style.display= 'none';
};

//when i press the new game button
//init not init() because I want the eventListener to call the func for me
document.querySelector('.btn-new').addEventListener('click',init);

//Each time we start the game we set everything to zero
function init(){
        scores=[0,0];
        roundScore=0;
        activePlayer=0;
        sum=0;
        gamePlaying=true;
        //To set everything to zero at the begining
        document.getElementById('score-0').textContent ='0';
        document.getElementById('score-1').textContent ='0';
        document.getElementById('current-0').textContent ='0';
        document.getElementById('current-1').textContent ='0';

        //to hide the dice pic at the begining
        document.querySelector('.dice').style.display ='none';

        //To get rid of winner title from previous game
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';

        //To get rid of the winner and active class 
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
         document.querySelector('.player-1-panel').classList.remove('active');
         //Then i add active class to player 0
         document.querySelector('.player-0-panel').classList.add('active');//why did i remove it if i will just add it again?
                                                                           //because if i add it without removing it then i will have 2 active class so the code won't
                                                                           //work correctly because i remove the class once so instead of being completely removed ,
                                                                           //I will still have another one runing.




}