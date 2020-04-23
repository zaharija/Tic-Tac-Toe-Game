import * as Express from 'express'
import * as Http from 'http'
import { ApolloServer } from 'apollo-server-express'
export class Server {
  private _apolloServet: ApolloServer
  private _express: Express.Application
  private _http: Http.Server

  constructor(apolloServer: ApolloServer, express: Express.Application, http: Http.Server) {
    this._apolloServet = apolloServer
    this._express = express
    this._http = http
  }

  public start(port: number) {
    this.init()
    this._http.listen({ port: port }, () => console.log("Listening on Port " + port))
  }

  private init() {
    const app = this._express
    const http = this._http
    this._apolloServet.applyMiddleware({ app })
    this._apolloServet.installSubscriptionHandlers(http)
  }
}
