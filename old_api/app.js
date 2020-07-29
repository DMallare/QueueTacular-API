require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');

const url = process.env.DB_URL;
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db) => {
  console.log('Connected correctly to server!');
}, (err) => {
  console.log(err);
});
const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
});

const app = express();

app.use(bodyParser.json());

app.use('*', cors());

server.applyMiddleware({ app });

const PORT = process.env.API_SERVER_PORT;
app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
