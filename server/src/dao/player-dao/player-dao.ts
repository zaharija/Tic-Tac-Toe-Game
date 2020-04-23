import { Player } from '../../entity/Player'

export const getPlayer = async (object: object) => {
  try {
    return await Player.findOne(object)
  }
  catch (e) {
    throw e
  }
}

export const postPlayer = async (player: object) => {
  try {
    return await Player.create(player).save()
  }
  catch (e) {
    throw e
  }
}

export const putPlayer = async (id: number, player: Player) => {
  try {
    return await Player.update(id, player)
  }
  catch (e) {
    throw e
  }
}

export const deletePlayer = async (id: number) => {
  try {
    await Player.delete(id)
    return true
  }
  catch (e) {
    throw e
  }
}
