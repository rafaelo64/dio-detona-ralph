const state ={
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        socre: document.querySelector("#score")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        timerId: setInterval(randonSquare, 1000),
        coutDownTimerId: setInterval(coutDown, 1000),
    }

}

function coutDown(){
    state.values.curretTime--
    state.view.timeLeft.textContent = state.values.curretTime

    if(state.values.curretTime <= 0){
        clearInterval(state.actions.coutDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! o seu resultado foi:" + state.values.result)
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2
    audio.play()
}

function randonSquare() {
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy")
    })    

    let randonNumber = Math.floor(Math.random()*9)
    let randonSquare = state.view.squares[randonNumber]
    randonSquare.classList.add("enemy")
    state.values.hitPosition = randonSquare.id
}

// function moveEnemy(){
//     state.values.timerId = setInterval(randonSquare, state.values.gameVelocity)
// }

function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.socre.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")
            }
        })
    })
}

function initalize(){
    // moveEnemy()
    addListenerHitBox()
}

initalize()