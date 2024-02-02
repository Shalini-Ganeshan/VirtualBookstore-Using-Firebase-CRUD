import React from 'react';
import AddBook from './AddBook';
import BookList from './BookList';
import './App.css';
import { useState } from 'react';
import {Container,Navbar,Row,Col} from "react-bootstrap";



function App() {
  const [bookId,setBookId]=useState("");
   
  const getBookIdHandler=(id)=>{
    setBookId(id);
  console.log("id of book to be edited:",id);
}
  return (<>
  <Navbar bg="dark" variant="dark" className='header'><Container>
    <Navbar.Brand href="#home">Library-FireBase CRUD</Navbar.Brand>
  </Container>
  </Navbar>
  <Container style={{width:"400px"}}>
    <Row><Col>
    <AddBook id={bookId} setBookId={setBookId}/>
    </Col></Row>
  </Container>
  <Container style={{width:"400px"}}>
    <Row><Col>
    <BookList getBookId={getBookIdHandler}/>
    </Col></Row>
  </Container>
  </>   
  );
}

export default App;
