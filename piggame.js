'use strict';

// get all elements for the games functionality
let newGame = document.querySelector('.new-game');
let rollDice = document.querySelector('.roll-dice');
let hold = document.querySelector('.hold');
let you = document.querySelector('.YOU');
let guest = document.querySelector('.GUEST');
let start = document.querySelector('.start');
let suspended = document.querySelector('.suspended')

let clicks = 0;
let newGameClicks = 0;
let savePrevRandomNumber = [];
let activePlayer = 0;
let deactive = 1;
let PLAYING = true;
let intervalId1, intervalId2; 

// function to switch player
function switchPlayer(arg) {
    if (arg === 1 || arg === 0) {
        activePlayer = activePlayer === 0 ? 1 : 0;
        if(arg === 1){
            suspended.style.display = 'block';
            clearInterval(intervalId1)   
            intervalId1 = setInterval(function(){
                suspended.style.display = 'none';   
            }, 1000)
        }
        addBG()
    }
    
    removeBG()
}

// function to switch background for active player
let removeBG = (arg) => {
    if (arg === 0 || arg === 1) { deactive = deactive === 1 ? 0 : 1 }

    if (deactive !== activePlayer) {
        player = document.querySelector(`.player${deactive}`);
        screen = document.querySelector(`.screen${deactive}`);
        screen.classList.remove('playerbg');
        player.classList.remove('hide');
        clearInterval(intervalId2);   
        intervalId2 = setInterval(function(){
            player.classList.remove('winbg')

        }, 3000)
    }
}

let screen = document.querySelector(`.screen${activePlayer}`);
let currValueOfPlayer = document.querySelector(`.currValue${activePlayer}`);
let player = document.querySelector(`.player${activePlayer}`);
let totalScore = document.querySelector(`.totalScore--${activePlayer}`);
let diceContainer = document.querySelector('.dice')

// DEFINING START FUNCTION
function startTheGame(){
    addBG()
    diceContainer.style.visibility = "visible";
}
let addBG = () => {
    player = document.querySelector(`.player${activePlayer}`);
    screen = document.querySelector(`.screen${activePlayer}`);
    screen.classList.add('playerbg');
    player.classList.add('hide');
}
start.addEventListener('click', startTheGame); //implement

// ROLL THE DICE
let loadMyScore = 0;
function rollingTheDice(){ 
    if (PLAYING) {
        clicks++;
        const rand = Math.trunc(Math.random() * 6) + 1;
        let currValueOfPlayer = document.querySelector(`.currValue${activePlayer}`);

        savePrevRandomNumber.push(rand);
        if (diceContainer.style.visibility === "visible") {
            //eliminate previous dice from display
            if (clicks > 1) {
                let prev = savePrevRandomNumber.shift();
                let eliminate = document.querySelector(`.dice${prev}`);
                eliminate.style.display = 'none'
            }
            // select all dices randomly
            let dice = document.querySelector(`.dice${rand}`);
            rand === 3 || rand === 6 ? dice.style.display = 'flex' :
                dice.style.display = 'block';

            if (rand === 1) {
                currValueOfPlayer.textContent = 0
                switchPlayer(rand)
                removeBG(rand);
            } else {
                currValueOfPlayer.textContent = rand
            }
        }
    }
}

rollDice.addEventListener('click', rollingTheDice);//implement

// DEFINING THE HOLD BUTTON
let accumulate = [0,0];
let accumulateRounds = [0,0]
let rounds = 0;

function HOLD() {
    if(PLAYING){
    let totalScore = document.querySelector(`.totalScore--${activePlayer}`);
    let currValue = document.querySelector(`.currValue${activePlayer}`);
    let playerScores = document.querySelector(`.scores--${activePlayer}`)
    // calculate total score in each turn
    accumulate[activePlayer] += Number(currValue.textContent)
    totalScore.textContent = accumulate[activePlayer];

    // reset currvalue
    currValue.textContent = 0

    
    // Declare winner and increment rounds
    if(Number(totalScore.textContent) >= 30){
        rounds++
        accumulateRounds[activePlayer] += rounds
        playerScores.textContent = accumulateRounds[activePlayer]
        player = document.querySelector(`.player${activePlayer}`);
        player.classList.add('winbg');
        removeBG(activePlayer);
        PLAYING = false;
    }
    
    // interSwitching between the two players
    switchPlayer(Number(currValue.textContent))
    removeBG(Number(currValue.textContent))
}
}

hold.addEventListener('click', HOLD);

newGame.addEventListener('click',function () {
    // newGameClicks++
    if(PLAYING !== true){
        let deactive = 1;
        deactive = activePlayer === 1 ? 0 : 1; 

        let totalScore1 = document.querySelector(`.totalScore--${activePlayer}`);
        let totalScore2 = document.querySelector(`.totalScore--${deactive}`);
        let currValue = document.querySelector(`.currValue${activePlayer}`);
        
        accumulate[activePlayer] = 0;
        accumulate[deactive] = 0
        totalScore1.textContent = accumulate[activePlayer];
        totalScore2.textContent = accumulate[deactive];
        currValue.textContent = 0;
        rounds = 0;
        removeBG(deactive);

        player = document.querySelector(`.scores--${deactive}`);
        player.classList.remove('winbg');

        PLAYING = true;
    }
    
})

// code by mintlord...