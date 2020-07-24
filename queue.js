const { getDb, getNextSequence } = require('./db.js');

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
owner: String!
title: String!
status: QueueStatusType = Open
description: String
maxParticipants: Int
maxWaitTime: Int
*/

async function addQueue(_, { queue }) {
  const db = getDb();
  // validate(issue);

  const newQueue = Object.assign({ }, queue);
  newQueue.id = await getNextSequence('queues');
  newQueue.title = queue.title;
  newQueue.description = queue.description;
  newQueue.owner = queue.owner;
  newQueue.items = [];

  const result = await db.collection('queues').insertOne(newQueue);
  const savedQueue = await db.collection('queues')
    .findOne({ _id: result.insertedId });
  return savedQueue;
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

module.exports = { showQueue, showAll, addQueue };
