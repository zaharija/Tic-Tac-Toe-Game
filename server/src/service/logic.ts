import { Game } from '../entity/Game'

export const returnWinner = (game: Game) => {
  const p1 = game.playerOneMoves
  const p2 = game.playerTwoMoves
  const all = p1 + p2
  if(p1.length >= 3) {
    if(checkPlayer(p1)) {
      game.winner = 'playerOne'
      return game
    }
  }

  if(p2.length >= 3) {
    if(checkPlayer(p2)) {
      game.winner = 'playerTwo'
      return game
    }
  }

  if(checkBoard(all)) {
    game.winner = 'tie'
    return game
  }

  return game
}

export const aiMove = (game: Game) => {
  const p1 = game.playerOneMoves
  const p2 = game.playerTwoMoves
  const all = p1 + p2
  const possible = checkMove(all)
  for(let i = 1; i < 10; i++) {
    let p1Flag = p1 + i
    let p2Flag = p2 + i
    if(checkPlayer(p2Flag) && possible.includes(''+i)) {
      game.playerTwoMoves += i
      return game
    }
    if(checkPlayer(p1Flag) && possible.includes(''+i)) {
      game.playerTwoMoves += i
      return game
    }
  }
  game.playerTwoMoves += possible[Math.floor(Math.random() * possible.length)]
  return game
}

export const checkDuplicates = (game: Game, move: string) => {
  const all = game.playerOneMoves + game.playerTwoMoves
  if(all.includes(move)) {
    return true
  }
  return false
}

const checkPlayer = (p => {
  if(p.indexOf('1') != -1 && p.indexOf('2') != -1 && p.indexOf('3') != -1) {
    return true
  }
  if(p.indexOf('1') != -1 && p.indexOf('4') != -1 && p.indexOf('7') != -1) {
    return true
  }
  if(p.indexOf('1') != -1 && p.indexOf('5') != -1 && p.indexOf('9') != -1) {
    return true
  }
  if(p.indexOf('9') != -1 && p.indexOf('6') != -1 && p.indexOf('3') != -1) {
    return true
  }
  if(p.indexOf('9') != -1 && p.indexOf('8') != -1 && p.indexOf('7') != -1) {
    return true
  }
  if(p.indexOf('3') != -1 && p.indexOf('5') != -1 && p.indexOf('7') != -1) {
    return true
  }
  if(p.indexOf('4') != -1 && p.indexOf('5') != -1 && p.indexOf('6') != -1) {
    return true
  }
  if(p.indexOf('2') != -1 && p.indexOf('5') != -1 && p.indexOf('8') != -1) {
    return true
  }

  return false

})

const checkBoard = (board: string) => {
  let flag = true
  for (let i = 1; i < 10; i++) {
      if(board.indexOf(''+i) != -1) {
        flag = false
      }
  }
  return flag
}

const checkMove = (board) => {
  const possible = []
  for (let i = 1; i < 10; i++) {
      if(board.indexOf(''+i) === -1) {
        possible.push(''+i)
      }
  }
  return possible
}
