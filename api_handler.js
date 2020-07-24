const { showAll, showQueue } = require('./queue.js');


const resolvers = {
  Query: {
    showQueue,
    showAll,
  },

  Mutation: {
    // addQueue: addQueue,
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
