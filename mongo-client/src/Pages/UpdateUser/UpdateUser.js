import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const {id} = useParams();
    const [user, setUser] =useState({});
    const url = `http://localhost:5000/user/${id}`
    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>setUser(data))
    }, [url])
    // Update user Handler
    const handleUpdateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
    
        const updatedUser = { name, email };
        // Update and replace  data to server
        const url = `http://localhost:5000/user/${id}`
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((response) => response.json())
          .then((data) => {
            toast("User Successfully updated", data);
            event.target.reset();
          });
      };
    return (
        <div>
           
            <div style={{ width: "600px", margin: "auto" }}>
            <h1>Update User: {user.name}</h1>
        <Form onSubmit={handleUpdateUser}>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter email" name='name' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update User
          </Button>
        </Form>
      </div>
      <ToastContainer />
        </div>
    );
};

export default Update;