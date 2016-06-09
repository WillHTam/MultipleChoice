
function numberOfQuestions () {
  return quiz.questions.length
}

function currentQuestion () {
  return quiz.currentQuestion
}

function correctAnswer () {
  return quiz.questions[quiz.currentQuestion].correctChoice
}

function numberOfAnswers () {
  return quiz.questions[quiz.currentQuestion].choices.length
}
function Question (prompt, answers, correctAnswerIndex) {
  this.prompt = prompt
  this.choices = answers
  this.correctChoice = correctAnswerIndex
}

var question1 = new Question('What is the first letter in the name William?', ['W', 'w', 'UU', 'VV'], 0);
var question2 = new Question('Who am I?', ['A Computer', 'Your Lord and Master', 'A Gigantic Cat', 'Sean Connery'], 0);
var question3 = new Question('What is the French word for Mushroom?', ['Pomme de Terre', 'Pamplemousse', 'Dindon', 'Champignon'], 3);
var question4 = new Question('C is the correct answer.', ['A', 'B', 'C', 'D'], 2);


var quiz = {
  currentQuestion: 0,
  questions: [question1, question2, question3, question4],
  isGameOver: false,
  player1Points: 0,
  player2Points: 0
}

function playTurn (choice) {
  if (quiz.isGameOver) {
    return false
  }
  var correct = false
  if (choice === quiz.questions[quiz.currentQuestion].correctChoice) {
    correct = true
    if (quiz.currentQuestion % 2) {
      quiz.player2Points++
    } else {
      quiz.player1Points++
    }
  }
  ++quiz.currentQuestion
  if (quiz.currentQuestion === numberOfQuestions()) {
    quiz.isGameOver = true
  }
  return correct
}

function isGameOver () {
  console.log('isGameOver activated');
  return quiz.isGameOver
  }

function whoWon () {
  console.log('whoWon activated')
  if (!quiz.isGameOver) return 0
  if (quiz.player1Points > quiz.player2Points) return 1
  if (quiz.player1Points < quiz.player2Points) return 2
  else return 3
}

function restart () {
  console.log('restart activated')
  quiz.currentQuestion = 0
  quiz.isGameOver = false
  quiz.player1Points = 0
  quiz.player2Points = 0
}

function updateDisplay () {
  if (whoWon() === 1 || whoWon() === 2 ) {
    $('h1').text('The Winner is ' + whoWon())
  } if (whoWon() ===3 ){
    $('h1').text('DRAW!')
  }
  else {
    $('h1').text(quiz.currentQuestion + ') ' + quiz.questions[quiz.currentQuestion].prompt)
    $('button').eq(0).text(quiz.questions[quiz.currentQuestion].choices[0])
    $('button').eq(1).text(quiz.questions[quiz.currentQuestion].choices[1])
    $('button').eq(2).text(quiz.questions[quiz.currentQuestion].choices[2])
    $('button').eq(3).text(quiz.questions[quiz.currentQuestion].choices[3])
  }
  $('h3').eq(0).text('Player1: ' + quiz.player1Points)
  $('h3').eq(1).text('Player2: ' + quiz.player2Points)
}

$(function () {
  $('button').click(function () {
    if (isGameOver()) {
      restart()
    } else {
      playTurn($(this).index())
    }
    updateDisplay()
  })
  updateDisplay()
})
