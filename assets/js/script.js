// Build a Timed Quiz

// array of questions
var questions = [
    { 
        q: 'Arrays in Javascript can be used to store _________.',
        c: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        a: 4 
    },
    {
        q: 'Commonly used data points do NOT include:',
        c: ['strings', 'booleans', 'alerts', 'numbers'],
        a: 3
    },
    {
        q: 'A very useful tool used during development and debugging for printing content to be debugger is:',
        c: ['javascript', 'terminal/bash', 'for loops', 'console.log'],
        a: 4
    },
    {
        q: 'The condition in an if/else statement is enclosed with _________.',
        c: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        a: 2
    },
    {
        q: 'String values must be enclosed within _________ when being assigned to variables.',
        c: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        a: 3
    }
];

// assign a variables to DOM objects
var titleEl = document.querySelector("#title-questions");
var buttonAnswerEl = document.querySelector('#button-answer');

// challenge title and description
var titlePage = function() {
    // opening title
    var openingTitle = document.createElement('h2');
    openingTitle.className = 'title';
    openingTitle.textContent = 'Coding Quiz Challenge';
    titleEl.appendChild(openingTitle);
    // quiz description
    var openingText = document.createElement('p');
    openingText.className = 'title';
    openingText.innerHTML = 'Try to answer the following code-related questions within the time limit. <br /> Keep in mind that incorrect answers will penalize your score/time <br /> by 10 seconds.';
    titleEl.appendChild(openingText);
    // start button
    var startButton = document.createElement('button');
    startButton.className = 'start-button';
    startButton.textContent = 'Start Quiz';
    buttonAnswerEl.appendChild(startButton);
};

titlePage();

var runQuiz = function() {

}