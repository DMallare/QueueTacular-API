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

async function showItem(_, { queueID, itemID }) {
  const db = getDb();
  // const item = await db.collection('queues')
  // .find({ id: queueID, items: { $elemMatch: { id: itemID } } }).toArray();
  const item = await db.collection('queues').aggregate([{ $match: { id: queueID } },
    {
      $project: {
        items: {
          $filter: {
            input: '$items',
            as: 'item',
            cond: { $eq: ['$$item.id', itemID] },
          },
        },
      },
    },
  ]).toArray();
  console.log(item[0].items[0]);
  return item[0].items[0];
}

async function showAll() {
  const db = getDb();
  const queues = await db.collection('queues').find().toArray();
  return queues;
}

async function addQueue(_, { newQueue }) {
  const db = getDb();
  // validate(issue);

  const queueAdd = Object.assign({}, newQueue);
  queueAdd.id = await getNextSequence('queues');
  queueAdd.items = [];

  const result = await db.collection('queues').insertOne(queueAdd);
  const savedQueue = await db
    .collection('queues')
    .findOne({ _id: result.insertedId });
  return savedQueue;
}

async function addItem(_, { queueID, item }) {
  const db = getDb();
  const itemAdd = Object.assign({}, item);
  itemAdd.id = 7;
  // const queueUp = await db.collection('queues').findOne({ id: queueID });
  await db
    .collection('queues')
    .updateOne({ id: queueID }, { $push: { items: itemAdd } });
  // queueUp.updateOne.items.push(itemAdd));
  return itemAdd;
}

async function updateQueue(_, { id, changes }) {
  const db = getDb();
  if (
    changes.title
    || changes.status
    || changes.descripion
    || changes.maxParticipants
    || changes.maxParticipants
    || changes.owner
  ) {
    const queue = await db.collection('queues').findOne({ id });
    Object.assign(queue, changes);
  }
  await db.collection('queues').updateOne({ id }, { $set: changes });
  const updatedQueue = await db.collection('queues').findOne({ id });
  return updatedQueue;
}

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

async function deleteItem(_, { queueID, queueItemID }) {
  const db = getDb();
  // const queue = await db.collection('queues').
  //   findOne({ id: queueID }, { items: { $elemMatch: { id: 2 } } });
  // if (!queue) return false;
  const result = await db
    .collection('queues')
    .update({ id: queueID }, { $pull: { items: { id: queueItemID } } });
  return result.result.nModified === 1;
}

async function updateItem(_, { queueID, itemID, changes }) {
  // validateItemID(queueID, itemID);
  const db = getDb();
  if (changes.description) {
    await db
      .collection('queues')
      .updateOne(
        { id: queueID, 'items.id': itemID },
        { $set: { 'items.$.description': changes.description } },
      );
  }

  if (changes.status) {
    await db
      .collection('queues')
      .updateOne(
        { id: queueID, 'items.id': itemID },
        { $set: { 'items.$.status': changes.status } },
      );
  }

  if (changes.name) {
    await db
      .collection('queues')
      .updateOne(
        { id: queueID, 'items.id': itemID },
        { $set: { 'items.$.name': changes.name } },
      );
  }

  if (changes.email) {
    await db
      .collection('queues')
      .updateOne(
        { id: queueID, 'items.id': itemID },
        { $set: { 'items.$.email': changes.email } },
      );
  }

  const updatedItem = db
    .collection('queues')
    .findOne({ id: queueID, 'items.id': itemID }, { 'items.$': 1 });

  return updatedItem;
}

module.exports = {
  showQueue,
  showAll,
  showItem,
  addQueue,
  updateQueue,
  deleteQueue,
  updateItem,
  deleteItem,
  addItem,
};
