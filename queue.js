const db = require('./db.js');

const resolvers = {
  Query: {
    showQueue: (_, { id }) => db.queues.get(id),
  },

  Mutation: {
    addQueue: (_, { title, status, description }) => {
      const newID = db.queues.create({});
      db.queues.update({
        id: newID, status, title, description,
      });
      return db.queues.get(newID);
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
  },

};

module.exports = { resolvers };
