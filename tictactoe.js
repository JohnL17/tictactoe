function shout(str) {
  if (!str || !str.toUpperCase) {
    return null
  }
  return str.toUpperCase()
}

function sayHello(person) {
  return 'Hello ' + person + '!'
}

function shoutHello(person) {
  return shout(sayHello(person))
}

function removeDuplicates(arr) {
  var result = []
  arr.forEach(element => {
    if (!result.includes(element)) {
      result.push(element)
    }
  })
  return result
}

function allTheSame(arr) {
  return removeDuplicates(arr).length < 2
}

/**
 * Searches for winner in rows
 *
 * @return "x", "o" or null
 */
function rowWinner(arr) {
  var winner = arr.find(row => row[0] !== null && allTheSame(row))
  if (winner) {
    return winner[0]
  }
}

/**
 * Searches for winner in columns
 *
 * @return function rowWinner with parameter columnArray which returns
 * "x", "o" or null
 */
function columnWinner(arr) {
  // use rowWinner function with different argument?
  var columnArray = [
    [arr[0][0], arr[1][0], arr[2][0]],
    [arr[0][1], arr[1][1], arr[2][1]],
    [arr[0][2], arr[1][2], arr[2][2]]
  ]
  return rowWinner(columnArray)
}

/**
 * Searches for winner in diagonals
 *
 * @return "x", "o" or null
 */
function diagonalWinner(arr) {
  var diagonalLeftArray = [arr[0][0], arr[1][1], arr[2][2]]
  var diagonalRightArray = [arr[0][2], arr[1][1], arr[2][0]]
  if (allTheSame(diagonalLeftArray)) {
    return diagonalLeftArray[0]
  } else if (allTheSame(diagonalRightArray)) {
    return diagonalRightArray[0]
  }
  return null
}

function winner(arr) {
  return rowWinner(arr) || columnWinner(arr) || diagonalWinner(arr) || null
}

module.exports = {
  shout,
  sayHello,
  shoutHello,
  removeDuplicates,
  allTheSame,
  winner,
  rowWinner,
  columnWinner,
  diagonalWinner
}
