# GraphQL 

- It is  Query Language to make api calls.
- Gives clients the power to ask for exactly what they need and nothing more.

## Problem that GraphQL Solves

- When we make an api call it servers all the data of the particular id from database.
- We use the required data and ignore the others data that we don't want to use or show.
- The problem is every time we call api then it serves all the data which is not required.

- To get the only required data from the database we use GraphQL, It serve the only neccessary that user wants.(reduce over-fetching of data)

- `!` used to define required field.


## What is Axios?
- A Javscript library used for making HTTP requests from web browsers and Node.js applications.

- Features : request and response interception, automatic transformation of JSON data, and the ability to cancel requests.


- Code :
    - ```javascript
        const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }
            type Todo {
                id: ID!
                title : String!
                completed: Boolean
                user: User
            },

            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }

            `,
            resolvers: {
            Todo: {
                user: async(todo) =>  (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
            },
            Query: {
                getTodos: async () =>{
                return (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;
                },
                getAllUsers: async () => {
                return (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
                },
                getUser: async (_, { id }) => {
                return (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data;
                },
            },
            },
        });

       
       ```