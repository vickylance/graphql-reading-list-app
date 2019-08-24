import { gql } from "apollo-boost";

export const GET_ALL_AUTHORS = gql`
{
  authors {
    id
    name
  }
}`;

export const GET_ALL_BOOKS = gql`
{
  books {
    id
    name
    genre
  }
}`;

export const ADD_BOOK = gql`
mutation($name: String!, $genre: String!, $authorId: ID!) {
  addBook(name: $name, genre: $genre, authorId: $authorId) {
    name
    id
  }
}`;

export const GET_BOOK_DETAILS = gql`
query($id: ID!){
  book(id: $id) {
    id
    name
    genre
    author {
      id
      name
      age
      books {
        id
        name
      }
    }
  }
}`;
