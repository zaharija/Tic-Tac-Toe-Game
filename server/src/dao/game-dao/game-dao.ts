import { Game } from '../../entity/Game'

export const getGame = async (object: object) => {
  try {
    return await Game.findOne(object)
  }
  catch (e) {
    throw e
  }
}

export const postGame = async (game: object) => {
  try {
    return await Game.create(game).save()
  }
  catch (e) {
    throw e
  }
}

export const putGame = async (id: number, game: Game) => {
  try {
    return await Game.update(id, game)
  }
  catch (e) {
    throw e
  }
}

export const deleteGame = async (id: number) => {
  try {
    await Game.delete(id)
    return true
  }
  catch (e) {
    throw e
  }
}
