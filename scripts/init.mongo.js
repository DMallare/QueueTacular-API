/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo queueSystem scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/queueSystem scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/queueSystem scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.queues.remove({});
db.users.remove({});
db.items.remove({});
// db.deleted_queues.remove({});

const David = {
  username: 'Dave2D',
  email: 'dave@dave2d.com',
  signedin: true,
};

const MKBHD = {
  username: 'MHBHD',
  email: 'mkbhd@mkbhd.com',
  signedin: false,
};

const Billie = {
  username: 'Eilish',
  email: 'billieeilish@billieeilish.com',
  signedin: true,
};

const Winnie = {
  username: 'thepig',
  email: 'winniethepig@wtp.com',
  signedin: false,
};

const Winner = {
  username: 'winner',
  email: 'winerwinner@chickendinner.com',
  signedin: true,
};

const Danielle = {
  username: 'danielle',
  email: 'danielle@mallare.com',
  signedin: false,
};

const usersDB = {
  David, MKBHD, Billie, Winnie, Winner, Danielle,
};

const itemOne = {
  status: 'Removed',
  user: MKBHD,
  wait: 25,
  description: 'queue item description one.',
};

const itemTwo = {
  status: 'Waiting',
  user: Billie,
  wait: 999,
  description: 'queue item description two',
};

const itemThree = {
  status: 'Serving',
  user: Winnie,
  wait: 999,
  description: 'queue item description three',
};

const itemFour = {
  status: 'Complete',
  user: Winner,
  wait: 0,
  description: 'queue item description four',
};

const itemsDB = {
  itemOne, itemTwo, itemThree, itemFour,
};

const queuesDB = [
  {
    title: "Doctor's visit",
    status: 'Open',
    owner: David,
    description: 'Dr. Danis ENT office',
    maxParticipants: 12,
    maxWaitTime: 90,
    items: [
      itemOne,
      itemTwo,
    ],
  },
  {
    title: 'Disneyland',
    status: 'Closed',
    owner: Danielle,
    description: 'The lines are too long!',
    maxParticipants: 1000,
    maxWaitTime: 999,
    items: [
      itemThree,
      itemFour,
    ],
  },
];

db.queues.insertMany(queuesDB);
const queueCount = db.queues.count();
print('Inserted', queueCount, 'queues');
db.queues.createIndex({ status: 1 });
db.queues.createIndex({ owner: 1 });
db.queues.createIndex({ title: 'text', description: 'text' });


db.items.insertMany(itemsDB);
const itemCount = db.items.count();
print('Inserted', itemCount, 'items');
db.items.createIndex({ status: 1 });
db.items.createIndex({ user: 1 });
db.items.createIndex({ description: 'text' });

db.users.insertMany(usersDB);
const userCount = db.users.count();
print('Inserted', userCount, 'users');
db.items.createIndex({ username: 1 });
db.items.createIndex({ email: 'text' });


// db.counters.remove({ _id: 'queues' });
// db.counters.insert({ _id: 'queues', current: count });
// db.deleted_queues.createIndex({ id: 1 }, { unique: true });
