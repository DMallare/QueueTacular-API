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

async function addQueue(_, { newQueue }) {
  const db = getDb();
  // validate(issue);

  const queueAdd = Object.assign({ }, newQueue);
  queueAdd.id = await getNextSequence('queues');
  queueAdd.items = [];

  const result = await db.collection('queues').insertOne(queueAdd);
  const savedQueue = await db.collection('queues')
    .findOne({ _id: result.insertedId });
  return savedQueue;
}

async function queueUpdate(_, { id, changes }) {
  const db = getDb();
  if (changes.title || changes.status || changes.descripion
      || changes.maxParticipants || changes.maxParticipants || changes.owner) {
    const queue = await db.collection('queues').findOne({ id });
    Object.assign(queue, changes);
  }
  await db.collection('queues').updateOne({ id }, { $set: changes });
  const updatedQueue = await db.collection('queues').findOne({ id });
  return updatedQueue;
}

async function itemUpdate(parent, { queueID, itemID, changes }) {
  const db = getDb();
  if (changes.name || changes.status || changes.descripion
    || changes.email) {
    const queue = await db.collection('queues').findOne({ queueID });
    const item = await queue.items.find({ id: itemID });
    Object.assign(item, changes);
  }
  await db.collection('queues').updateOne({ queueID }, { $set: parent.items[itemID] });
  const updatedItem = await db.collection('queues').findOne({ queueID }).items[itemID];
  return updatedItem;
}

module.exports = {
  showQueue,
  showAll,
  addQueue,
  queueUpdate,
  itemUpdate,
};
