const queue = require('./queue.js');


const resolvers = {
  Query: {
    showQueue: queue.showQueue,
    showAll: queue.showAll,
  },

  Mutation: {
    addQueue: queue.addQueue,
  },
  /*
    addItem: (_, { item }) => {
      db.queues.update({
        id: item.id,
        status: item.status,
        // person: item.person,
        description: item.description,
      });
      const updatedQueue = db.queues.get(item.id);
      return updatedQueue;
    },
    */
};

module.exports = { resolvers };
