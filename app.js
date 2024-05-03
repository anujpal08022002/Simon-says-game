let gameSqe = [];
let userSqe = [];
let highScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");       // this shows the current level

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("game started");
        started = true;  
        levelUp();
    }
});

function gameFlash (btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200)
}

function userFlash (btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 200)
}

function levelUp() {
   userSqe = [];
   level++;
   h3.innerText = `level ${level}`;

   let randIdx = Math.floor(Math.random() * 3);
   let randColor = btns[randIdx];
   let randBtn = document.querySelector(`.${randColor}`);
   gameSqe.push(randColor)
   gameFlash(randBtn);
}

function checkAns(idx) {
    if(userSqe[idx] == gameSqe[idx]) {
        if(userSqe.length == gameSqe.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        if(level > highScore){
            highScore = level;
        }
        h3.innerHTML = `Game Over! Your score is: <b>${level}</b> and your highscore is: <b>${highScore}</b>  <br> Press any key to start the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSqe.push(userColor);

    checkAns(userSqe.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSqe = [];
    userSqe = [];
    level = 0;
}