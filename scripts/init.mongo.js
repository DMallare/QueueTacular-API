/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.queues.remove({});
// TODO: add new collection for deleted queues
// db.deleted_issues.remove({});

const queuesDB = [
  {
    id: 'SJRAZDu_z',
    title: "Doctor's visit",
    status: 'Open',
    owner: {
      id: 'fHY8NmlPn',
      name: 'Alice Keagle',
      signedIn: true,
      email: 'alice@facegle.io',
      password: 'alice123',
    },
    description: 'Hi thanks bye!',
    maxParticipants: 12,
    maxWaitTime: 90,
    items: [
      {
        id: '7Fk*>mb0p',
        status: 'Served',
        name: 'George',
        wait: 25,
        description: 'queue item description one.',
      },
      {
        id: '2qw*llmb7',
        status: 'Waiting',
        name: 'Alex',
        wait: 999,
        description: 'queue item description two',
      },
    ],
  },
  {
    id: '*rJKAbDd_z',
    title: 'Disneyland',
    status: 'Closed',
    owner: {
      id: '28&m0NNkl',
      name: 'Edmond Edmond',
      signedIn: false,
      email: 'bob@goobook.co',
      password: 'bob123',
    },
    description: 'The lines are too long!',
    maxParticipants: 10,
    maxWaitTime: 999,
    items: [
      {
        id: '2qw*llmb7',
        status: 'Serving',
        name: 'Mary Dairy',
        wait: 999,
        description: 'queue item description three',
      },
      {
        id: 'mll0f&*^',
        status: 'Removed',
        name: 'Crayon Shin',
        wait: 0,
        description: 'queue item description three',
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

// db.deleted_issues.createIndex({ id: 1 }, { unique: true });

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
