import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Player {
    id: ID
    name: String
    inGame: ID
    token: String
  }
  type Game {
    id: ID
    multiplayer: Boolean
    password: String
    playerOne: Player
    playerTwo: ID
    playerOneMoves: String
    playerTwoMoves: String
    winner: String
  }
  type Query {
    player(id: ID!): Player
    game(id: ID!): Game
  }
  type Mutation {
    register(name: String!, password: String!): Player
    login(name: String!, password: String!): Player
    logout(token: String!): Boolean
    deleteUser(name: ID!, password: String!): Boolean
    createGame(multiplayer: Boolean!, password: String, token: String): Game
    deleteGame(id: ID!): Boolean
    joinGame(id: ID!, password: String, token: String!): Game,
    createMove(id: ID!, move: String!, token: String!): Game
  }
  type Subscription {
    newMove: Game
  }
`
