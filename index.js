const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const tictactoe = require('./tictactoe')

app.use(express.static('public'))

let player = 'x'
const fieldArray = tictactoe.emptyField()
let lastPlayer = ''
const players = []

io.on('connection', socket => {
  players.push(socket.id)
  console.log('a user connected')
  console.log(players)

  if (players.length >= 2) {
    io.emit('ready', players[0], players[1], fieldArray)
  } else {
    io.emit('waiting for players', socket.id)
  }

  socket.on('clicked', (row, col) => {
    if (lastPlayer === socket.id) {
      console.log('it is not your turn!')
      return
    }
    if (fieldArray[row][col] !== null) {
      console.log('this field is already taken!')
      return
    }
    lastPlayer = socket.id
    fieldArray[row][col] = player
    player = tictactoe.togglePlayer(player)

    const winningPlayer = tictactoe.winner(fieldArray)
    if (winningPlayer) {
      io.emit('winner', winningPlayer)
    }
    io.emit('new state', fieldArray, socket.id)
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
