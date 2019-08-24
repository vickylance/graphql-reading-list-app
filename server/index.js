require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mongo db atlas
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('DB Connected');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.set('PORT', 4000);
app.listen(app.get('PORT'), () => {
  console.log(`Server running on port: ${app.get('PORT')}`);
});
