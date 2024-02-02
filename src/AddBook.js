
import React,{useState,useEffect} from 'react'
import {Form,Alert,InputGroup,Button,ButtonGroup} from "react-bootstrap";
import BookDataService from './services/bookservices';
import academics from './academics.png';
import './App.css';

const AddBook = ({id,setBookId}) => {
    const[title,setTitle]=useState("");
    const[author,setAuthor]=useState("");
    const [status,setStatus]=useState("Available");
    const[myflag,setMyflag]=useState(false);
    const [flag,setFlag]=useState(true);
    const [message,setMessage]=useState({error:false,msg:""});
    const newBook = {
        title,
        author,
        status
      };
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setMessage("");
        if(title==="" || author===""){
            setMessage({error:true,msg:"All fields are mandatory!"});
            return;
        }
        const newBook={
            title,author,status
        }
        console.log(newBook);
        try{
            if(id!==undefined &&id !==""){
                await BookDataService.updateBook(id,newBook);
                setBookId("");
                setMessage({error:false,msg:"Updated successfully!"});

            }
            else{
                await BookDataService.addBook(newBook);
                setMessage({error:false,msg:"New Book added successfully!"})
                setMyflag(true);
            setTimeout(()=>{setMyflag(false)},3000);
    

            }
       
           
        }
        catch(err){
            setMessage({error:true,msg:err.message});
            }
            setTitle("");
            setAuthor("");

    }
    useEffect(()=>{
        if(id !==undefined && id!==""){
            editHandler();
        }
    },[id])
    const editHandler=async()=>{
        setMessage("");
        try{
            const docSnap=await BookDataService.getBoook(id);
            setTitle(docSnap.data().title);
            setAuthor(docSnap.data().author);
            setStatus(docSnap.data().status);
        }
        catch(err){
            setMessage({error:true,msg:err.message});
        }

    }
  return (

    <>
    <div className='p-4 box'>
{message?.msg && (<Alert variant={message?.error?"danger":"success"} dismissible onClose={()=>setMessage("")}>{" "}{message?.msg}</Alert>)}
   
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId="formBookTitle">
            <InputGroup>
            <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
            <Form.Control
            type="text"
            placeholder='Book Title'
            value={title}
            onChange={(e)=>setTitle(e.target.value)} />
            </InputGroup>
            </Form.Group>
            
            <Form.Group className='mb-3' controlId="formBookAuthor">
            <InputGroup>
            <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
            <Form.Control
            type="text"
            placeholder='Author'
            value={author}
            onChange={(e)=>setAuthor(e.target.value)} />
            </InputGroup>
            </Form.Group>
            <ButtonGroup aria-label="Basic example" className='mb-3'>
            <Button disabled={flag}
            variant="success"
            onClick={(e)=>{
                setStatus("Available");
                setFlag(true);
            }} >Available</Button>
            <Button variant='danger' disabled={!flag}
            onClick={(e)=>{
                setStatus("Not Available");
                setFlag(false);

            }}>Not Available
            </Button></ButtonGroup>
            <div className='d-grid gap-2'><div>
            <img  className={myflag?'animate':''} id="book" src={academics} alt="bookicon" />
           </div>
            <Button variant='primary' type='Submit' >
            Add/Update</Button></div></Form></div>
        </>
    

    
  )
}

export default AddBook