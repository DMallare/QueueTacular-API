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


