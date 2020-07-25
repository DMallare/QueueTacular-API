/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/queueSystem scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/queueSystem scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.queues.remove({});
// TODO: add new collection for deleted queues
// db.deleted_queues.remove({});

const queuesDB = [
  {
    id: 1,
    title: "Doctor's visit",
    status: 'Open',
    owner: 'Dr. Dani',
    description: 'Dr. Danis ENT office',
    maxParticipants: 12,
    maxWaitTime: 90,
    items: [
      {
        id: 1,
        status: 'Served',
        name: 'George',
        wait: 25,
        description: 'queue item description one.',
      },
      {
        id: 2,
        status: 'Waiting',
        name: 'Alex',
        wait: 999,
        description: 'queue item description two',
      },
    ],
  },
  {
    id: 2,
    title: 'Disneyland',
    status: 'Closed',
    owner: 'Donald Duck',
    description: 'The lines are too long!',
    maxParticipants: 100,
    maxWaitTime: 999,
    items: [
      {
        id: 1,
        status: 'Serving',
        name: 'Mary Dairy',
        wait: 999,
        description: 'queue item description three',
      },
      {
        id: 2,
        status: 'Removed',
        name: 'Crayon Shin',
        wait: 0,
        description: 'queue item description four',
      },
    ],
  },
];

db.queues.insertMany(queuesDB);
const count = db.queues.count();
print('Inserted', count, 'queues');

db.counters.remove({ _id: 'queues' });
db.counters.insert({ _id: 'queues', current: count });

db.queues.createIndex({ id: 1 }, { unique: true });
db.queues.createIndex({ status: 1 });
db.queues.createIndex({ owner: 1 });
db.queues.createIndex({ title: 'text', description: 'text' });

// db.deleted_queues.createIndex({ id: 1 }, { unique: true });

// TODO: add new collection for deleted queues
// db.deleted_issues.createIndex({ id: 1 }, { unique: true });

// type Queue {
//   # _id: ID!
//   id: ID!
//   title: String!
//   status: QueueStatusType!
//   owner: User!
//   description: String
//   maxParticipants: Int
//   maxWaitTime: Int
//   items: [QueueItem]
// }
