const queue = require('./queue.js');

const resolvers = {
  Query: {
    showQueue: queue.showQueue,
    showAll: queue.showAll,
  },

  Mutation: {
    addQueue: queue.addQueue,
    addItem: queue.addItem,
    updateQueue: queue.updateQueue,
    updateItem: queue.updateItem,
    deleteQueue: queue.deleteQueue,
    deleteItem: queue.deleteItem,
  },
};

module.exports = { resolvers };
