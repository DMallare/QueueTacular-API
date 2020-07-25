// const { UserInputError } = require('apollo-server-express');

const { getDb, getNextSequence } = require('./db.js');

/*
function validateItemID(queue, itemID) {
  const db = getDb();
  const errors = [];
  // Check if the items array has greater than or equal to the supplied item ID
  // number of items
  if (db.collection('queues').find({ items: { $size: { $gte: itemID } } }) === null) {
    errors.push(`Invalid item ID: ${itemID}`);
  }
  if (errors.length > 0) {
    console.log(errors[0]);
    throw new UserInputError('Invalid input(s)', { errors });
  }
}
*/

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

// async function remove(_, { id }) {
//   const db = getDb();
//   const issue = await db.collection('issues').findOne({ id });
//   if (!issue) return false;
//   issue.deleted = new Date();

//   let result = await db.collection('deleted_issues').insertOne(issue);
//   if (result.insertedId) {
//     result = await db.collection('issues').removeOne({ id });
//     return result.deletedCount === 1;
//   }
//   return false;
// }

async function deleteQueue(_, { id }) {
  const db = getDb();
  const queue = await db.collection('queues').findOne({ id });
  if (!queue) return false;

  let result = await db.collection('deleted_queues').insertOne(queue);
  if (result.insertedId) {
    result = await db.collection('queues').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

async function deleteQueueItem(_, { queueID, queueItemID }) {
  const db = getDb();
  // const queue = await db.collection('queues').
  //   findOne({ id: queueID }, { items: { $elemMatch: { id: 2 } } });
  // if (!queue) return false;
  const result = await db.collection('queues').update({ id: queueID }, { $pull: { items: { id: queueItemID } } });
  console.log(result.result.nModified);
  return result.result.nModified === 1;
}


async function itemUpdate(_, { queueID, itemID, changes }) {
  // validateItemID(queueID, itemID);
  const db = getDb();
  if (changes.description) {
    await db.collection('queues').updateOne(
      { id: queueID, 'items.id': itemID },
      { $set: { 'items.$.description': changes.description } },
    );
  }

  if (changes.status) {
    await db.collection('queues').updateOne(
      { id: queueID, 'items.id': itemID },
      { $set: { 'items.$.status': changes.status } },
    );
  }
  const updatedItem = await db.collection('queues').findOne({ id: queueID, 'items.id': itemID },
    { 'items.$.id': itemID });
  return updatedItem;
}

module.exports = {
  showQueue,
  showAll,
  addQueue,
  queueUpdate,
  deleteQueue,
  itemUpdate,
  deleteQueueItem,
};
