// This file manages the quiz functionality, including loading quiz data, handling user interactions, and calculating scores.

const quizContainer = document.getElementById('quiz-container');
let currentQuestionIndex = 0;
let score = 0;
let quizData = [];

// Function to load quiz data from JSON
async function loadQuizData() {
    const response = await fetch('./assets/data/quizzes.json');
    quizData = await response.json();
    displayQuestion();
}

// Function to display the current question
function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.answers.map((answer, index) => `
                <li>
                    <button onclick="selectAnswer(${index})">${answer}</button>
                </li>
            `).join('')}
        </ul>
    `;
}

// Function to handle answer selection
function selectAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Function to display the final score
function showResults() {
    quizContainer.innerHTML = `
        <h2>Your Score: ${score} out of ${quizData.length}</h2>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

// Initialize the quiz
loadQuizData();