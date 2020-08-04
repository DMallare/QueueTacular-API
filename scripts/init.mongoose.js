require('dotenv').config();
const mongoose = require('mongoose');

const Item = require('../models/item');
const Queue = require('../models/queue');
const User = require('../models/user');

const URL = process.env.DB_URL || 'mongodb://localhost:27017';
console.log(URL);
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

const Tim = new User({
  username: 'timmm',
  email: 'winnerwinner@chickendinner.com',
  signedin: true,
});

const Danielle = new User({
  username: 'danielle',
  email: 'dmallare7@gmail.com',
  signedin: false,
});

const Zack = new User({
  username: 'zack.k',
  email: 'zack.k@gmail.com',
  signedin: true,
});

const Nachiket = new User({
  username: 'nachi',
  email: 'nachi1234@gmail.com',
  signedin: true,
});

const userDB = [David, MKBHD, Billie, Winnie, Tim, Danielle, Zack, Nachiket];

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
  user: Tim,
  wait: 0,
  description: 'queue item description four',
});

const itemFive = new Item({
  status: 'Waiting',
  user: Zack,
  wait: 60,
  description: 'waiting to get into Disneyland',
});

const itemSix = new Item({
  status: 'Complete',
  user: Danielle,
  wait: 11,
  description: 'I need help with programming stuff',
});

const itemSeven = new Item({
  status: 'Serving',
  user: Nachiket,
  wait: 30,
  description: 'Working on A7',
});

const itemEight = new Item({
  status: 'Complete',
  user: Nachiket,
  wait: 101,
  description: 'Trying to get into disney...',
});

const itemNine = new Item({
  status: 'Waiting',
  user: Zack,
  wait: 20,
  description: 'Need help with Java',
});

const itemTen = new Item({
  status: 'Waiting',
  user: Danielle,
  wait: 40,
  description: 'Need help with making a hash table',
});

const itemEleven = new Item({
  status: 'Waiting',
  user: Tim,
  wait: 50,
  description: 'Need help with pointers',
});

const itemTwelve = new Item({
  status: 'Serving',
  user: Billie,
  wait: 65,
  description: 'Seg fault.',
});

const itemThirteen = new Item({
  status: 'Complete',
  user: Winnie,
  wait: 15,
  description: 'Program is crashing',
});

const itemDB = [
  itemOne,
  itemTwo,
  itemThree,
  itemFour,
  itemFive,
  itemSix,
  itemSeven,
  itemEight,
  itemNine,
  itemTen,
  itemEleven,
  itemTwelve,
  itemThirteen,
];

const Doctor = new Queue({
  title: "Doctor's visit",
  status: 'Open',
  owner: David,
  description:
    'Dr. Larrys ENT office. We fix your Ears, Nose and Throat problems. Hours: M-F 9am to 5pm',
  maxParticipants: 12,
  startDate: '2020-12-17T03:24:00',
  endDate: '2020-12-17T09:24:00',
  items: [itemOne, itemTwo],
});

const Disneyland = new Queue({
  title: 'Disneyland',
  status: 'Closed',
  owner: Danielle,
  description:
    'This is the general ticketing queue for Disneyland - no fast passes. The lines for all rides are too long!',
  maxParticipants: 1000,
  startDate: '2020-09-01T03:24:00',
  endDate: '2020-11-22T09:24:00',
  items: [itemThree, itemFour, itemFive, itemEight],
});

const TimOH = new Queue({
  title: "Tim's office hours",
  status: 'Open',
  owner: Tim,
  description: 'Get your computer science questions answered!',
  maxParticipants: 10,
  startDate: new Date('2020-08-04T04:00:00'),
  endDate: new Date('01.02.2012').toISOString(),
  items: [itemSix, itemSeven, itemNine],
});

const ZackOH = new Queue({
  title: "Zack's office hours",
  status: 'Open',
  owner: Zack,
  description: 'CS5006 Office hours',
  maxParticipants: 10,
  startDate: new Date(2019, 11, 5, 6, 0, 0, 0),
  endDate: new Date('01.02.2012'),
  items: [itemTen, itemEleven, itemTwelve, itemThirteen],
});

const queueDB = [Doctor, Disneyland, TimOH, ZackOH];

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
