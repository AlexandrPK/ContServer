import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./styles/App.css";
import "./style.css";

import "antd/dist/antd.css";

import { Layout, Menu } from "antd";

import AllCourse from "./pages/AllCourse";
import CheckTasks from "./pages/CheckTasks";
import Students from "./pages/Students";
import Login from "./pages/Login";
import Regist from "./pages/Regist";

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <div className="App">
      <Layout style={{ background: "#fff" }}>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px", display: "flex", }}
          >
            <Menu.Item key="0">
              <Link to="/courses">Курсы </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/check">Проверка </Link>
            </Menu.Item>
            <Menu.Item key="3">
              {" "}
              <Link to="/students">Студенты </Link>
            </Menu.Item>

            <Menu.Item key="4" >
              {" "}
              <Link to="/login">Логин </Link>
            </Menu.Item>
            <Menu.Item key="5" >
              <Link to="/reg">Регистрация </Link>
            </Menu.Item>

          </Menu>
        </Header>

        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <Routes>
            <Route path="/courses" element={<AllCourse />} />
            <Route path="/check" element={<CheckTasks />} />
            <Route path="/students" element={<Students />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Regist />} />
          </Routes>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
