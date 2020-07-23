const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  queues: store.collection('queues'),
  users: store.collection('users'),
};
