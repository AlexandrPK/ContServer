import React, { useState} from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./styles/App.css";
import "./style.css";

import AllCourse from "./pages/AllCourse";
import CheckTasks from "./pages/CheckTasks";
import Students from "./pages/Students";
import Login from "./pages/Login";
import Regist from "./pages/Regist";

function App() {

  return (
    <div className="App">
    <header style={{
      margin : "10px  0px 10px 0px",
      display: "flex",
      justifyContent: "space-between",
       }}>
    
    <Link to="/courses" >Курсы </Link>
    <Link to="/check" >Проверка </Link>
    <Link to="/students" >Студенты </Link>
    <Link to="/login" >Логин </Link>
    <Link to="/reg" >Регистрация </Link>
    </header>
    <Routes>
       <Route path="/courses" element = {<AllCourse/>}/>
       <Route path="/check" element = {<CheckTasks/>}/>
       <Route path="/students" element = {<Students/>}/>
       <Route path="/login" element = {<Login/>}/>
       <Route path="/reg" element = {<Regist/>}/>
    </Routes>
      
    </div>
  );
}

export default App;
