// อ้างอิงตัวแปร
const startButton = document.getElementById('start');
const gameSection = document.getElementById('gameSection');
const scoreElement = document.getElementById('score');
const startresetButton = document.getElementById('start-reset');
const checkboxes = document.querySelectorAll('input[name="operator"]');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');

let score = 0;
let correctAnswer = 0;
let operator = null;

function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function generateQuestion() {
  const num1 = generateRandomNumber();
  const num2 = generateRandomNumber();

  switch (operator) {
    case '+':
      return { question: `คำถาม: ${num1} + ${num2} = ?`, answer: num1 + num2 };
    case '-':
      return { question: `คำถาม: ${num1} - ${num2} = ?`, answer: num1 - num2 };
    case '*':
      return { question: `คำถาม: ${num1} * ${num2} = ?`, answer: num1 * num2 };
    case '/':
      return { question: `คำถาม: ${num1 * num2} / ${num2} = ?`, answer: num1 };
    default:
      return { question: '', answer: 0 };
  }
}

function updateScore() {
  scoreElement.textContent = score;
}

function checkAnswer(userAnswer) {
  return parseFloat(userAnswer) === correctAnswer;
}

startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  gameSection.style.display = 'block';
});

startresetButton.addEventListener('click', () => {
  operator = getSelectedOperator();
  generateNewQuestion();
  answerElement.value = '';
});

submitButton.addEventListener('click', () => {
    const userAnswer = answerElement.value;
  
    if (checkAnswer(userAnswer)) {
      resultElement.textContent = 'คำตอบถูกต้อง!';
      score += 1;
    } else {
      resultElement.textContent = 'คำตอบผิด!';
    }
    generateNewQuestion(); 
    updateScore(); 
    answerElement.value = ''; 
    
  });

function getSelectedOperator() {
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      return checkbox.value;
    }
  }
  return null;
}

function generateNewQuestion() {
  operator = getSelectedOperator();
  const { question, answer } = generateQuestion();
  questionElement.textContent = question;
  correctAnswer = answer;

}

checkboxes.forEach(item => {
    item.addEventListener('change', event => {
        if (event.target.checked) {
            for (const checkbox of checkboxes) {
                checkbox.checked = false;
            }
            event.target.checked = true;
        } else {
            event.target.checked = false;
        }
    })
});


generateNewQuestion();
