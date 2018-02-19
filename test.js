const test = require('tape')
const tictactoe = require('./tictactoe')
const index = require('./index')

const removeDuplicates = tictactoe.removeDuplicates
const allTheSame = tictactoe.allTheSame
const winner = tictactoe.winner
const rowWinner = tictactoe.rowWinner
const columnWinner = tictactoe.columnWinner
const diagonalWinner = tictactoe.diagonalWinner
const togglePlayer = index.togglePlayer
const emptyField = index.emptyField

test('removeDuplicates removes all duplicates from an array', t => {
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

test('allTheSame checks if all elements in array are the same', t => {
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

test('checks rows, returns who wins the game', t => {
  t.equal(rowWinner([['o', 'x', 'o'], ['x', 'x', 'x'], [null, null, 'o']]), 'x')
  t.end()
})

test('checks columns, returns who wins the game', t => {
  t.equal(
    columnWinner([['x', 'o', 'o'], ['x', 'o', 'x'], ['o', 'o', 'x']]),
    'o'
  )
  t.end()
})

test('checks diagonal, returns who wins the game', t => {
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

test('returns who wins the game, if no one wins it returns null', t => {
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

test('if player is x, it returns o', t => {
  t.equal(togglePlayer('x'), 'o')
  t.equal(togglePlayer('o'), 'x')
  t.end()
})

test('returns the blank playing field', t => {
  t.equal(emptyField(), [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ])
  t.end()
})
