let gameseq = [];
let userseq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

// Load sounds
const sounds = {
    red: new Audio('Red Sound.wav'),
    green: new Audio('Green sound.wav'),
    yellow: new Audio('yellow sound.wav'),
    blue: new Audio('Blue sound.wav'),
    gameover: new Audio('Game over sound.wav')
};

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started!")
        started = true;

        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    playSound(btn.classList[1]); // Play the corresponding sound
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    playSound(btn.id); // Play the corresponding sound
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    //random button flash

    let randind = Math.floor(Math.random() * 4); // Changed to 4 to include all buttons
    let randcolor = btns[randind];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 500);
        }
    } else {
        sounds.gameover.play(); // Play game over sound
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any Key to Start.`;
        document.body.style.backgroundColor = "red";
        setTimeout(function () {
            document.body.style.backgroundColor = ""; // Reset background color
        }, 150);
        reset();
    }
}

function btnpress() {
    console.log(this);
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

// Function to play sound
function playSound(color) {
    sounds[color].play();
}
