const turn = document.getElementsByClassName('turn')
const result = document.getElementsByClassName('result')
let socket

function waitingForPlayers() {
  turn[0].innerHTML =
    'Welcome to Tic Tac Toe. Please wait until all players are connected'
}

function newState(playerOne, playerTwo, lastPlayer, newState) {
  render(newState)

  if (isEmpty(newState) && socket && socket.id === playerOne) {
    turn[0].innerHTML = 'All players are connected. It is your turn'
  } else if (isEmpty(newState) && socket && socket.id === playerTwo) {
    turn[0].innerHTML = 'All players are connected. Wait on your turn'
  } else if (socket.id === lastPlayer) {
    turn[0].innerHTML = "It's not your turn"
  } else if (socket.id !== lastPlayer) {
    turn[0].innerHTML = "It's your turn"
  }

  if (!(socket.id === playerOne) && !(socket.id === playerTwo)) {
    turn[0].innerHTML =
      'The room is already full. You can watch the game, though.'
  }
}

function winner(winner, playerOne, playerTwo, newState) {
  const cell = document.querySelectorAll('#table td')
  cell.forEach(e => e.removeEventListener('click', cellClicked, false))
  render(newState)
  showWinner(winner)
  if (socket.id === playerOne || socket.id === playerTwo) {
    playAgain()
  }
}

function playerConfirmed(playerOne, playerTwo) {
  if (socket.id === playerOne || socket.id === playerTwo) {
    turn[0].innerHTML =
      'The other player wants to play again. Please click on "play again" to confirm'
  }
}

function setupSocket() {
  socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling', 'flashsocket']
  })

  socket.on('waiting for players', waitingForPlayers)

  socket.on('new state', newState)

  socket.on('winner', winner)

  socket.on('player confirmed', playerConfirmed)
}

// functions

function isEmpty(arr) {
  return !arr.find(row => {
    return row.find(cell => cell !== null)
  })
}

function render(arr) {
  const rows = document.getElementsByTagName('tr')
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      rows.item(i).children.item(j).textContent = arr[i][j]
    }
  }
  return arr
}

function showWinner(player) {
  const result = document.getElementsByClassName('result')
  result[0].innerHTML = player + ' wins!'
}

function cellClicked() {
  const row = parseInt(this.parentNode.getAttribute('data-row'))
  const col = parseInt(this.getAttribute('data-col'))

  socket.emit('clicked', row, col)

  console.log('clicked cell ' + col + ' in row ' + row)
}

function playAgain() {
  const button = document.getElementsByClassName('restart')[0]
  const cell = document.querySelectorAll('#table td')
  turn[0].innerHTML = ''
  button.hidden = false
  button.addEventListener(
    'click',
    () => {
      socket.emit('play again')
      button.hidden = true
      turn[0].innerHTML = 'Please wait for the other player'
      result[0].innerHTML = ''
      cell.forEach(e => e.addEventListener('click', cellClicked, false))
    },
    { once: true }
  )
}

document.addEventListener('DOMContentLoaded', () => {
  setupSocket()
  const cell = document.querySelectorAll('#table td')
  cell.forEach(e => e.addEventListener('click', cellClicked, false))
})

/* eslint-disable no-undef */
/*istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    waitingForPlayers,
    newState,
    winner,
    playerConfirmed,
    setupSocket,
    isEmpty,
    render,
    showWinner,
    cellClicked,
    playAgain
  }
}
/* eslint-enable no-undef */
