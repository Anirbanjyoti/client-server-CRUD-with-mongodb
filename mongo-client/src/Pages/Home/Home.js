import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    // .then((data) => console.log(data));
  }, []);

  const handleDeleteUser = (id) => {
    const proceed = window.confirm("Are you sure do you want to delete?");
    if (proceed) {
      console.log("User deleting thats ID is:", id);
      const url = `http://localhost:5000/user/${id}`;
      console.log(url);

      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            console.log("Deleted", data);
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          }
        });
    }
  };
  return (
    <div style={{ width: "500px", margin: "auto", marginTop: "50px" }}>
      <h3>Total User: {users.length}</h3>
      {users.map((user) => (
        <p key={user._id} style={{ display: "-webkit-inline-box" }}>
          <b>User Name:</b> {user.name}
          <b>Email:</b> {user.email}
          <p>
          {/* Delete user Button */}
            <button
              style={{ marginLeft: "10px", background: "red", color: "white" }}
              onClick={() => handleDeleteUser(user._id)}
            >
              X
            </button>
            {/* Update user Button */}
            <Link to={`/update/${user._id}`}>
              <button style={{ background: "orange", marginLeft: "10px" }}>
                Update User
              </button>
            </Link>
            {/* Add user Button */}
            <Link to={"/user/add"}>
              <button
                style={{
                  marginLeft: "10px",
                  background: "green",
                  color: "white",
                }}
              >
                Add User
              </button>
            </Link>
          </p>
        </p>
      ))}
    </div>
  );
};

export default Home;
