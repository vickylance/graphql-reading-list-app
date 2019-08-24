# Express graphql with REact apollo

To setup graphql for express we need 3 packages.

`npm i -save express graphql express-graphql`

Once its installed we can write the basic setup to spawn the express app.

```js
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({}));

app.set('PORT', 4000);
app.listen(app.get('PORT'), () => {
  console.log(`Server running on port: ${app.get('PORT')}`);
});
```

The express graphql middleware options needs a schema to work.
To create a schema lets create a folder called `schema` inside the `server` folder.
Then create a `schema.js` file inside it.
In this file we mention the graph structure for each and every type of object in our graph.

To create a graphql schema we need to define a `GraphQLObjectType` object. And then give it a name

```js
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
```

As you can see we cannot use the default `String` type in javascript, we have to use special `GraphQLString` to mention the type of the fields.

Now we need to create the `RootQuery` for our front end to allow to jump into various jump points in the graph and then make a query. We need the front end to jump into any book node. So we create our first field in the `RootQuery` as our `book` node and give it an argument to query a book by `id`.

Note: We also mention the type of the `book` node as the `BookType` what we defined above.

The resolve function is responsible for actually querying the db and fetching the data.

```js
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        // code to get data from db / other sources
      },
    },
  },
});
```

Now we can export the RootQuery as a `GraphQLSchema` to use it inside the express graphql middleware.

```js
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
...
module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

Now lets implement the resolve method. For that instead of an actual DB lets temporarily define a local data.

```js
const books = [{
  id: '1',
  name: 'Book1',
  genre: 'Sci-fi',
}, {
  id: '2',
  name: 'Book2',
  genre: 'Literature',
}, {
  id: '3',
  name: 'Book3',
  genre: 'Sci-fi',
}];
```

Now lets install `lodash` to find the books with the matching `id`.

`npm i lodash`

Here is the resolve method to find data by matching id that we get via the `args`.

```js
...
      resolve(parent, args) {
        // code to get data from db / other sources
        return _.find(books, { id: args.id });
      },
...
```

Now let's import the schema in index.js file and add it to graphqlHTTP.

```js
const schema = require('./schema/schema');
...
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
```

We will also add `graphiql: true` property because without it if we go to `http://localhost:4000/graphql` we will get an error stating it needs a query. So to make that endpoint to serve the graphiql client instead of just hard coded endpoint we need to pass the `graphiql` parameter as `true`.

Now when you go to `http://localhost:4000/graphql` and query for the below you should see your result.

```graphql
{
  book(id: "2") {
    name
    genre
  }
}
```

output:

```json
{
  "data": {
    "book": {
      "name": "Book2",
      "genre": "Literature"
    }
  }
}
```

Now we had to mention the `id` for the book as string with double quotes (single quotes wont work). But the id should also be of type Int so instead of `GraphQLString` we can use a specific type for this use case called `GraphQLID`. So we need to change the type in both the `BookType` and book field in `RootQuery`.

```js
const {
  ..., GraphQLID,
} = graphql;
...
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    ...
  }),
});
...
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
...
```

Now lets add the same for authors.

```js
const {
  ..., GraphQLInt,
} = graphql;
...
const authors = [{
  id: '1',
  name: 'Author1',
  age: 25,
}, {
  id: '2',
  name: 'Author2',
  age: 67,
}, {
  id: '3',
  name: 'Author3',
  age: 44,
}];

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other sources
        return _.find(authors, { id: args.id });
      },
    },
  },
});
```

After adding authors you should be able to query for authors as well. Notice we are using a new type for the age as `GraphQLInt`.
