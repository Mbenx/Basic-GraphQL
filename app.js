const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

// sumber data
let sumberData = [
  {id: "1", title: "cara belajar", desc: "bagaimana cara belajar yang baik?"},
  {id: "2", title: "apa sekarang", desc: "sekarang harus belajar apa"},
  {id: "3", title: "mulai dari mana", desc: "saya bingung darimana"},
]

let schema = buildSchema(`
  type Forum {
    id: ID,
    title: String,
    desc: String
  }

  type Query {
    forums: [Forum]
  }
`)

let resolvers = {
  forums: () => {
    return sumberData
  }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(4000, ()=> console.log('Server Runing On 127.0.0.1:4000'))