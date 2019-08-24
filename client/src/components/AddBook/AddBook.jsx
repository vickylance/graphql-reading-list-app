import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALL_AUTHORS, ADD_BOOK, GET_ALL_BOOKS } from "../../queries";
import './AddBook.scss';

function AddBook() {
  const [bookName, setBookName] = useState();
  const [authorId, setAuthorId] = useState();
  const [genre, setGenre] = useState();

  const {
    loading: loadingAuthors,
    error: errorAuthors,
    data: authorsData
  } = useQuery(GET_ALL_AUTHORS);

  const [
    addBook,
    { loading: addingBook, error: errorAddingBook, data: addedBook }
  ] = useMutation(ADD_BOOK);

  const getAuthors = () => {
    if (loadingAuthors) return <option>Loading Authors.</option>;
    if (errorAuthors) return <option>Error Loading Authors :(</option>;

    return [
      <option value="" key="0">Select Author</option>,
      ...authorsData.authors.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))
    ];
  };

  const addBookHandler = e => {
    e.preventDefault();
    addBook({
      variables: { name: bookName, genre: genre, authorId: authorId },
      refetchQueries: [{
        query: GET_ALL_BOOKS,
      }]
    });
    setBookName('');
    setAuthorId('');
    setGenre('');
  };

  return (
    <form id="add-book" onSubmit={addBookHandler}>
      <div className="field-inputs">
        <div className="field">
          <label htmlFor="book-name">Book Name:&nbsp;</label>
          <input
            type="text"
            name="book-name"
            onChange={e => setBookName(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="genre">Genre:&nbsp;</label>
          <input
            type="text"
            name="genre"
            onChange={e => setGenre(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="author-name">Author:&nbsp;</label>
          <select name="author-name" onChange={e => setAuthorId(e.target.value)}>
            {getAuthors()}
          </select>
        </div>
      </div>

      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
