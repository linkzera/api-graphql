import { ApolloServer, gql } from "apollo-server"
import { randomUUID } from "node:crypto"

interface User {
  id: string
  name: string
}

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    users: [User]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`
const users: User[] = []
const server = new ApolloServer({
  typeDefs,

  resolvers: {
    Query: {
      users: () => users,
    },
    Mutation: {
      createUser: (_parent, args, _ctx) => {
        const user: User = { id: randomUUID(), name: args.name }
        users.push(user)
        return user
      },
    },
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
