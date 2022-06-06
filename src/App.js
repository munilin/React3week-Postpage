import React from "react";
import { Routes, Route } from "react-router-dom";
import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Post from "./Post";
import Caution from "./Caution";
import Noti from "./Noti";
import Review from "./Review";
import Topbar from "./Topbar";

function App() {

  const [is_login, setIsLogin] = React.useState(false);

  console.log(auth.currentUser)

  const loginCheck = async (user) => {
    if(user) {
      setIsLogin(true);
    }else{
        setIsLogin(false)
      }
    };
  
  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck)
  },[]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/> 
        <Route path="/login" element={<Login/>}/> 
        <Route path="/post" element={<Post/>}/> 
        <Route path="/caution" element={<Caution/>}/> 
        <Route path="/noti" element={<Noti/>}/> 
        <Route path="/review" element={<Review/>}/> 
        <Route path="/topbar" element={<Topbar/>}/> 
      </Routes>
    </div>
  );
}

export default App;
