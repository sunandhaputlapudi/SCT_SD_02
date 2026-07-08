// =============================================
// GuessMaster Pro
// Professional Number Guessing Game
// Part 1
// =============================================

// =============================================
// DOM ELEMENTS
// =============================================

const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");

const startBtn = document.getElementById("start-btn");

const difficultyButtons = document.querySelectorAll(".difficulty");

const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");

const message = document.getElementById("message");

const gamePanel = document.getElementById("game-panel");

const attemptsText = document.getElementById("attempts");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");

const historyList = document.getElementById("history-list");

const restartBtn = document.getElementById("restart-btn");
const hintBtn = document.getElementById("hint-btn");

// =============================================
// GAME VARIABLES
// =============================================

let maxNumber = 50;

let secretNumber = 0;

let attempts = 10;

let timer = 60;

let score = 100;

let history = [];

let firstGuess = true;

let hintUsed = false;

let timerInterval = null;

// =============================================
// START GAME
// =============================================

startBtn.addEventListener("click", () => {

    welcomeScreen.style.display = "none";

    gameScreen.classList.remove("hidden");

});

// =============================================
// DIFFICULTY
// =============================================

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        difficultyButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        maxNumber = Number(button.dataset.max);

        initializeGame();

    });

});

// =============================================
// INITIALIZE GAME
// =============================================

function initializeGame() {

    secretNumber = Math.floor(Math.random() * maxNumber) + 1;

    attempts = 10;

    timer = 60;

    score = 100;

    history = [];

    firstGuess = true;

    hintUsed = false;

    attemptsText.textContent = attempts;

    timerText.textContent = timer;

    scoreText.textContent = score;

    historyList.textContent = "No guesses yet";

    message.textContent = "Guess a number between 1 and " + maxNumber;

    guessInput.value = "";

    gamePanel.classList.add("hidden");

    guessBtn.disabled = false;

    hintBtn.disabled = false;

    clearInterval(timerInterval);

    console.log("Secret Number :", secretNumber);

}

// =============================================
// START TIMER
// =============================================

function startTimer() {

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        timer--;

        timerText.textContent = timer;

        if (timer <= 0) {

            clearInterval(timerInterval);

            timer = 0;

            timerText.textContent = timer;

            guessBtn.disabled = true;

            hintBtn.disabled = true;

            message.textContent =
                "⏰ Time's Up! Secret Number was " + secretNumber;

        }

    }, 1000);

}

// =============================================
// STOP TIMER
// =============================================

function stopTimer() {

    clearInterval(timerInterval);

}

// =============================================
// GAME START
// =============================================

initializeGame();
// =============================================
// PART 2
// Guess Logic + Score + Attempts + Restart
// =============================================

// =============================================
// GUESS BUTTON
// =============================================

guessBtn.addEventListener("click", () => {

    const guess = Number(guessInput.value);

    // Empty Input
    if (guessInput.value === "") {

        message.textContent = "⚠ Please enter a number.";

        return;

    }

    // Invalid Range
    if (guess < 1 || guess > maxNumber) {

        message.textContent =
            `⚠ Enter a number between 1 and ${maxNumber}`;

        return;

    }

    // First Guess
    if (firstGuess) {

        firstGuess = false;

        gamePanel.classList.remove("hidden");

        startTimer();

    }

    // Save Guess History

    history.push(guess);

    historyList.textContent = history.join(" ➜ ");

    // Correct Guess

    if (guess === secretNumber) {

        stopTimer();

        message.textContent =
            `🎉 Congratulations! ${secretNumber} is Correct!`;

        score += attempts * 10;

        scoreText.textContent = score;

        guessBtn.disabled = true;

        hintBtn.disabled = true;

        guessInput.disabled = true;

        return;

    }

    // Wrong Guess

    attempts--;

    attemptsText.textContent = attempts;

    score -= 10;

    if (score < 0) {

        score = 0;

    }

    scoreText.textContent = score;

    if (guess < secretNumber) {

        message.textContent =
            "📈 Too Low! Try a Bigger Number.";

    }

    else {

        message.textContent =
            "📉 Too High! Try a Smaller Number.";

    }

    // Game Over

    if (attempts === 0) {

        stopTimer();

        message.textContent =
            `💀 Game Over! Secret Number was ${secretNumber}`;

        guessBtn.disabled = true;

        hintBtn.disabled = true;

        guessInput.disabled = true;

    }

    guessInput.value = "";

    guessInput.focus();

});

// =============================================
// RESTART BUTTON
// =============================================

restartBtn.addEventListener("click", () => {

    guessInput.disabled = false;

    initializeGame();

});

// =============================================
// HINT BUTTON
// =============================================

hintBtn.addEventListener("click", () => {

    if (hintUsed) {

        message.textContent =
            "⚠ Hint already used.";

        return;

    }

    hintUsed = true;

    if (secretNumber % 2 === 0) {

        message.textContent =
            "💡 Hint : Secret Number is EVEN.";

    }

    else {

        message.textContent =
            "💡 Hint : Secret Number is ODD.";

    }

});

// =============================================
// PRESS ENTER TO GUESS
// =============================================

guessInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {

        guessBtn.click();

    }

});
// =============================================
// PART 3
// XP • Coins • Level • Best Score • Statistics
// =============================================

// =============================================
// PLAYER DATA
// =============================================

let xp = Number(localStorage.getItem("xp")) || 0;

let coins = Number(localStorage.getItem("coins")) || 0;

let level = Number(localStorage.getItem("level")) || 1;

let bestScore = Number(localStorage.getItem("bestScore")) || 0;

let gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;

let gamesWon = Number(localStorage.getItem("gamesWon")) || 0;


// =============================================
// SAVE PLAYER DATA
// =============================================

function savePlayerData(){

    localStorage.setItem("xp",xp);

    localStorage.setItem("coins",coins);

    localStorage.setItem("level",level);

    localStorage.setItem("bestScore",bestScore);

    localStorage.setItem("gamesPlayed",gamesPlayed);

    localStorage.setItem("gamesWon",gamesWon);

}


// =============================================
// LEVEL SYSTEM
// =============================================

function levelUp(){

    while(xp>=100){

        xp-=100;

        level++;

        coins+=100;

        alert(`🎉 Level Up!\n\nYou reached Level ${level}`);

    }

}


// =============================================
// PLAYER WINS
// =============================================

function playerWon(){

    gamesPlayed++;

    gamesWon++;

    xp+=25;

    coins+=50;

    if(score>bestScore){

        bestScore=score;

    }

    levelUp();

    savePlayerData();

}


// =============================================
// PLAYER LOSES
// =============================================

function playerLost(){

    gamesPlayed++;

    savePlayerData();

}


// =============================================
// SHOW PLAYER PROFILE
// =============================================

function showPlayerProfile(){

    console.log("============== PLAYER ==============");

    console.log("Level :",level);

    console.log("XP :",xp);

    console.log("Coins :",coins);

    console.log("Best Score :",bestScore);

    console.log("Games Played :",gamesPlayed);

    console.log("Games Won :",gamesWon);

    console.log(
        "Win Rate :",
        ((gamesWon/gamesPlayed)*100 || 0).toFixed(1)+"%"
    );

    console.log("====================================");

}


// =============================================
// CALL ON PAGE LOAD
// =============================================

showPlayerProfile();


// =============================================
// UPDATE DASHBOARD
// =============================================

function updateDashboard(){

    console.log("XP :",xp);

    console.log("Coins :",coins);

    console.log("Level :",level);

}
// =============================================
// PART 4
// Premium Effects
// =============================================

// =============================================
// SOUND EFFECTS
// =============================================

const sounds = {

    click: new Audio("assets/sounds/click.mp3"),

    win: new Audio("assets/sounds/win.mp3"),

    lose: new Audio("assets/sounds/lose.mp3"),

    hint: new Audio("assets/sounds/hint.mp3")

};

function playSound(type){

    if(!sounds[type]) return;

    sounds[type].currentTime = 0;

    sounds[type].play().catch(()=>{});

}

// =============================================
// BUTTON CLICK SOUND
// =============================================

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",()=>{

        playSound("click");

    });

});

// =============================================
// CONFETTI EFFECT
// =============================================

function createConfetti(){

    for(let i=0;i<80;i++){

        const confetti=document.createElement("div");

        confetti.className="confetti";

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.backgroundColor=
        `hsl(${Math.random()*360},100%,50%)`;

        confetti.style.animationDuration=
        (Math.random()*2+2)+"s";

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.remove();

        },4000);

    }

}

// =============================================
// WIN POPUP
// =============================================

function showWinPopup(){

    setTimeout(()=>{

        alert(

`🏆 YOU WON!

⭐ Score : ${score}

💰 Coins : ${coins}

🎯 Level : ${level}

Keep Playing!`

        );

    },300);

}

// =============================================
// ACHIEVEMENTS
// =============================================

function checkAchievements(){

    if(level===5){

        alert("🏅 Achievement Unlocked\n\nRising Star");

    }

    if(level===10){

        alert("👑 Achievement Unlocked\n\nGuess Master");

    }

    if(gamesWon===10){

        alert("🔥 Achievement\n\n10 Victories");

    }

}

// =============================================
// WIN ANIMATION
// =============================================

function celebrateWin(){

    playSound("win");

    createConfetti();

    checkAchievements();

    showWinPopup();

}

// =============================================
// LOSE ANIMATION
// =============================================

function loseGame(){

    playSound("lose");

    alert(

`💀 Game Over

Secret Number : ${secretNumber}

Try Again!`

    );

}

// =============================================
// DARK MODE
// =============================================

const darkButton=document.createElement("button");

darkButton.innerHTML="🌙";

darkButton.id="themeBtn";

darkButton.style.position="fixed";

darkButton.style.right="25px";

darkButton.style.top="25px";

darkButton.style.width="55px";

darkButton.style.height="55px";

darkButton.style.borderRadius="50%";

darkButton.style.fontSize="22px";

darkButton.style.cursor="pointer";

darkButton.style.zIndex="999";

document.body.appendChild(darkButton);

let dark=true;

darkButton.onclick=()=>{

    if(dark){

        document.body.style.background=
        "linear-gradient(135deg,#ffffff,#dbeafe,#bfdbfe)";

        document.body.style.color="#111";

        darkButton.innerHTML="☀";

    }

    else{

        document.body.style.background=
        "linear-gradient(135deg,#0f172a,#1e293b,#312e81)";

        document.body.style.color="#fff";

        darkButton.innerHTML="🌙";

    }

    dark=!dark;

};

// =============================================
// PLAYER PROFILE
// =============================================

function showProfile(){

    console.log("=========== PLAYER PROFILE ===========");

    console.log("Level :",level);

    console.log("XP :",xp);

    console.log("Coins :",coins);

    console.log("Best Score :",bestScore);

    console.log("Games Played :",gamesPlayed);

    console.log("Games Won :",gamesWon);

    console.log("======================================");

}

showProfile();

console.log("GuessMaster Pro Loaded Successfully");