import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_BOOKS } from "../../queries";

const BooksList = ({ setSelectedBook }) => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div id="book-list">
      {data.books.map(({ id, name, genre }) => (
        <li key={id} onClick={() => setSelectedBook(id)}>
          <p>
            Name: {name} <br />
            Genre: {genre}
          </p>
        </li>
      ))}
    </div>
  );
}

export default BooksList;