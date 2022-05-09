import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import "./styles/App.css";
import "./style.css";

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

function App() {

  const { Header, Content, Footer } = Layout;
  const isAuth = useSelector((state) => state.auth.isAuth)  

  return (
    <div className="App">
      <Layout style={{ background: "#fff" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            style={{ lineHeight: "64px", display: "flex" }}
          >
            <Menu.Item key="0">
              <Link to="/mycourses">Мои курсы </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/courses">Курсы </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/banktasks">Банк заданий </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/check">Проверка </Link>
            </Menu.Item>
            <Menu.Item key="4">
              {" "}
              <Link to="/students">Студенты </Link>
            </Menu.Item>

            <Menu.Item key="5">
              {" "}
              <Link to="/login">Логин </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/reg">Регистрация </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/passwordChange">Смена пароля</Link>
            </Menu.Item>
            {isAuth===true? "": 
              <Menu.Item key="8">
              <Link to="/">Выйти</Link>
              </Menu.Item>
            }
          </Menu>
        </Header>

        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Routes>
            <Route path="/mycourses" element={<MyCourse />} />
            <Route path="/courses" element={<AllCourse />} />
            <Route path="/banktasks" element={<BankTasks />} />
            <Route path="/courses/:id" element={<Task />} />
            <Route path="/check" element={<CheckTasks />} />
            <Route path="/students" element={<Students />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Regist />} />
            <Route path="/passwordChange" element={<PasswordChange />} />
          </Routes>
        </Content>



      </Layout>
    </div>
  );
}

export default App;
