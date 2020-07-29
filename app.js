require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');
// const Item = require('./models/item');
// const Queue = require('./models/queue');
// const User = require('./models/user');

// Constants
const URL = process.env.DB_URL;

// Connect to MongoDB.
const connect = mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
connect.then(
  () => {
    console.log('Connected correctly to server!');
  },
  (err) => {
    console.log(err);
  },
);

// const David = new User({
//   username: 'Dave2D',
//   email: 'dave@dave2d.com',
//   signedin: true,
// });

// const MKBHD = new User({
//   username: 'MHBHD',
//   email: 'mkbhd@mkbhd.com',
//   signedin: false,
// });

// const Billie = new User({
//   username: 'Eilish',
//   email: 'billieeilish@billieeilish.com',
//   signedin: true,
// });

// const Winnie = new User({
//   username: 'thepig',
//   email: 'winniethepig@wtp.com',
//   signedin: false,
// });

// const Winner = new User({
//   username: 'winner',
//   email: 'winerwinner@chickendinner.com',
//   signedin: true,
// });

// const Danielle = new User({
//   username: 'danielle',
//   email: 'danielle@mallare.com',
//   signedin: false,
// });

// const itemOne = new Item({
//   status: 'Removed',
//   user: MKBHD,
//   wait: 25,
//   description: 'queue item description one.',
// });

// const itemTwo = new Item({
//   status: 'Waiting',
//   user: Billie,
//   wait: 999,
//   description: 'queue item description two',
// });

// const itemThree = new Item({
//   status: 'Serving',
//   user: Winnie,
//   wait: 999,
//   description: 'queue item description three',
// });

// const itemFour = new Item({
//   status: 'Complete',
//   user: Winner,
//   wait: 0,
//   description: 'queue item description four',
// });

// const Doctor = new Queue({
//   title: "Doctor's visit",
//   status: 'Open',
//   owner: David,
//   description: 'Dr. Danis ENT office',
//   maxParticipants: 12,
//   maxWaitTime: 90,
//   items: [
//     itemOne,
//     itemTwo,
//   ],
// });

// const Disneyland = new Queue({
//   title: 'Disneyland',
//   status: 'Closed',
//   owner: Danielle,
//   description: 'The lines are too long!',
//   maxParticipants: 1000,
//   maxWaitTime: 999,
//   items: [
//     itemThree,
//     itemFour,
//   ],
// });

// Doctor.save();
// Disneyland.save();

// Creating Apollo server.
const server = new ApolloServer({
  schema,
});

// Creating express app.
const app = express();

// Applying middelware to application.
app.use(bodyParser.json());
app.use('*', cors());

// Connecting express app with Apollo.
server.applyMiddleware({ app });

const PORT = process.env.API_SERVER_PORT || 4000;
// Start Server.
app.listen({ port: PORT }, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`));
