const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionTag = document.getElementById('question');
const answersContainer = document.getElementById('answer-btns')
const answerBtns = document.querySelectorAll(".answer");

startBtn.addEventListener('click', startGame);
let shuffledQuestions, totalScore, valuePerQuestion, index;

nextBtn.addEventListener('click', () => {
    index++;
    setNextQuestion()
})


function startGame() {
    totalScore = 0;
    valuePerQuestion = +(100 / questions.length).toFixed(2);
    startBtn.classList.add("hide")
    questionTag.classList.remove('hide')
    answersContainer.classList.remove('result')
    questionContainer.classList.remove("hide")
    nextBtn.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    index = 0;
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[index])
}

function selectAnswer(event) {
    const target = event.target;
    if(target.hasAttribute('data-correct')) {
        totalScore += valuePerQuestion;
        target.style.backgroundColor = 'green'
    } else {
        target.style.backgroundColor = 'red'
    }

    if(questions.length > index + 1) {
        answersContainer.classList.add('block')
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Reset'
        startBtn.classList.remove('hide')
        questionTag.classList.add('hide')
        answersContainer.classList.add('result')
        answersContainer.innerHTML = `
        <h2>Your score: ${totalScore}%</h2>
        <progress max=${100} value=${totalScore}>
        `
    }
}

function showQuestion(question) {
    questionTag.textContent = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.answer;
        button.classList.add('btn')
        if(answer.isCorrect) {
            button.setAttribute('data-correct', true)
        }
        answersContainer.appendChild(button);
        button.addEventListener('click', selectAnswer);
    })
}

function resetState() {
    nextBtn.classList.add('hide')
    answersContainer.classList.remove('block')
    if (answersContainer.firstChild) {
        answersContainer.innerHTML = ''
    }
}

const questions = [
    {
        "question": "Який тег використовується для організації блокових елементів на веб-сторінці?",
        "answers": [
            {"answer": "a", "isCorrect": false},
            {"answer": "div", "isCorrect": true},
            {"answer": "img", "isCorrect": false},
            {"answer": "p", "isCorrect": false}
        ]
    },
    {
        "question": "Який тег використовується для створення гіперпосилань?",
        "answers": [
          {"answer": "a", "isCorrect": true},
          {"answer": "div", "isCorrect": false},
          {"answer": "span", "isCorrect": false},
          {"answer": "p", "isCorrect": false}
        ]
      },
      {
        "question": "Який тег використовується для зображення на веб-сторінці?",
        "answers": [
          {"answer": "a", "isCorrect": false},
          {"answer": "div", "isCorrect": false},
          {"answer": "img", "isCorrect": true},
          {"answer": "p", "isCorrect": false}
        ]
      },
      {
        "question": "Який тег використовується для групування елементів в рядок?",
        "answers": [
          {"answer": "a", "isCorrect": false},
          {"answer": "div", "isCorrect": false},
          {"answer": "span", "isCorrect": true},
          {"answer": "p", "isCorrect": false}
        ]
      },
      {
        "question": "Який тег використовується для відображення текстового вмісту на веб-сторінці?",
        "answers": [
          {"answer": "a", "isCorrect": false},
          {"answer": "div", "isCorrect": false},
          {"answer": "span", "isCorrect": false},
          {"answer": "p", "isCorrect": true}
        ]
      }
]