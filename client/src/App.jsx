import React, { useState, useEffect } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { AddBook, BooksList, BookDetails } from './components'
import './App.scss';


function App() {
  const [selectedBook, setSelectedBook] = useState();

  useEffect(() => {
    console.log(selectedBook)
  }, [selectedBook]);

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <main id="main">
          <h1>Vickylance Book Reading List</h1>
          <BooksList setSelectedBook={setSelectedBook} />
          <AddBook />
        </main>
        <div id="book-details">
          {selectedBook ? <BookDetails selectedBook={selectedBook} /> : <div>No Books selected!</div>}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
