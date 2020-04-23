import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { typeDefs } from './typeDefs'
import { resolvers, pubsub } from './service/resolvers'
import { Server } from './service/server'
import * as http from 'http'

const start = async () => {
  const port = 4000
  await createConnection()
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req, res }: any) => ({ req, res, pubsub })
  })
  const app = express()
  const server = new Server(apolloServer, app, http.createServer(app))
  server.start(port)
}

start()
