const { ApolloServer } = require('apollo-server-express');

const queue = require('./queue.js')

const resolvers = {
  Query: {
  showQueue: queue.showQueue,
  }
}