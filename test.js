var test = require('tape')
var tictactoe = require('./tictactoe')

var shout = tictactoe.shout
var sayHello = tictactoe.sayHello
var shoutHello = tictactoe.shoutHello
var removeDuplicates = tictactoe.removeDuplicates
var allTheSame = tictactoe.allTheSame
var winner = tictactoe.winner
var rowWinner = tictactoe.rowWinner
var columnWinner = tictactoe.columnWinner
var diagonalWinner = tictactoe.diagonalWinner

test('shout turns any string into UPPERCASE', function(t) {
  t.equals(shout('hello'), 'HELLO', 'it should shout HELLO')
  t.equals(shout(), null, 'if no string is given, it should return null')
  t.equals(shout(6), null, 'if no string is given, it should return null')
  t.end()
})

test('sayHello should say hello the any given person', function(t) {
  t.equals(sayHello('powercoders'), 'Hello powercoders!')
  t.equals(sayHello('World'), 'Hello World!')
  t.end()
})

test('shoutHello should shout the greeting', function(t) {
  t.equals(shoutHello('powercoders'), 'HELLO POWERCODERS!')
  t.equals(shoutHello('World'), 'HELLO WORLD!')
  t.end()
})

test('removeDuplicates removes all duplicates from an array', function(t) {
  t.deepEquals(removeDuplicates([1, 2, 3]), [1, 2, 3])
  t.deepEquals(removeDuplicates([1, 1, '1']), [1, '1'], 'data types matter')
  t.deepEquals(removeDuplicates([0, 'a', null, undefined, 'a', null]), [
    0,
    'a',
    null,
    undefined
  ])
  t.deepEquals(removeDuplicates([]), [])
  t.end()
})

test('allTheSame checks if all elements in array are the same', function(t) {
  t.equal(allTheSame([1, 1, 1]), true)
  t.equal(allTheSame([2, 2, '2']), false, 'data types matter')
  t.equal(
    allTheSame([null, undefined]),
    false,
    'null and undefined are not the same thing'
  )
  t.equal(allTheSame([]), true, 'returns true for an empty array')
  t.end()
})

test('checks rows, returns who wins the game', function(t) {
  t.equal(rowWinner([['o', 'x', 'o'], ['x', 'x', 'x'], [null, null, 'o']]), 'x')
  t.end()
})

test('checks columns, returns who wins the game', function(t) {
  t.equal(
    columnWinner([['x', 'o', 'o'], ['x', 'o', 'x'], ['o', 'o', 'x']]),
    'o'
  )
  t.end()
})

test('checks diagonal, returns who wins the game', function(t) {
  t.equal(
    diagonalWinner([['x', 'o', 'o'], ['x', 'x', 'o'], ['o', 'o', 'x']]),
    'x'
  )
  t.equal(
    diagonalWinner([['x', 'x', 'o'], ['x', 'o', 'x'], ['o', 'o', 'x']]),
    'o'
  )
  t.end()
})

test('returns who wins the game, if no one wins it returns null', function(t) {
  t.equal(winner([['x', 'x', 'o'], ['o', 'o', 'x'], [null, 'o', 'x']]), null)
  t.equal(winner([['o', 'x', 'o'], ['x', 'x', 'x'], [null, null, 'o']]), 'x')
  t.equal(winner([['x', 'o', 'o'], ['x', 'o', 'x'], ['o', 'o', 'x']]), 'o')
  t.equal(winner([['x', 'o', 'o'], ['x', 'x', 'o'], ['o', 'o', 'x']]), 'x')
  t.equal(winner([['x', 'x', 'o'], ['x', 'o', 'x'], ['o', 'o', 'x']]), 'o')
  t.equal(winner([['x', 'o', 'o'], ['x', 'x', 'o'], ['o', 'x', 'o']]), 'o')
  t.equal(winner([['x', 'o', 'x'], ['o', 'x', 'o'], ['x', 'o', 'x']]), 'x')
  t.equal(
    winner([[null, null, null], [null, null, null], [null, null, null]]),
    null
  )
  t.equal(winner([['x', 'x', 'x'], ['x', 'x', 'x'], ['x', 'x', 'x']]), 'x')
  t.equal(winner([['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']]), 'o')
  t.end()
})
