# GroupProject-SpaceForce-API


### Queries

#### Add to a queue
mutation {
  addQueue(newQueue:{
    owner: "Ellie",
    title: "Ellie's office hours",
    description: "CS 5006 office hours",
    }){
      id
      title
      owner
      description
      status
  }
 
}

#### Update a queue
mutation{
  queueUpdate(id: 3, changes:{
    maxWaitTime: 60
    }){
      id
      title
      owner
      description
      status
      maxParticipants
      maxWaitTime
  }
}

#### show a queue
query showQueue($id: Int!) {
  showQueue(id: $id) {
    title
    items {
      name
    }  
  }
}

#### show a queue item
query showItemByIds($queueID: Int!, $itemID:Int!) {
  showItem(queueID: $queueID, itemID: $itemID) {
  	status description
    name wait
  } 
}

QUERY VARIABLES
{
  "queueID": 2,
  "itemID": 2
}

#### Update an item in a specific queue
mutation{
  itemUpdate(queueID: 1, itemID: 2, changes:{
    status: Waiting,
    description: "description here..."
    }){
    // Not sure what goes in here.. its not working, TBA
  }
}


### delete a queue
mutation deleteQueueById {
  deleteQueue(id: 1)
}

### delete a queue item
mutation deleteQueueItemByIds {
  deleteItem (queueID: 2, queueItemID: 1)
}