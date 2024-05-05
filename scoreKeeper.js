const p1 = {
    set: 0,
    score: 0,
    button: document.querySelector('button#playerOneButton'),
    span: document.querySelector('span#playerOneScore'),
    setSpan: document.querySelector('span#playerOneSet'),
}

const p2 = {
    set: 0,
    score: 0,
    button: document.querySelector('button#playerTwoButton'),
    span: document.querySelector('span#playerTwoScore'),
    setSpan: document.querySelector('span#playerTwoSet'),
}

const input = document.querySelector('input');
let isGameOver = false;
let maximum;
let isDeuce = false;

input.addEventListener('change', function(){
    while(this.value > 0){
        maximum = this.value;
        p1.button.disabled = false;
        p2.button.disabled = false;
        break;
    }
})

function gameOver(player, opponent){
    isGameOver = true;
    player.set++;
    player.setSpan.innerText = `${player.set}`
    player.score = 0;
    player.span.innerText = player.score
    opponent.score = 0;
    opponent.span.innerText = opponent.score;
    isGameOver = false;
    isDeuce = false;
}

function updateScores(player, opponent){
    if(!isGameOver){
        player.score++;
        player.span.innerText = `${player.score}`;

        if(player.score == maximum-1 && opponent.score == maximum-1) {
            isDeuce = true;
        } else if(isDeuce){
            const scoreDifference = player.score - opponent.score;
            if(scoreDifference >= 2){
                gameOver(player, opponent);
            }
        }

        if((player.score == maximum || (player.score === 7 && opponent.score === 0)) && !isDeuce){
            gameOver(player, opponent);
        }
    }
}

p1.button.addEventListener('click', function(){
    updateScores(p1,p2)
});
playerTwoButton.addEventListener('click', function(){
    updateScores(p2,p1)
});

resetScores.addEventListener('click', function(){
    p1.score = 0;
    p2.score = 0;
    p1.span.innerText = p1.score;
    p2.span.innerText = p2.score;
})

resetButton.addEventListener('click', function(){
    p1.score = 0;
    p1.set = 0;
    p1.span.innerText = p1.score;
    p1.setSpan.innerText = p1.set;
    p2.score = 0;
    p2.set = 0;
    p2.span.innerText = p2.score;
    p2.setSpan.innerText = p2.set;
    input.value = '';
    isGameOver = false;
    p1.button.disabled = true;
    p2.button.disabled = true;
})