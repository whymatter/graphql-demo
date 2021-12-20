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

* **graphql** [^16.2.0]
GraphQL implementation (parser, executor, ...)

* **apollo-server-express** [^3.5.0]
Apollo GraphQL Server binding for express

* **apollo-server-core** [^3.5.0]
Used to build the GraphQL typeDefs

* **@graphql-tools/schema** [^8.3.1]
Required for the `makeExecutableSchema` function, which is required by `subscriptions-transport-ws/SubscriptionServer`

* **subscriptions-transport-ws** [^0.11.0]
To support websocket GraphQL subscripts

* **graphql-subscriptions** [^2.0.0]
Simple publish subscribe library to implement subscriptions

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