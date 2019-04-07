const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

// sumber data
let forumData = [
  {id: "1", title: "cara belajar", desc: "bagaimana cara belajar yang baik?", userId: "1"},
  {id: "2", title: "apa sekarang", desc: "sekarang harus belajar apa", userId: "2"},
  {id: "3", title: "mulai dari mana", desc: "saya bingung darimana", userId: "1"},
]

let userData = [
  {id: "1", name: "Heru"},
  {id: "2", name: "Fadlan"}
]

let schema = buildSchema(`
  type Forum {
    id: ID,
    title: String,
    desc: String,
    user: User
  }

  type User {
    id: ID,
    name: String,
    forums: [Forum]
  }

  type Query {
    user(id: ID!): User,
    users: [User]
    forum(id: ID!): Forum,
    forums: [Forum]
  }
`)

let resolvers = {
  user: (args) => {
    let _user = userData.find(el => el.id == args.id)
    let _forums = forumData.filter(el => el.userId == _user.id)
    _user['forums'] = _forums

    return _user
  },

  users: () => {
    let _forums = ''
    userData.map(
      (eachUser) => {
        _forums = forumData.filter(el => el.userId == eachUser.id)
        eachUser['forums'] = _forums
      }
    )
    return userData
  },

  forum: (args) => {
    let _forum = forumData.find(el => el.id == args.id)
    let _user = userData.find(el => el.id == _forum.id)
    _forum['user'] = _user

    return _forum
  },

  forums: () => {
    let _user = ''

    // loop forum dan masukkan data user
    forumData.map(
      (eachForum) => {
        _user = userData.find(el => el.id == eachForum.userId)
        eachForum['user'] = _user
      }
    )

    return forumData
  }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(4000, ()=> console.log('Server Runing On 127.0.0.1:4000'))