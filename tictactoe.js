function removeDuplicates(arr) {
  const result = []
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
  const winner = arr.find(row => row[0] !== null && allTheSame(row))
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
  const columnArray = [
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
  const diagonalLeftArray = [arr[0][0], arr[1][1], arr[2][2]]
  const diagonalRightArray = [arr[0][2], arr[1][1], arr[2][0]]
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

function togglePlayer(player) {
  return player === 'x' ? 'o' : 'x'
}

function swapArrayElements(arr, indexA, indexB) {
  const temp = arr[indexA]
  arr[indexA] = arr[indexB]
  arr[indexB] = temp
  return arr
}

function emptyField() {
  return [[null, null, null], [null, null, null], [null, null, null]]
}

module.exports = {
  removeDuplicates,
  allTheSame,
  winner,
  rowWinner,
  columnWinner,
  diagonalWinner,
  togglePlayer,
  emptyField,
  swapArrayElements
}
