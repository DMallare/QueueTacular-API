# GroupProject-SpaceForce-API

## Team members:

- Danielle Mallare-Dani
- Nachiket Dani
- Tim Gao
- Zach Katancik

---

## Link to UI:

[Space Force UI](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI)

## Project Summary:

<p> Queue-tacular allows users to join a queue with the click of a button and provides
the "queuee" with real time info on their current status while waiting. Can't stare
at your phone or computer while waiting for your turn? No problem! Queue-tacular will email
you when its your turn.</p>

<p> Users are also able to create their own queues for others to join. Queue-tacular gives
you the ability cutomize your queue with a title, description, and other metrics to manage your queue such
as the ability to limit the number of people that can be enqueued at any time.</p>

## Iter 1.0:

<details>
  <summary>Click to Expand Iter 1.0</summary>

### Build and Run Instructions:

1. Clone both repos: <br>
   [Space Force UI](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI) <br>
   [Space Force API](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API)

2. To populate the database, run the script in the scripts/init.mongoose.js with node.

  ```
  $ node scripts/init.mongoose.js
  ```

3. Run the the application, install dependencies, and start with the start scripts:
  ```
  $ npm i
  $ npm start
  ```

The default graphql server API server is run on localhost:4000

### Work completed:

<p>We initally went with a similar API to the issuetracker project but found that
querying the data base and grabbing specific information from the response object
was becoming cumbersome. To mitigate this issue, we switched to work with Mongoose as
opposed to the MongoDB driver for Node.</p> The Database has three main collections- Users,
Queues, and Items. A summary of the relationship between these collections is below:
</p>

- A queue has an owner that is a member of the User collection.
- A queue also has a list of items.
- A item has an a user that is a member of the User collection.

<p>The basic CRUD operations were implemented in this iteration on the API and we have begun
to integrate these into the application. A summary of these is below:</p>

- <strong>Create:</strong> A user has the ability to to create their own queue (see the side nav bar).
  Clicking on "Create" will take the user to a page with a form allowing the user to input their queue's information.
  Queue title and desription are required. All other fields are optional. In the future, when a user navigates to
  the Join page and clicks "Join Queue" to join a queue, a new item will be created and added to the specified queue.

  ![Create Page](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/dmb/readme_screenshots/iter1_create.JPG)

- <strong>Read:</strong> The main dashboard page of the application shows the user queues they are currently in
  and a history of queues they had been in previously (queues they are no longer "Waiting" in).
  Queues are displayed in a timeline format giving the user perspective on where they are in reference
  to the end of the queue (and being served!)

  ![Main Dashboard](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/dmb/readme_screenshots/iter1_dashboard.JPG)

  The InQueue component giving the user perspective on where they are in reference to the end of the queue

  ![InQueue component](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/dmb/readme_screenshots/iter1_inQueue.JPG)

- <strong>Update:</strong> Currently our application supports many different update API's ranging from allowing
  a user to change their own information (such as their email), to allowing an item in the queue to be updated
  to change an item's status from "Waiting" to "Served." Other operations include updating queue information
  (such as updating a description or queue status), removing an item from the queue.

  ![Join a Queue](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/dmb/readme_screenshots/iter1_join.JPG)

- <strong>Delete:</strong> Our application also supports API's to delete an item in a queue and to delete
  an entire queue itself.

## </details>

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
