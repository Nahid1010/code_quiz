// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var endScreenEl = document.getElementById("end-screen");
var i

// sound effects
var sfxRight = new Audio("sfx/correct.wav");
var sfxWrong = new Audio("sfx/incorrect.wav");

//added utility function

function hide(element) {
  element.claccList.add("hide");
}
function show(element) {
  element.classList.remove("hide");
}

function displayTime() {
  timerEl.textContent = time;
}
// given functions
function startQuiz() {
// hide start screen
  hide(document.getElementById("stat-screen"));
  
// un-hide questions section
  show(document.getElementById("questions"));

  // start timer
 clockTick();

 // show starting time
  displayTime();

  // get question
  getQuestion();
}


function getQuestion() {

  // get current question object from array
  // console.log(currentQuestionIndex);
  var question = questions[currentQuestionIndex];
  var ol, btn;

  // update title with current question
  document.getElementById("question-title").textContent = question.title;

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // create ordered list
  ol = document.createElement("ol");
  choicesEl.appendChild(ol);
  
  // loop over choices
  for (i = 0; i< question.choices.length; i++) {

    // create new button for each choice
    btn = document.createElement("button");
    btn.textContent = question.choices[i];
    btn.id = "btn" + i.toString();

    // attach click event listener to each choice
    btn.onclick = questionClick;
    
    // display on the page
    ol.appendChild(btn);
  }
}

function questionClick(event) {
  var userChoice = event.target.textContent;
  // console.log(event.target.textContent);
  
  // check if user guessed wrong
  if (userChoice !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 10;
    // display new time on page
    displayTime();
    // play "wrong" sound effect
    sfxWrong.play();
    feedbackEl.textContent = "Wrong 👎 ";
  }
  // else 
  else {
    // play "right" sound effect
    sfxRight.play();
    feedbackEl.textContent = "Right 👍";
  }

  // flash right/wrong feedback on page for half a second
  show(feedbackEl);
  setTimeout(function() {
    feedbackEl.textContent = '';
  }, 500);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex == questions.length) {

    // quizEnd
    quizEnd();
  }
  // else 
  else {
    // getQuestion
    getQuestion();
  }
}

function quizEnd() {
  // console.log("Quiz ends");
  // stop timer
  clearInterval(timerId);
  // show end screen
  show(endScreenEl);
  // show final score
  document.getElementById("final-score").textContent = time;
  // hide questions section
  hide(questionsEl);
}

function clockTick() {
  // update time
  timerId = setInterval(function() {
    time--;
    timerEl.textContent = time;
    if (time === 0) {
        clearInterval(timerId);
        quizEnd();
    }
  }, 1000);
}

function saveHighscore() {
  // get value of input box
  var user = document.getElementById("initials").value;
  // console.log(user);
  var currentScore = {
    user: '',
    score: 0
  }
  // make sure value wasn't empty
  if (user !== '') {

    // get saved scores from localstorage, or if not any, set to empty array
    var scoreJSON = localStorage.getItem("scores");
    scores = JSON.parse(scoreJSON);
    if (scores == undefined) {
      scores = [];
    // format new score object for current user
    currentScore.user = user;
    currentScore.score = time;
    scores.push(currentScore)
    // console.log(scores);
    
    // save to localstorage
    localStorage.setItem("scores", JSON.stringify(scores));
    // redirect to next page
    window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
  // check if event key is enter
  if (event.keyCode === 13) {
    // saveHighscore
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
