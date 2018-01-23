const DATABASE_URL = 'http://localhost:4000/'
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//hard coded data for testing

// const users = [
//     { _id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35 },
//     { _id: '2', name: 'Steve Smith', email: 'steve@gmail.com', age: 25 },
//     { _id: '3', name: 'Sara Williams', email: 'sara@gmail.com', age: 32 },
// ]

// Customer Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                _id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                //RESOLVE!!
                return axios.get(DATABASE_URL + args._id)
                    .then(res => res.data);
            }
        }
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt }
                // the **new GraphQLNonNull** make it required
            },
            resolve(parentValue, args) {
                return axios.post(DATABASE_URL, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                    .then(res => res.data);
            }
        },
        deleteUser: {
            type: UsesrType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete(DATABASE_URL + args._id)
                    .then(res => res.data);
            }
        },
        editUser: {
            type: UserType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parentValue, args) {
                return axios.patch(DATABASE_URL + args._id, args)
                    .then(res => res.data);
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});