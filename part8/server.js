const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server")
const { v1: uuid } = require("uuid")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require("jsonwebtoken")

const MONGODB_URI = process.env.MONGODB_URI

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to DB"))
  .catch(err => console.log(err.message))

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate("author")
      } else {
        return Book.find({}).populate("author")
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser } = context
      if (!currentUser) {
        throw new AuthenticationError("not authenticated to add books")
      }

      try {
        let author = await Author.findOne({ name: args.author })
        // if author doesn't exist
        if (!author) {
          author = new Author()
          const book = new Book({ ...args, author: null })
          await book.save()
          const newAuthor = new Author({
            name: args.author,
            born: null,
            books: [book._id],
            bookCount: 1,
          })
          await newAuthor.save()
          book.author = newAuthor._id
          await book.save()

          const bookToReturn = await Book.findOne({
            title: args.title,
          }).populate("author")

          return bookToReturn
        } else {
          // if author exists in DB
          const book = new Book({ ...args, author: author._id })
          author.books.concat(book._id)
          await book.save()
          await author.save()
          const bookToReturn = await Book.findOne({
            title: args.title,
          }).populate("author")
          return bookToReturn
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args, context) => {
      const { currentUser } = context
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw (
          (new UserInputError(error.message),
          {
            invalidArgs: args,
          })
        )
      }
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "fso2021") {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {
        currentUser,
      }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
