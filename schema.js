const { schemaComposer } = require('graphql-compose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const Queue = require('./models/queue');
const User = require('./models/user');
const Item = require('./models/item');

const QueueTC = composeWithMongoose(Queue, {});
const ItemTC = composeWithMongoose(Item, {});
const UserTC = composeWithMongoose(User, {});

// QueueTC.addResolver({
//   name: 'searchByTitle',
//   args: { title: 'String' },
//   type: QueueTC,
//   resolve: async ({ source, args }) => {
//     if (args.title) filter.$text = { $search: args.title };
//   },
// });

schemaComposer.Query.addFields({
  queueById: QueueTC.getResolver('findById'),
  queueByIds: QueueTC.getResolver('findByIds'),
  queueOne: QueueTC.getResolver('findOne'),
  queueMany: QueueTC.getResolver('findMany'),
  // queueCount: QueueTC.getResolver('count'),
  // queueConnection: QueueTC.getResolver('connection'),
  // queuePagination: QueueTC.getResolver('pagination'),

  itemById: ItemTC.getResolver('findById'),
  itemByIds: ItemTC.getResolver('findByIds'),
  itemOne: ItemTC.getResolver('findOne'),
  itemMany: ItemTC.getResolver('findMany'),
  // itemCount: ItemTC.getResolver('count'),
  // itemConnection: ItemTC.getResolver('connection'),
  // itemPagination: ItemTC.getResolver('pagination'),

  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  // userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
  queueCreateOne: QueueTC.getResolver('createOne'),
  queueCreateMany: QueueTC.getResolver('createMany'),
  queueUpdateById: QueueTC.getResolver('updateById'),
  queueUpdateOne: QueueTC.getResolver('updateOne'),
  queueUpdateMany: QueueTC.getResolver('updateMany'),
  queueRemoveById: QueueTC.getResolver('removeById'),
  queueRemoveOne: QueueTC.getResolver('removeOne'),
  queueRemoveMany: QueueTC.getResolver('removeMany'),
  // queueAddItem: QueueTC.addResolver({
  //   name: 'queueAddItem',
  //   type: QueueTC,
  //   args: { queueId: 'MongoID!', valueToPush: "Item" },
  //   resolve: async  (source, args, context, info) => {

  //  })

  itemCreateOne: ItemTC.getResolver('createOne'),
  itemCreateMany: ItemTC.getResolver('createMany'),
  itemUpdateById: ItemTC.getResolver('updateById'),
  itemUpdateOne: ItemTC.getResolver('updateOne'),
  itemUpdateMany: ItemTC.getResolver('updateMany'),
  itemRemoveById: ItemTC.getResolver('removeById'),
  itemRemoveOne: ItemTC.getResolver('removeOne'),
  itemRemoveMany: ItemTC.getResolver('removeMany'),

  userCreateOne: UserTC.getResolver('createOne'),
  userCreateMany: UserTC.getResolver('createMany'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
});

// Example way to add relationship to not have to work with just _id
// CompanyTC.addRelation('employees', {
//   resolver: () => EmployeeTC.getResolver('findByIds'),
//   prepareArgs: {
//     _id: source => source.employees || [],
//   },
//   projection: { employees: true },
// });

module.exports = schemaComposer.buildSchema();
