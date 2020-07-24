require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://kay:myRealPassword@cluster0.mongodb.net/test?w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
 // perform actions on the collection object
  client.close();
});
*/

async function connectToDb() {
  const url = process.env.DB_URL;
  console.log(url);
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db('queueSystem');
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };

/*
const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  queues: store.collection('queues'),
  users: store.collection('users'),
};
*/
