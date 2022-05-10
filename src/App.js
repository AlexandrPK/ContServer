import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { logout } from "./redux/authSlice";

import "./styles/App.css";
import "./style.css";

import axios from "axios";
import { message } from "antd";

import "antd/dist/antd.css";

import { Layout, Menu } from "antd";

import AllCourse from "./pages/AllCourse";
import CheckTasks from "./pages/CheckTasks";
import Students from "./pages/Students";
import Login from "./pages/Login";
import Regist from "./pages/Regist";
import PasswordChange from "./pages/PasswordChange";
import Task from "./pages/TaskCourse";
import BankTasks from "./pages/BankTasks";
import MyCourse from "./pages/MyCourse";
import MyScores from "./pages/MyScores";
import Groups from "./pages/Groups";
import Logout from "./pages/Logout";
import LayoutMenu from "./layout/LayoutMenu";

function App() {
  const data = JSON.parse(localStorage.getItem("userData"));

  return (
  <LayoutMenu/>
  )
}

export default App;
