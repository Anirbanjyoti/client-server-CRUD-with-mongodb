import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  // event handler
  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    const user = { name, email };
    // send data to server
    fetch("http://localhost:5000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        toast("User Added Successfully", data);
        event.target.reset();
      });
  };

  return (
    <div>
      <div style={{ width: "600px", margin: "auto" }}>
        <h1>Please add a User</h1>
        <Form onSubmit={handleAddUser}>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter email" name='name' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add User
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
