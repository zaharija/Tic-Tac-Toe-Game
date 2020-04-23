# Typescript backend api for tic-tac-toe game
Steps to run this project:

1. Run `yarn`
2. Setup database settings inside `ormconfig.json` file
3. Run `yarn start` command

Use nodemon with this project.
This project was created with TyperORM.

Project testing with Altair GraphQL client: http://localhost:4000/graphql
Port can be changed.

Queries:
player(...): Player
game(...): Game

Mutations:
register(...): Player
login(...): Player
logout(...): Boolean
deleteUser(...): Boolean
createGame(...): Game
deleteGame(...): Boolean
joinGame(...): Game
createMove(...): Game

Subscriptions:
newMove: Game

Login/registration is required to play the game.
User that exists, and has a session token can create or join existing game.
Games can be singleplayer or multiplayer - which can be created with or without a password to join requirement.
Tic-tac-toe move is made by sending a next move position - a number between 1 and 9 that corresponds with a square on a board.
Logging out leaves the current game. Gameless users can create a new game.

Project structure:
-modules
-src
  -dao
  -entity
  -migration*
  -service
    -helper.ts
    -logic.ts
    -resolvers.ts
    -server.ts
  -app.ts
  -typeDefs.ts
-configs(package, yarn, orm, ts)*

Schemas are handled by typeDefs.ts
Resolvers are handled by resolvers.ts
