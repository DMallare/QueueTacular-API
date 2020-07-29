require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const express = require('express');
const { connectToDb } = require('./db.js');

const { resolvers } = require('./api_handler.js');


const PORT = process.env.API_SERVER_PORT || 3030;

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function start() {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`API server started on port ${PORT}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
