# GroupProject-SpaceForce-API

## Team members:

- Danielle Mallare-Dani
- Nachiket Dani
- Tim Gao
- Zack Katancik

---

## Heroku Links:

- [Space Force API on Heroku](https://queuetacular-api.herokuapp.com/graphql)
- [Space Force UI on Heroku](https://queuetacular-ui.herokuapp.com/)

## Link to UI:

[Space Force Group Project UI](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI)

## Project Summary:

<p> Queue-tacular lets users join and create queues with the click of a button. Both users
and creators of queues have access to real time information about their queues. Don't have
time to stare at your phone or computer while waiting for your turn? No problem!
Queue-tacular will email you when its your turn. Queue-tacular also lets users customize
their queue with other metrics such a limit to the number of people in the queue.</p>

## Iter 2.0:

<details>
  <summary>Click to Expand Iter 2.0</summary>

### Summary of Work Completed:

#### Lifts all Dashboard Component state to top level App component (Danielle, Tim, Zack)

- Code found in [`Admin.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/layouts/Admin.js)
- Migrates all Dashboard component state including items user is in, queues they are in, created queues, etc., to top level App component.
- Passes relevant data as props to all child components including CreatesQueues, QueueMultiview, Join, etc.

#### Makes Create and Edit components dynamic (Tim)

- Code found in [`Create.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/views/Create.js),
  [`Edit.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/views/Edit.js).

See the screenshot below:
![Create Component](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter2_create.JPG)

#### Designs CreatedQueue, CreatedQueues, Expandable, ExpandableTable, QueueMultiview, InQueue, QueueMini components (Zack)

- Code found in [`CreatedQueue.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/CreatedQueue.js), [`CreatedQueues.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/CreatedQueues.js),
  [`Expandable.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/Expandable.js),
  [`ExpandableTable.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/ExpandableTable.js),
  [`InQueue.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/InQueue.js),
  [`InQueueMini.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/InQueueMini.js),
- Set state, created functions, and wrote render methods to build the components needed to display queues, queues that a user has joined and created.
- Added functionalities to expand and contract windows, change cursor on hover, open and close windows, and toggle table view.

<b>Screenshots:<b>

![Dashboard with ExpandableTable component](/readme_screenshots/iter2_dashboard_create_full.jpg)

![List of queues clickable to open Expandable component](/readme_screenshots/iter2_dashboard_createdqueues.jpg)

#### Makes Join a dynamic component and adds search bar (Nachiket)

- Code found in [`src/views/join.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/views/Join.js).
- Implements search bar so user can search for a queue by title
- Displays queues brought up by search bar
- Creates a "Join Queue" button that is disabled if a valid queue title is not found or the user is not logged in
- Join Queue button creates a new Item in the Items collection of the datatbase corresponding to the logged in user

<b>Screenshots:<b>

![Join component user not logged in](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter2_JoinButtonDisabled.JPG)

![Join component user logged in](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter2_Join_SearchBar_UserLoggedIn.JPG)

#### Google login / logout (Danielle)

- Code found in [`src/components/Login.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/Login.js).
- Utilized library `react-google-login` to implement signing in/out with Google account
- Handles when a user logs in with a Google account for the first time
  - A new User is created in the database with their credentials from Google
- Handles when a user has not signed in

  - components are empty - no data is displayed (see the screenshot below)

  ![Logged out view](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter2_dashboard_notloggedin.JPG)

#### Display detailed information about queues user is in (Danielle)

- Queries the database to grab all queues the user is in and displays each queue user is in.
- Code found in [`QueueMultiview.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/QueueMultiview.js).
- Displays detailed information about each queue
- Code found in [`src/components/InQueue.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/InQueue.js)
  - Progress bar dynamically rendered to show where user is in relation to their place in line.
  - Queue title, description, the user's item description for that queue, and when the queue will close is displayed

See the screenshot below:

![Queues user is in detailed information](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter2_InQueue_components.JPG)

#### Display detailed information about queues the user created (Tim)

- Queries the database to grab the queues the user created.
- Selects queue to come into view based on the id of the queue by lifting the state of the queue clicked on.
- Code found in [`CreatedQueue.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/CreatedQueue.js), [`CreatedQueueMini.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/CreatedQueueMini.js),[`CreatedQueues.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/CreatedQueues.js),
  [`ExpandableTable.js`](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-UI/blob/master/src/components/ExpandableTable.js).
  - Replaces fake data with queried stored data and optimizes outputs with map and loops methods.

</details>

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

### Summary of Work completed:

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

  ![Create Page](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter1_create.JPG)

- <strong>Read:</strong> The main dashboard page of the application shows the user queues they are currently in
  and a history of queues they had been in previously (queues they are no longer "Waiting" in).
  Queues are displayed in a timeline format giving the user perspective on where they are in reference
  to the end of the queue (and being served!)

  ![Main Dashboard](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter1_dashboard_new.JPG)

  The InQueue component giving the user perspective on where they are in reference to the end of the queue

  ![InQueue component](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter1_inQueue.JPG)

- <strong>Update:</strong> Currently our application supports many different update API's ranging from allowing
  a user to change their own information (such as their email), to allowing an item in the queue to be updated
  to change an item's status from "Waiting" to "Served." Other operations include updating queue information
  (such as updating a description or queue status), removing an item from the queue.

  ![Join a Queue](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-SpaceForce-API/blob/master/readme_screenshots/iter1_join.JPG)

- <strong>Delete:</strong> Our application also supports API's to delete an item in a queue and to delete
  an entire queue itself.

### Summary of Contributions

- API, original schema with resolver functions - Tim, Danielle, and Nachiket (see old_api folder)
- API, migration to Mongoose - Tim
- UI, initial setup - Zack
- UI, creation of InQueue, MultiviewQueue, Dashboard components - Zack
- UI, created GraphQLFetch function - Danielle
- UI, integrated Dashboard components InQueue and QueueMultiview with the database - Danielle
- UI, Create component - Tim
- UI, Join component and integrated Join with the UI - Nachiket

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
