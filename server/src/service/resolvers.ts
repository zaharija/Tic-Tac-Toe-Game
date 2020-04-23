import * as dao from '../dao'
import * as helper from './helper'
import * as logic from './logic'
import { PubSub } from 'apollo-server-express'

export const pubsub = new PubSub()

export const resolvers = {
  Query: {
    player: async (perent, { id } ) => {
      const player = await dao.getPlayer({ id: id })
      if(player) {
        return player
      }
      return false
    },
    game: async (perent, { id }) => {
      const game = await dao.getGame({ id: id })
      console.log(game)
      if(game) {
        return game
      }
      return false
    }
  },
  Mutation: {
    register: async (parent, { name, password}) => {
      if(!await dao.getPlayer({ name: name })) {
        await dao.postPlayer(helper.createNewPlayer(name, password))
        return dao.getPlayer({ name: name })
      }
      return false
    },
    login: async (parent, { name, password }) => {
      const player = await dao.getPlayer({ name: name })
      if(player) {
        if(helper.compareHash(password, player.password)) {
          player.token = helper.createToken(name)
          await dao.putPlayer(player.id, player)
          return await dao.getPlayer({ name: name })
        }
        return false
      }
      return false
    },
    logout: async (parent, { token }) => {
      if(token) {
        const player = await dao.getPlayer({ token: token })
        if (player) {
          if(player.inGame) {
            const game = await dao.getGame({ id: player.inGame })
            if(game) {
              if(game.playerOne === player.id) {
                if(game.playerTwo) {
                  const p2 = await dao.getPlayer({ id: game.playerTwo})
                  p2.inGame = null
                  await dao.putPlayer(p2.id, p2)
                }
              }
            }
            player.inGame = null
          }
          player.token = null
          await dao.putPlayer(player.id, player)
          return true
        }
        return false
      }
      return false
    },
    deleteUser: async (perent, { name, password }) => {
      const player = await dao.getPlayer({ name: name })
      if(helper.compareHash(password, player.password)) {
        return await dao.deletePlayer(player.id)
      }
      return false
    },
    createGame: async (perent, { multiplayer, password, token }) => {
      const player = await dao.getPlayer({ token: token })
      if(!player.inGame) {
        const game = await dao.postGame(helper.createNewGame(multiplayer, password, player))
        player.inGame = game.id
        await dao.putPlayer(player.id, player)
        return game
      }
      return false
    },
    deleteGame: async (perent, { id }) => {
      if(await dao.getGame({ id: id })) {
        return await dao.deleteGame(id)
      }
      return false
    },
    joinGame: async (perent, { id, password, token }) => {
      const game = await dao.getGame({ id: id })
      const player = await dao.getPlayer({ token: token })
      if(game && game.multiplayer && game.playerOne != player.id) {
        if(game.password) {
          if(helper.compareHash(password, game.password)) {
            player.inGame = game.id
            game.playerTwo = player.id
            await dao.putPlayer(player.id, player)
            await dao.putGame(game.id, game)
            return game
          }
        }
        player.inGame = game.id
        game.playerTwo = player.id
        await dao.putPlayer(player.id, player)
        await dao.putGame(game.id, game)
        return game
      }
      return false
    },
    createMove: async (perent, { id, move, token }) => {
      if(move.length === 1) {
        const player = await dao.getPlayer({ token: token })
        const game = await dao.getGame({ id: id })
        if(game.playerOneMoves === null) game.playerOneMoves = ""
        if(game.playerTwoMoves === null) game.playerTwoMoves = ""
        if(player.inGame && player.inGame === game.id && !logic.checkDuplicates(game, move)) {
          if(game.multiplayer) {
            if(game.playerTwo === player.id) {
              game.playerTwoMoves += move
              await dao.putGame(game.id, logic.returnWinner(game))
              pubsub.publish('NEW_MOVE', {
                newMove: game
              })
              return game
            }
            game.playerOneMoves += move
            await dao.putGame(game.id, logic.returnWinner(game))
            pubsub.publish('NEW_MOVE', {
              newMove: game
            })
            return game
          }
          game.playerOneMoves += move
          logic.aiMove(game)
          await dao.putGame(game.id, logic.returnWinner(game))
          return game
        }
        return false
      }
      return false
    }
  },
  Subscription: {
    newMove: {
      subscribe: (perent, arg, { pubsub }) => {
        return pubsub.asyncIterator(['NEW_MOVE'])
      }
    }
  }
}
