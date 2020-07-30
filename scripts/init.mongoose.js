require('dotenv').config();
const mongoose = require('mongoose');

const Item = require('../models/item');
const Queue = require('../models/queue');
const User = require('../models/user');

const URL = process.env.DB_URL || 'mongodb://localhost:27017';
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

Queue.collection.drop().then(
  () => {
    console.log('Dropped queues collection!');
  },
  (err) => {
    console.log(err);
  },
);

Item.collection.drop().then(
  () => {
    console.log('Dropped items collection!');
  },
  (err) => {
    console.log(err);
  },
);

User.collection.drop().then(
  () => {
    console.log('Dropped user collection!');
  },
  (err) => {
    console.log(err);
  },
);

const David = new User({
  username: 'Dave2D',
  email: 'dave@dave2d.com',
  signedin: true,
});

const MKBHD = new User({
  username: 'MHBHD',
  email: 'mkbhd@mkbhd.com',
  signedin: false,
});

const Billie = new User({
  username: 'Eilish',
  email: 'billieeilish@billieeilish.com',
  signedin: true,
});

const Winnie = new User({
  username: 'thepig',
  email: 'winniethepig@wtp.com',
  signedin: false,
});

const Winner = new User({
  username: 'winner',
  email: 'winerwinner@chickendinner.com',
  signedin: true,
});

const Danielle = new User({
  username: 'danielle',
  email: 'danielle@mallare.com',
  signedin: false,
});

const userDB = [
  David, MKBHD, Billie, Winnie, Winner, Danielle,
];

const itemOne = new Item({
  status: 'Removed',
  user: MKBHD,
  wait: 25,
  description: 'queue item description one.',
});

const itemTwo = new Item({
  status: 'Waiting',
  user: Billie,
  wait: 999,
  description: 'queue item description two',
});

const itemThree = new Item({
  status: 'Serving',
  user: Winnie,
  wait: 999,
  description: 'queue item description three',
});

const itemFour = new Item({
  status: 'Complete',
  user: Winner,
  wait: 0,
  description: 'queue item description four',
});

const itemDB = [
  itemOne, itemTwo, itemThree, itemFour,
];

const Doctor = new Queue({
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
});

const Disneyland = new Queue({
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
});

const queueDB = [
  Doctor, Disneyland,
];

User.insertMany(userDB, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Added users.');
  }
});

Item.insertMany(itemDB, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Added items.');
  }
});

Queue.insertMany(queueDB, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Added queues.');
  }
});

// David.save();
// MKBHD.save();
// Billie.save();
// Winnie.save();
// Winner.save();
// Danielle.save();

// itemOne.save();
// itemTwo.save();
// itemThree.save();
// itemFour.save();

// Doctor.save();
// Disneyland.save();

// mongoose.connection.close();
