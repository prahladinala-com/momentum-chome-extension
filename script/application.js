var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);

  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);

  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
// const settingsBtn = document.getElementById("settings-btn");
// const settings = document.getElementById("settings");
// const settingsForm = document.getElementById("settings-form");
// const difficultySelect = document.getElementById("difficulty");

//List of words for game
const words = [
  "apples",
  "bananas",
  "pears",
  "torchlight",
  "motorcycle",
  "brightwork",
  "quickthorn",
  "silver",
  "airplane",
  "juices",
  "superficial",
  "coldwar",
  "independent",
  "admit",
  "loving",
  "north",
  "warlike",
  "tenses",
  "eight",
  "feeble",
  "highfalutin",
  "steer",
  "bad",
];

//Init Word
let randomWord;

//Init Score
let score = 0;

//Init time
let time = 10;

// Focus on text on load
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
// console.log(getRandomWord());

//Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Update time function
function updateTime() {
  //   console.log(1);
  time--;
  timeEl.innerHTML = time + "s";

  //set timer not going into negatives
  if (time === 0) {
    clearInterval(timeInterval);
    //End Game
    gameOver();
  }
}

//Game Over, Show End Screen
function gameOver() {
  endgameEl.innerHTML = `
        <h3>Time ran out</h3>
        <br />
        <p>Your final score is ${score}</p>
    `;

  endgameEl.style.display = "flex";
}
addWordToDOM();

//Event Listeners

//Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  //   console.log(insertedText);
  //Check to see the typed value is equal to given word
  if (insertedText === randomWord) {
    //Correct word
    addWordToDOM();
    //Update Score
    updateScore();
    //Clear
    e.target.value = "";

    time += 2;
    updateTime();
  }
});
//Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
// game.addEventListener("mousedown", function (e) {
//   if (e.target.className === "play-again") {
//     window.location.reload();
//   }
// });

//Listen for Guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  //Validate our input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  //Check if WON
  if (guess === winningNum) {
    //Game Over => WON

    // //Disable Input
    // guessInput.disabled = true;
    // //Change border color
    // guessInput.style.borderColor = "green";
    // //Set Message
    // setMessage(`${winningNum} is correct!, YOU WON!`, "green");

    gameOver(true, `${winningNum} is correct!, YOU WON!`);
  } else {
    //Wrong Number
    guessesLeft -= 1;
    // same as => guessesLeft = guessesLeft - 1
    if (guessesLeft === 0) {
      //Game Over => LOST
      //   //Disable Input
      //   guessInput.disabled = true;
      //   //Change border color
      //   guessInput.style.borderColor = "red";
      //   //Set Message
      //   setMessage(
      //     `Game Over, YOU LOST. The correct number was ${winningNum}`,
      //     "red"
      //   );

      gameOver(
        false,
        `Game Over, YOU LOST. The correct number was ${winningNum}`
      );
    } else {
      //Game Contiues => Answer Wrong

      //Change border color
      guessInput.style.borderColor = "red";

      //Clear input
      guessInput.value = "";

      //Set Message => Tell user this is wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses Left`, "red");
    }
  }
});

//Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  //Disable Input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set message color
  message.style.color = color;
  //Set Message
  setMessage(msg);

  //Play Again ?
  guessBtn.value = "Play Again";
  //Add New Class
  guessBtn.className += "play-again";
}

//Get Winning Number
function getRandomNum(min, max) {
  // console.log(Math.floor(Math.random()*(max-min+1)+min));
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set Message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
