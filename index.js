function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

function play() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        var element = document.getElementById("questions");
        element.innerHTML = quiz.getQuestionByIndex().text;

        var choices = quiz.getQuestionByIndex().choices;
        for (var i = 1; i <= choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            checkOptionWithAnswer("btn" + (i+1), choices[i+1]);
        }

        showProgress();
    }
};

function checkOptionWithAnswer(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(guess);
        play();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOver = "<h1>Result</h1>";
    gameOver += "<h2 id='score'> Your score: " + quiz.score + "<br>Percentage:" + (quiz.score/this.questions.length)*100 +"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOver;
};


var questions = [
    new Question("The International Literacy Day is observed on", ["Sep 8", "Nov 28", "May 2", "Sep 22"], "Sep 8"),
    new Question("Which one of the following is essentially a solo dance?", ["Kuchipudi", "Kathak", "Manipuri", "Mohiniattam"], "Mohiniattam"),
    new Question("Meenakshi Temple is in", ["Puri","Madurai","Trivandrum","Chennai"], "Madurai"),
    new Question("The Komark Temple is dedicated to which Hindu God?", ["Vishnu","Shiva","Krishna","Sun"], "Sun"),
    new Question("The festival of Nabanna is celebrated predominatly in", ["Andhra Pradesh","Rajasthan","Orissa","Kamataka"], "Orissa")
];


var quiz = new Quiz(questions);
play();