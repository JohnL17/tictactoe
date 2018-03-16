const test = require('tape')
const JSDOM = require('jsdom').JSDOM
const fs = require('fs')
const html = fs.readFileSync(__dirname + '/../../public/index.html', 'utf8')
const { SocketIO, Server } = require('mock-socket')

const { window: { document } } = new JSDOM(html)

const mockServer = new Server('http://localhost:3000')

global.io = host => {
  const sock = SocketIO(host)

  sock.id = 'test'

  return sock
}

global.document = document

const { setupSocket } = require('../../public/index.js')

setupSocket()

test('test welcome message on waiting for players', t => {
  mockServer.emit('waiting for players')

  t.equal(
    document.querySelector('.turn').innerHTML,
    'Welcome to Tic Tac Toe. Please wait until all players are connected'
  )

  t.end()
})

test('connecting message for player one on new state', t => {
  mockServer.emit('new state', 'test', 'notest', 'notest', [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ])

  t.equal(
    document.querySelector('.turn').innerHTML,
    'All players are connected. It is your turn'
  )

  t.end()
})

test('connecting message for player two on new state', t => {
  mockServer.emit('new state', 'notest', 'test', 'notest', [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ])

  t.equal(
    document.querySelector('.turn').innerHTML,
    'All players are connected. Wait on your turn'
  )

  t.end()
})

test('message it is not your turn', t => {
  mockServer.emit('new state', 'test', 'notest', 'test', [
    ['x', null, null],
    [null, null, null],
    [null, null, null]
  ])

  t.equal(document.querySelector('.turn').innerHTML, "It's not your turn")

  t.end()
})

test('message it is your turn', t => {
  mockServer.emit('new state', 'test', 'notest', 'notest', [
    ['x', null, null],
    [null, null, null],
    [null, null, null]
  ])

  t.equal(document.querySelector('.turn').innerHTML, "It's your turn")

  t.end()
})

test('message if room is full', t => {
  mockServer.emit('new state', 'notest', 'notest', 'notest', [
    ['x', null, null],
    [null, null, null],
    [null, null, null]
  ])

  t.equal(
    document.querySelector('.turn').innerHTML,
    'The room is already full. You can watch the game, though.'
  )

  t.end()
})

test('message if room is full', t => {
  mockServer.emit('new state', 'notest', 'notest', 'notest', [
    ['x', null, null],
    [null, null, null],
    [null, null, null]
  ])

  t.equal(
    document.querySelector('.turn').innerHTML,
    'The room is already full. You can watch the game, though.'
  )

  t.end()
})

test('show winner if player x wins', t => {
  mockServer.emit('winner', 'x', 'notest', 'notest', [
    ['x', 'x', 'x'],
    ['o', 'o', null],
    ['o', null, null]
  ])

  t.equal(document.querySelector('.result').innerHTML, 'x wins!')
  t.end()
})

test('show winner if player o wins', t => {
  mockServer.emit('winner', 'o', 'notest', 'notest', [
    ['x', 'x', 'x'],
    ['o', 'o', null],
    ['o', null, null]
  ])

  t.equal(document.querySelector('.result').innerHTML, 'o wins!')
  t.end()
})

test('remove turn message when play again', t => {
  mockServer.emit('winner', 'o', 'test', 'notest', [
    ['x', 'x', 'x'],
    ['o', 'o', null],
    ['o', null, null]
  ])

  t.equal(document.querySelector('.turn').innerHTML, '')
  t.end()
})

test('uncover the play again button', t => {
  mockServer.emit('winner', 'o', 'test', 'notest', [
    ['x', 'x', 'x'],
    ['o', 'o', null],
    ['o', null, null]
  ])

  t.equal(document.querySelector('.restart').innerHTML, 'play again')
  t.end()
})

test('hide play again button when it is clicked', t => {
  mockServer.emit('winner', 'o', 'test', 'notest', [
    ['x', 'x', 'x'],
    ['o', 'o', null],
    ['o', null, null]
  ])

  document.querySelector('.restart').click()

  t.equal(document.querySelector('.restart').hidden, true)
  t.end()
})

test('show please wait message when other player clicked on play again', t => {
  mockServer.emit('winner', 'o', 'test', 'notest', [
    ['x', 'x', 'x'],
    ['o', 'o', null],
    ['o', null, null]
  ])

  document.querySelector('.restart').click()

  t.equal(
    document.querySelector('.turn').innerHTML,
    'Please wait for the other player'
  )
  t.end()
})

test('hide result text  when other player clicked on play again', t => {
  mockServer.emit('winner', 'o', 'test', 'notest', [
    ['x', 'x', 'x'],
    ['o', 'o', null],
    ['o', null, null]
  ])

  document.querySelector('.restart').click()

  t.equal(
    document.querySelector('.turn').innerHTML,
    'Please wait for the other player'
  )
  t.end()
})

test('show message other player wants to play again', t => {
  mockServer.emit('player confirmed', 'test', 'notest')

  t.equal(
    document.querySelector('.turn').innerHTML,
    'The other player wants to play again. Please click on "play again" to confirm'
  )
  t.end()
})
