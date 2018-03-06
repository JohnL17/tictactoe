const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const tictactoe = require('./tictactoe')

app.use(express.static('public'))

let player = 'x'
let lastPlayer = ''
let fieldArray = tictactoe.emptyField()
const players = []
const confirmed_players = []

/*
 * creates connection with socket and pushes players socket.id in
 * players array
 */
io.on('connection', socket => {
  players.push(socket.id)
  console.log('a user connected')
  console.log(players)

  /*
   * if two players are connected, the game will start. Otherwise
   * the game waits until the second player has connected
   */
  if (players.length >= 2) {
    io.emit('new state', players[0], players[1], socket.id, fieldArray)
  } else {
    io.emit('waiting for players')
  }

  /*
   * when a player clicks on a cell the game checks if it's this
   * players turn and the cell isn't already taken.
   * If another player connects to the game enters in watch-mode
   */
  socket.on('clicked', (row, col) => {
    if (lastPlayer === socket.id) {
      console.log('it is not your turn!')
      return
    }
    if (fieldArray[row][col] !== null) {
      console.log('this field is already taken!')
      return
    }
    if (!(socket.id === players[0]) && !(socket.id === players[1])) {
      console.log('The room is already full. You can watch the game, though')
      return
    }
    lastPlayer = socket.id
    fieldArray[row][col] = player
    player = tictactoe.togglePlayer(player)

    /*
     * If a player wins the game will show a notification and the button "play
     * again" will show up
     */
    const winningPlayer = tictactoe.winner(fieldArray)
    if (winningPlayer) {
      io.emit('winner', winningPlayer, players[0], players[1], fieldArray)
      tictactoe.swapArrayElements(players, 0, 1)
    }
    io.emit('new state', players[0], players[1], socket.id, fieldArray)
  })

  /*
   * Restarts the game if both player click on the "play again" button
   */
  socket.on('play again', () => {
    socket.broadcast.emit('player confirmed', players[0], players[1])
    if (
      socket.id === confirmed_players[0] ||
      socket.id === confirmed_players[1]
    ) {
      return
    }
    confirmed_players.push(socket.id)
    if (confirmed_players.length === 2) {
      fieldArray = tictactoe.emptyField()
      io.emit('new state', players[0], players[1], socket.id, fieldArray)
      confirmed_players.length = 0
    }
  })

  socket.on('disconnect', () => {
    console.log('disconnect: ', socket.id)
    const index = players.indexOf(socket.id)
    if (index > -1) {
      players.splice(index, 1)
    }
    console.log(players)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
