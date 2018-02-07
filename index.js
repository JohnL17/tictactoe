var tictactoe = require('./tictactoe')

var player = 'x'
var fieldArray = [[null, null, null], [null, null, null], [null, null, null]]
var turn = document.getElementsByClassName('turn')

function render(arr) {
  let rows = document.getElementsByTagName('tr')
  let cols = document.getElementsByTagName('td')
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rows.item(i).children.item(j).textContent = arr[i][j]
    }
  }
}

function showWinner() {
  var result = document.getElementsByClassName('result')
  result[0].innerHTML = tictactoe.winner(fieldArray) + ' wins!'
}

function playAgain(array) {
  render(fieldArray)
}

function playersTurn() {
  if (player === 'x') {
    player = 'o'
    turn[0].innerHTML = "It's your turn, player 2"
  } else if (player === 'o') {
    player = 'x'
    turn[0].innerHTML = "It's your turn, player 1"
  }
}

function cellClicked() {
  var row = parseInt(this.parentNode.getAttribute('data-row'))
  var col = parseInt(this.getAttribute('data-col'))
  if (fieldArray[row][col] === null) {
    fieldArray[row][col] = player
    playersTurn()
  }

  render(fieldArray)
  var winner = tictactoe.winner(fieldArray)

  if (winner) {
    showWinner()
    var answer = confirm('Do you wanna play again?')
    if (answer) {
      fieldArray = [[null, null, null], [null, null, null], [null, null, null]]
      playAgain(fieldArray)
    }
  }

  console.log('clicked cell ' + col + ' in row ' + row)
}

document.addEventListener('DOMContentLoaded', () => {
  turn[0].innerHTML = "It's your turn, player 1"
  let cell = document.querySelectorAll('#table td')
  cell.forEach(e => e.addEventListener('click', cellClicked, false))
})
