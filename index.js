
var SCORE = 'previous-score'

var score = localStorage.getItem(SCORE)

var SECONDS_PER_QUESTION = 30

var quizDiv = document.getElementById('quiz')

var startQuizButton = document.createElement("button")

var previousScoreText = document.createElement("p")

var totalQuestions = 0

var totalQuestionsCorrect = 0

var intervalTimerId

var questionNumber = 0

var timeRemaining

var questionText

var optionsDiv


function initStartQuizButton() {
    startQuizButton.textContent = 'Start Quiz!'
    startQuizButton.id = "start-quiz"
    quizDiv.appendChild(startQuizButton)
}

function hideStartQuizButton() {
    startQuizButton.style.display = 'none'
}

function showStartQuizButton() {
    startQuizButton.style.display = 'block'
}

function runQuiz() {
    totalQuestionsCorrect = 0
    hideStartQuizButton()
    previousScoreText.style.display = 'none'
    questionText = document.createElement("p")
    quizDiv.appendChild(questionText)
    questionNumber = 0
    showQuestion(questionNumber)
}

function showNextQuestion(){
    questionNumber++
    optionsDiv.remove()
    timeRemaining.remove()
    showQuestion(questionNumber)
}

function showQuestion(questionNumber) {

    totalQuestions = questionsArr.length
    if (questionNumber >= totalQuestions) {
        let x = Math.round((totalQuestionsCorrect/totalQuestions)*100)
        localStorage.setItem(SCORE, x)
        questionText.remove()
        previousScoreText.innerText = "Previous Score: " + x + "%"
        previousScoreText.style.display = 'block'
        showStartQuizButton()
    } else {
        var i = questionNumber

        var question = questionsArr[i].question
        var answer = questionsArr[i].answer
        var options = questionsArr[i].options
    
        questionText.innerText = question

        optionsDiv = document.createElement('div')
        quizDiv.appendChild(optionsDiv)

        totalChoices = options.length
        for (let index = 0; index < totalChoices; index++) {
            let optionString = options[index]
            let optionButton = document.createElement("button");
            optionsDiv.appendChild(optionButton)
            optionButton.textContent = optionString
            optionButton.onclick = function() {checkAnswer(optionString, answer)}
        }  
        
        timeRemaining = document.createElement("p")
        timeRemaining.innerText = SECONDS_PER_QUESTION
        quizDiv.appendChild(timeRemaining)
        intervalTimerId = setInterval(function() {
            var seconds = Number(timeRemaining.innerText) - 1
            if (seconds === -1) {
                clearInterval(intervalTimerId)
                showNextQuestion()
            } else {
                timeRemaining.innerText = seconds
            }
        }, 1000)
    }
}

function checkAnswer(choice, answer) {
    if (choice === answer) {
        totalQuestionsCorrect++
    }
    clearInterval(intervalTimerId)
    showNextQuestion()
}

function checkPreviousScore() {
    if (score) {
        previousScoreText.innerText = "Previous Score: " + score + "%"
        quizDiv.appendChild(previousScoreText)
    } 
}

checkPreviousScore()
initStartQuizButton()

startQuizButton.onclick = runQuiz



var questionsArr = [
{
    question: 'How many times can a hummingbird flap its wings per second?',
    answer: '80',
    options: [
    '20',
    '50',
    '80',
    '100',
    ]
},
{
    question: 'Which breed of cat is most often female?',
    answer: 'Calico',
    options: [
    'Ragdoll',
    'Calico',
    'American Shorthair',
    'Siamese',
    ]
},
{
    question: 'What is a female elephant called?',
    answer: 'A cow',
    options: [
    'A bull',
    'A calf',
    'A jill',
    'A cow',
    ]
},
{
    question: 'Which of the following is a poisonus snake?',
    answer: 'None of the options',
    options: [
    'Black racer',
    'Burmese python',
    'Tiger snake',
    'None of the options',
    ]
},
{
    question: 'Which has the thickest fur of any mammal?',
    answer: 'Sea otter',
    options: [
    'Black bear',
    'Sea otter',
    'Arctic fox',
    'Water buffalo',
    ]
},
]