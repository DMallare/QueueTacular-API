const db = require('./db.js');
// const queue = require('./queue.js')

const resolvers = {
  Query: {
    showQueue: (root, { id }) => db.queues.get(id),
  },
};

module.exports = { resolvers };
