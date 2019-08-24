import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOK_DETAILS } from '../../queries';

const BookDetails = ({ selectedBook: bookId }) => {
  const {
    loading: loadingBookDetails,
    error: errorBookDetails,
    data
  } = useQuery(GET_BOOK_DETAILS, {
    variables: {
      id: bookId
    }
  });
  
  const displayBookDetails = () => {
    if(loadingBookDetails) {
      return (
        <div>Fetching Book Details...</div>
      );
    }
    const { book: bookDetails } = data;
    return (
      <>
        <h2>{bookDetails.name}</h2>
        <p>{bookDetails.genre}</p>
        <p>{bookDetails.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {bookDetails.author.books.map(item => {
            return (
              <li key={item.id}>{item.name}</li>
            )
          })}
        </ul>
      </>
    );
  }
  
  return (
    <>
      {displayBookDetails()}
    </>
  );
}

export default BookDetails;