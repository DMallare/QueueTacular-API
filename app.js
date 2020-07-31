require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const schema = require("./schema");

// Constants
const URL = process.env.DB_URL || "mongodb://localhost:27017";

// Connect to MongoDB.
const connect = mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  () => {
    console.log("Connected correctly to server!");
  },
  (err) => {
    console.log(err);
  }
);

// Creating Apollo server.
const server = new ApolloServer({
  schema,
});

// Creating express app.
const app = express();

// Applying middelware to application.
app.use(bodyParser.json());
app.use("*", cors());

// Connecting express app with Apollo.
server.applyMiddleware({ app });

const PORT = process.env.API_SERVER_PORT || 4000;
// Start Server.
app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
