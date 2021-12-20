const http = require('http');
const express = require('express');
const { execute, subscribe } = require('graphql');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const initDb = require('./database/init');
const { typeDefs, dataloaderResolver } = require('./graphql');
const buildLoader = require('./graphql/dataloader');

// Initialize database (create all tables)
(async function() { await initDb(); })();

// Create blank express app
var app = express();

// Allow Apollo Studio to access the graph
app.use((req, resp, next) => {
  resp.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  resp.setHeader('Access-Control-Allow-Headers', 'content-type');
  if (req.method == 'OPTIONS') {
    resp.send();
  } else {
    next(); 
  }
});

(async () => {
  const httpServer = http.createServer(app);

  // Combine typeDefs and resolver (required by SubscriptionServer)
  const schema = makeExecutableSchema({ typeDefs, resolvers: dataloaderResolver });

  const subscriptionServer = SubscriptionServer.create({
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
  }, {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at a different path.
    path: '/graphql',
 });

  const server = new ApolloServer({
    context: () => buildLoader(),
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }
    ],
  });

  // Start ApolloServer
  await server.start();

  // Add graphql to express pipeline
  server.applyMiddleware({ app });
  
  // Start Server
  httpServer.listen(4000);

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();