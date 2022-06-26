// import logo from './logo.svg';
import './App.css';
import AddUser from './Pages/AddUser/AddUser';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import UpdateUser from './Pages/UpdateUser/UpdateUser';
import Header from './Pages/Header/Header';

function App() {
  return (
    <div>
        <Header></Header>
        <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/user/add" element={<AddUser></AddUser>} />
        <Route path="/update/:id" element={<UpdateUser></UpdateUser>} />
      </Routes>
    </div>
  );
}

export default App;
