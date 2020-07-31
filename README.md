# GroupProject-SpaceForce-API

## Team members:

- Danielle Mallare-Dani
- Nachiket Dani
- Tim Gao
- Zach Katancik

---

## Link to UI:

[Space Force UI](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI)

## Initialization:

To populate the database, run the script in the scripts/init.mongoose.js with node.

    $ node scripts/init.mongoose.js

To run the the application, install npm, and start with the start scripts.

    $ npm start

The default graphql server API server is run on localhost:4000

---

## Example GraphQL Queries:

### Queries:

#### find Query:
    {
      queueMany {
        _id description
        owner
        items {
          user
          _id description
        }
      }
    }

#### findOne Query:

    {
      queueOne(filter: {
        owner: "5f235c25ac3b06498000f2b8",
        status:Open
      }) {
        _id description title
      }
    }

### Mutations:

#### updateOne Mutation:

    mutation UpdateOneQueue {
      queueUpdateOne(record:
        {title: "new title", description: "rising"}
      filter: {status: Open}) {
        record {
          description title
        }, recordId
      }
    }

#### deleteOne Mutation:

    mutation DeleteOneQueue{
      queueRemoveById(_id: "5f235c25ac3b06498000f2c5") {
        recordId record {
          description title _id
        }
      }
    }
