import { Player } from '../entity/Player'

import * as bcrypt from 'bcryptjs'

export const createNewPlayer = (name: string, password: string) => {
  return {
    name: name,
    password: bcrypt.hashSync(password, 5),
    token: createToken(name)
  }
}

export const compareHash = (first: string, second: string) => {
  return bcrypt.compareSync(first, second)
}

export const createNewGame = (multiplayer: boolean, password: string, playerOne: Player) => {
  if(password) {
    return {
      multiplayer: multiplayer,
      password: bcrypt.hashSync(password, 5),
      playerOne: playerOne,
      playerOneMoves: "",
      playerTwoMoves: ""
    }
  }
  return {
    multiplayer: multiplayer,
    password: null,
    playerOne: playerOne,
    playerOneMoves: "",
    playerTwoMoves: ""
  }
}

export const createToken = (name: string) => {
  let token = ""
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for ( var i = 0; i < 10; i++ ) {
      token += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return name + token
}
