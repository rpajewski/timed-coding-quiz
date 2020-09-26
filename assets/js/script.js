// Build a Timed Quiz

// array of questions
var questions = [
    { 
        q: 'Arrays in Javascript can be used to store _________.',
        c: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        a: 'all of the above' 
    },
    {
        q: 'Commonly used data points do NOT include:',
        c: ['strings', 'booleans', 'alerts', 'numbers'],
        a: 'alerts'
    },
    {
        q: 'A very useful tool used during development and debugging for printing content to be debugger is:',
        c: ['javascript', 'terminal/bash', 'for loops', 'console.log'],
        a: 'console.log'
    },
    {
        q: 'The condition in an if/else statement is enclosed with _________.',
        c: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        a: 'curly brackets'
    },
    {
        q: 'String values must be enclosed within _________ when being assigned to variables.',
        c: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        a: 'quotes'
    }
];

var currentQuestion = 0;
var time = questions.length * 15;

// assign a variables to DOM objects
var titleEl = document.querySelector('#title');
var answerEl = document.querySelector('#question-answer');
var questionEl = document.querySelector('#questions');
var pageContentEl = document.querySelector('#page-content');
var choicesEl = document.querySelector('#choices');
var timerEl = document.querySelector('#time');
var userScoreEl = document.querySelector('#user-score');
var retryEl = document.querySelector('#try-again');

// quiz timer function
function quizTimer() {
    timer = setInterval(function() {
    timerEl.innerHTML = time--;
    }, 1000);
};

// challenge title and description
var titlePage = function() {
    // display time
    timerEl.innerHTML = time;

    // opening title
    var openingTitle = document.createElement('h2');
    openingTitle.textContent = 'Coding Quiz Challenge';
    titleEl.appendChild(openingTitle);

    // quiz description
    var openingText = document.createElement('p');
    openingText.innerHTML = 'Try to answer the following code-related questions within the time limit. <br /> Keep in mind that incorrect answers will penalize your score/time <br /> by 10 seconds.';
    titleEl.appendChild(openingText);

    // start button
    var startButton = document.createElement('button');
    startButton.className = 'btn start-button';
    startButton.textContent = 'Start Quiz';
    titleEl.appendChild(startButton);
};

// button function
var taskButtonHandler = function(event) {
    var targetEl = event.target;
    // start button handler
    if (targetEl.matches('.start-button')) {
        startQuiz();
    }
    // submit button handler
    else if (targetEl.matches('.submit-button')) {
        submitScore();
    }
    // return to beginning handler
    else if (targetEl.matches('.return-button')) {
        window.location.href = "index.html";
    }
};

var startQuiz = function() {
    // clear welcome page
    welcomePageEl = document.getElementById('title');
    welcomePageEl.setAttribute('class', 'hide');

    //start timer
    time--;
    quizTimer();

    // get questions
    pullQuestion();
};

// pull question
function pullQuestion() {
    // end quiz if timer equals 0
    if (time <= 0) {
        endQuiz();
    }
    else {
        var question = questions[currentQuestion];
        questionEl.textContent = question.q;

        // reset choice buttons
        choicesEl.innerHTML = '';

        // iterate through choices
        question.c.forEach(function(c, i) {
        // create buttons for each possible answer
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choices');
        choiceBtn.setAttribute('value', c);
        choiceBtn.textContent = i + 1 + '. ' + c;
        choicesEl.appendChild(choiceBtn);
        
        // event listener for selected answer
        choiceBtn.onclick = selectedAnswer;
        });
    }
};

function selectedAnswer() {
    // check answer
    if (this.value === questions[currentQuestion].a) {
        answerEl.className = 'response';
        answerEl.textContent = 'Correct!';
    }

    else {
        answerEl.className = 'response';
        answerEl.textContent = 'Wrong!';
        // take away time for wrong answer
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        // display updated time
        timerEl.textContent = time;
    }

    // display answer feedback for 1 sec
    setTimeout(function() {
        answerEl.setAttribute('class', 'hide');
    }, 1000);

    // move to next question in array
    currentQuestion++;

    // verify there are questions remaining
    if (currentQuestion === questions.length) {
        endQuiz();
    }
    else {
        pullQuestion();
    }
};

function userScore() {
    // the quiz is done!
    allDoneEl = document.createElement('h2');
    allDoneEl.textContent = 'All Done!';
    userScoreEl.appendChild(allDoneEl);

    // final score
    finalScoreEl = document.createElement('h3');
    finalScoreEl.textContent = 'Your final score is '+ time + '.';
    userScoreEl.appendChild(finalScoreEl);

    // enter initials
    initialDivEl = document.createElement('div');
    initialDivEl.className = 'submit-form';
    userInEl = document.createElement('h3');
    userInEl.textContent = 'Enter initials:';
    initialDivEl.appendChild(userInEl);
    usersInitialsEl = document.createElement('input');
    usersInitialsEl.type = 'text';
    usersInitialsEl.className = 'user-input';
    initialDivEl.appendChild(usersInitialsEl);
    submitEl = document.createElement('button');
    submitEl.className = 'btn submit-button';
    submitEl.textContent = 'Submit';
    initialDivEl.appendChild(submitEl);
    userScoreEl.appendChild(initialDivEl);
};

function endQuiz() {
    // stop the timer
    clearInterval(timer);
    timerEl.textContent = time;

    // hide questions, choices and answers
    questionEl.textContent = '';
    choicesEl.innerHTML = '';

    // allow user to enter high score if time is greater than 0
    if (time > 0) {
        userScore();
    }
    else {
        // display try again screen and offer return to home page button
        youLoseEl = document.createElement('div');
        youLoseEl.className = 'loss-div'
        tryAgainEl = document.createElement('h3');
        tryAgainEl.textContent = 'Please Try Again';
        youLoseEl.appendChild(tryAgainEl);
        goBackEl = document.createElement('button');
        goBackEl.textContent = 'Go Back';
        goBackEl.className = 'btn return-button';
        youLoseEl.appendChild(goBackEl);
        retryEl.appendChild(youLoseEl);
    }
};

function submitScore() {
    // pull initials from usersInitialsEl
    var initials = usersInitialsEl.value;
  
    // confirm box wasnt empty
    if (initials === '') {
        alert('Please Enter Your Initials')
    }

    else {
        // get saved scores
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        // store new score as key and value
        var newScore = {
            score: time,
            initials: initials
        };
  
        // save score
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
        // go to highscores.html
        window.location.href = "highscores.html";
    }
};

titlePage();

pageContentEl.addEventListener('click', taskButtonHandler);