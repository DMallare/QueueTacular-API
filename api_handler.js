const queue = require('./queue.js');

const resolvers = {
  Query: {
    showQueue: queue.showQueue,
    showAll: queue.showAll,
  },

  Mutation: {
    addQueue: queue.addQueue,
    addItem: queue.addItem,
    queueUpdate: queue.queueUpdate,
    itemUpdate: queue.itemUpdate,
    deleteQueue: queue.deleteQueue,
    deleteQueueItem: queue.deleteQueueItem,
  },
};

module.exports = { resolvers };
