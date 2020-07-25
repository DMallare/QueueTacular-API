const queue = require('./queue.js');

const resolvers = {
  Query: {
    showQueue: queue.showQueue,
    showAll: queue.showAll,
  },

  Mutation: {
    addQueue: queue.addQueue,
    queueUpdate: queue.queueUpdate,
<<<<<<< HEAD
    itemUpdate: queue.itemUpdate,
=======
    deleteQueue: queue.deleteQueue,
    deleteQueueItem: queue.deleteQueueItem,
>>>>>>> 823f8657cf4f540726891bd70979c762d6589f3c
  },
};

module.exports = { resolvers };
