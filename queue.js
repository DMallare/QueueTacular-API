const { getDb } = require('./db.js');


async function showQueue(_, { id }) {
  const db = getDb();
  const queue = await db.collection('queues').findOne({ id });
  return queue;
}


async function showAll() {
  const db = getDb();
  const queues = await db.collection('queues').find().toArray();
  return queues;
}

/*
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

  },

};
*/

module.exports = { showQueue, showAll };
