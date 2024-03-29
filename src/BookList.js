import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import BookDataService from './services/bookservices.js';
import { useState } from 'react';

const BookList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <Button onClick={handleRefresh}>Refresh Books</Button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Author Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => (
            <tr key={doc.id}>
              <td>{index + 1}</td>
              <td>{doc.title} </td>
              <td>{doc.author}</td>
              <td>{doc.status}</td>
              <td>
                <Button variant='secondary' className='edit' onClick={(e) => getBookId(doc.id)}>
                  Edit
                </Button>
                <Button variant='danger' className='delete' onClick={(e) => deleteHandler(doc.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookList;
