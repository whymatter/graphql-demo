# GraphQL VS REST

## Repository Structure

```
|- src
    |- database : contains database setup and initialization
    |- entities : contains all entities, for communication with database
    |- graphql  : contains graphql schema spec and resolver implementations
    |- index.js : bootstrap server
```

## Libraries

* **express** [^4.17.1]
As webserver

* **express-graphql** [^0.12.0]
GraphQl bindings for express webserver (`graphqlHTTP(options)`)

* **graphql** [^16.1.0]
GraphQL implementation (parser, executor, ...)

* **sequelize** [^6.11.0]
Object Relational Mapper (uses sqlite3)

* **sqlite3** [^5.0.2]
SQLite adapter

## How to run

Following commands run the project and do a restart on changes

```shell
npm install
npm run start:watch
```