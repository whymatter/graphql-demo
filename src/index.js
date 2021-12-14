var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const initDb = require('./database/init');
const { schema, resolver } = require('./graphql');

// Initialize database (create all tables)
(async function() { await initDb(); })();

// Create blank express app
var app = express();

// Configure GraphQL route
app.use('/graphql', graphqlHTTP({
  schema: schema,           // Configure schema
  rootValue: resolver,      // Configure resolver
  graphiql: true,           // Enable GrahpiQl
}));

// Start Server
app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');