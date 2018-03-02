// const emptyField = [[null, null, null], [null, null, null], [null, null, null]]
const turn = document.getElementsByClassName('turn')
const result = document.getElementsByClassName('result')
const socket = io()

socket.on('waiting for players', () => {
  turn[0].innerHTML =
    'Welcome to Tic Tac Toe. Please wait until all players are connected'
})

socket.on('new state', (playerOne, playerTwo, lastPlayer, newState) => {
  render(newState)

  if (isEmpty(newState)) {
    if (socket.id === playerOne) {
      turn[0].innerHTML = 'All players are connected. It is your turn'
    } else if (socket.id === playerTwo) {
      turn[0].innerHTML = 'All players are connected. Wait on your turn'
    } else {
      turn[0].innerHTML =
        'The room is already full. You can watch the game, though.'
    }
    console.log('game just started!')
  } else {
    if (socket.id === lastPlayer) {
      turn[0].innerHTML = "It's not your turn"
    } else {
      turn[0].innerHTML = "It's your turn"
    }
  }
  if (!(socket.id === playerOne) && !(socket.id === playerTwo)) {
    turn[0].innerHTML =
      'The room is already full. You can watch the game, though.'
  }
})

socket.on('winner', (winner, playerOne, playerTwo, newState) => {
  render(newState)
  showWinner(winner)
  if (socket.id === playerOne || socket.id === playerTwo) {
    const button = document.getElementsByClassName('restart')[0]
    turn[0].innerHTML = ''
    button.hidden = false
    button.addEventListener('click', () => {
      socket.emit('play again')
    })
  }
})

socket.on('player confirmed', (playerOne, playerTwo) => {
  if (socket.id === playerOne || socket.id === playerTwo) {
    turn[0].innerHTML =
      'The other player wants to play again. Please click on "play again" to confirm'
    result[0].innerHTML = ''
  }
})

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

/*
 *function playAgain() {
 * return render(emptyField)
 *}
 */

/*
 *function resetGame() {
 *const result = document.getElementsByClassName('result')
 *result[0].innerHTML = ''
 *}
 */

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
