let randomNumber = parseInt(Math.random()*100 +1)  ;

const submit =document.querySelector('#submit');
const userInput = document.querySelector('#guessField');
const guesses= document.querySelector('.guesses');
const remaining= document.querySelector('.lastResult');
const hint = document.querySelector('.loOrHi');
const startOver= document.querySelector('.resultParas');
        

const p= document.createElement('p');
let prev=[];
let numGuess=1;
let playGame=true;

if(playGame){
    submit.addEventListener('click',(e)=>{
        e.preventDefault()
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    })
}
function validateGuess(guess){
    if(isNaN(guess)){
        displayMessage("please enter a valid number");
        userInput.value='';
    }
    else if(guess<1){
        displayMessage("Enter no. greater than 1");
        userInput.value='';
    }
    else if(guess>100){
        displayMessage("Enter no. less than 100");
        userInput.value='';
    }
    else{
        prev.push(`${guess}`);
        if(numGuess===11){
            displayGuess(guess);
            displayMessage(`Gameover, random no. was ${randomNumber}`);
            endGame();
        }else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess===randomNumber){
        displayMessage('You guessed the right number');
        endGame();
    }else if(guess > randomNumber){
        displayMessage('Your guess is too high');
    }else{
        displayMessage('Your guess is too low')
    }
}

function displayGuess(guess){
    userInput.value='';
    guesses.innerHTML+=`${guess},`;
    numGuess++;
    remaining.innerHTML=`${12-numGuess}`;

}

function displayMessage(messgae){
    hint.innerHTML=`${messgae}`;
}

function endGame(){
    userInput.value='';
    userInput.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML='<h2 id="newGame">Start new Game</h2>';
    startOver.appendChild(p);
    playGame=false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click',(e)=>{
        randomNumber=parseInt(Math.random()*100 +1);
        prev=[ ];
        numGuess=1;
        guesses.innerHTML=''
        remaining.innerHTML=`${11-numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame=true;
    })
}
