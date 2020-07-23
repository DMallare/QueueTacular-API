const db = require('./db.js');
// const queue = require('./queue.js')

const resolvers = {
  Query: {
    showQueue: (root, { title }) => db.queues.get(title),
  },
};

module.exports = { resolvers };
