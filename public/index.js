let fieldArray = [[null, null, null], [null, null, null], [null, null, null]]
const turn = document.getElementsByClassName('turn')

const socket = io()
socket.on('new state', (newState, socketId) => {
  render(newState)
  if (socket.id === socketId) {
    turn[0].innerHTML = "It's not your turn"
  } else {
    turn[0].innerHTML = "It's your turn"
  }
})

socket.on('winner', winner => {
  showWinner(winner)
  playAgain()
})

socket.on('waiting for players', player => {
  if (socket.id === player) {
    turn[0].innerHTML =
      'Welcome to Tic Tac Toe. Please wait until all players are connected'
  }
})

socket.on('ready', (playerOne, playerTwo, state) => {
  render(state)
  if (socket.id === playerOne) {
    turn[0].innerHTML = 'All players are connected. You can start'
  } else if (socket.id === playerTwo) {
    turn[0].innerHTML = 'All players are connected. Wait on your turn'
  } else {
    turn[0].innerHTML =
      'The room is already full. You can watch the game, though.'
  }
})

function render(arr) {
  const rows = document.getElementsByTagName('tr')
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rows.item(i).children.item(j).textContent = arr[i][j]
    }
  }
}

function showWinner(player) {
  const result = document.getElementsByClassName('result')
  result[0].innerHTML = player + ' wins!'
}

function playAgain() {
  fieldArray = [[null, null, null], [null, null, null], [null, null, null]]
  render(fieldArray)
}

function cellClicked() {
  const row = parseInt(this.parentNode.getAttribute('data-row'))
  const col = parseInt(this.getAttribute('data-col'))

  socket.emit('clicked', row, col)

  console.log('clicked cell ' + col + ' in row ' + row)
}

document.addEventListener('DOMContentLoaded', () => {
  const cell = document.querySelectorAll('#table td')
  cell.forEach(e => e.addEventListener('click', cellClicked, false))
})
