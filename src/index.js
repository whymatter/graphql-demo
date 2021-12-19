var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const initDb = require('./database/init');
const { schema, resolver, rootDataloaderResolver } = require('./graphql');
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

// Configure GraphQL route
app.use('/graphql', (req, resp) => {
  // Build a new set of DataLoaders, scoped to this request
  // Important, because cache must not violate request barrieres
  const loaders = buildLoader();

  return graphqlHTTP({
    schema: schema,                     // Pass schema
    rootValue: rootDataloaderResolver,  // Pass root resolver
    graphiql: true,                     // Enable GrahpiQL
    context: loaders                    // Set DataLoaders as context
  })(req, resp);
});

// Start Server
app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');