import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Sign from "./Sign";
import Login from "./Login";
import Post from "./Post";
import Caution from "./Caution";
import Noti from "./Noti";
import Review from "./Review";
import Topbar from "./Topbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/sign" element={<Sign/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/post" element={<Post/>}> </Route>
        <Route path="/caution" element={<Caution/>}> </Route>
        <Route path="/noti" element={<Noti/>}> </Route>
        <Route path="/review" element={<Review/>}> </Route>
        <Route path="/topbar" element={<Topbar/>}> </Route>

      </Routes>
    </div>
  );
}

export default App;
