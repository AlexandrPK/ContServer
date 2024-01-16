import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

import "../styles/App.css";
import "../style.css";

import axios from "axios";

import 'antd/dist/antd.css';

import { message, Layout, Menu } from 'antd';

import AllCourse from "../pages/AllCourse";
import CheckTasks from "../pages/CheckTasks";
import Students from "../pages/Students";
import Login from "../pages/Login";
import Regist from "../pages/Regist";
import PasswordChange from "../pages/PasswordChange";
import TaskCourse from "../pages/TaskCourse";
import BankTasks from "../pages/BankTasks";
import MyCourse from "../pages/MyCourse";
import MyScores from "../pages/MyScores";
import Scores from "../pages/Scores";
import Groups from "../pages/Groups";
import Logout from "../pages/Logout";
import TaskPage from "../pages/TaskPage";
import TaskPageEdit from "../pages/TaskPageEdit";
import AllCourseToScore from "../pages/AllCourseToScore";

function LayoutMenu(props) {
  const data = {auth: true}

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutHandler = async () => {
    await localStorage.setItem(
      "userData",
      JSON.stringify({
        token: "dddd",
      })
    );
    dispatch(logout());
  };

  const { Header, Content } = Layout;

  return (
    <div className="App">
      <Layout style={{ background: "#fff" }}>
        <Header style={{ position: "fixed", zIndex: 1000, width: "100%" }}>
          <div className="logo" />
          {data.auth==="true" ? (
            data.roleID == 1 ? (
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["0"]}
                style={{ lineHeight: "64px", display: "flex" }}
              >
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
                  <Link to="/scores">Оценки</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/students">Студенты </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/groups">Группы </Link>
                </Menu.Item>
                <Menu.Item key="7" style={{ marginLeft: "auto" }}>
                  <Link to="/logout">Выйти</Link>
                </Menu.Item>
              </Menu>
            ) : (
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
                  <Link to="/myscores">Мои оценки</Link>
                </Menu.Item>
                <Menu.Item key="2" style={{ marginLeft: "auto" }}>
                  <Link to="/logout">Выйти</Link>
                </Menu.Item>
              </Menu>
            )
          ) : (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["0"]}
              style={{ lineHeight: "64px", display: "flex", zIndex: "100" }}
            >
              <Menu.Item key="0">
                <Link to="/login">Войти </Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/reg">Регистрация </Link>
              </Menu.Item>
            </Menu>
          )}
        </Header>

        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          {data.auth==="true" ? (
            data.roleID == 1 ? (
              <Routes>
                <Route path="/" element={<AllCourse />} />
                <Route path="/courses" element={<AllCourse />} />
                <Route path="/courses/:id" element={<TaskCourse />} />
                <Route path="/scores" element={<Scores/>} />
                <Route path="/scores/:id" element={<TaskCourse />} />
                <Route path="/scores/:id/:id" element={<TaskCourse />} />
                <Route path="/banktasks" element={<BankTasks />} />
                <Route path="/banktasks/:id" element={<TaskPageEdit />} />
                <Route path="/check" element={<CheckTasks />} />
                <Route path="/students" element={<Students />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/passwordChange" element={<PasswordChange />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<MyCourse />} />
                <Route path="/myscores" element={<MyScores />} />
                <Route path="/mycourses" element={<MyCourse />} />
                <Route path="/mycourses/:id" element={<TaskCourse />} />
                <Route path="/mycourses/:id/:idtask" element={<TaskPage />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            )
          ) : (
            <Routes>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reg" element={<Regist />} />
              <Route path="/" element={<Login />} />
            </Routes>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default LayoutMenu;
