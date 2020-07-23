require('dotenv').config();


const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const express = require('express');

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

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
