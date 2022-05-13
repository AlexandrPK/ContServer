import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

import { Link, useNavigate } from "react-router-dom";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import Layout, { Header } from "antd/lib/layout/layout";
import { useParams } from "react-router-dom";
import TasksCourse from "../components/TasksCourse";

import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import GroupItem from "../components/GroupItem";
import { message, Row, Col, Space, Button } from "antd";
import SQLEditor from "../components/Editor/SQLEditor";
import Markdown from "react-markdown";

const TaskPage = () => {
  const { idtask, id } = useParams();
  // console.log("ig",idtask)

  const data = JSON.parse(localStorage.getItem("userData"));
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const onLogoutHandler = async () => {
    await localStorage.setItem(
      "userData",
      JSON.stringify({
        token: "dddd",
      })
    );
    dispatch(logout());
    console.log(isAuth);
    console.log(data);
  };

  const [posts, setPosts] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");

  //TODO получение постов

  async function fetchPosts() {
    await axios
      .get(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/get/" +
          idtask +
          "/" +
          id,
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        console.log("response-->", response.data);
        setPosts(response.data);
        setisLoading(false);
        // console.log("posts",posts);/
      })
      .catch((error) => {
        message.error(error.message);
        // onLogoutHandler();
        // console.log(isAuth);
        // navigate("/login");
      });
  }

  useEffect(() => {
    fetchPosts();
    console.log("posts", posts);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        overflow: "hidden",
        width: "auto",
        height: "auto",
      }}
    >
      <Content>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
     
        <Layout style={{ backgroundColor: "white" }}>
        <Row style={{ height: "100vh", margin: "10px" }} wrap={false}>
          <Col
            style={{
              height: "auto",
              width: "40vw",
              marginRight: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "1px solid #cccecf",
              borderRadius: "6px",
            }}
            span={12}
          >
            <div style={{ height: "auto", overflow: "scroll" }}>
            <h1>{posts.task.name}</h1>
            <Markdown children={posts.task.description} />

            </div>
          </Col>
          <Col
            style={{
              height: "auto",
              width: "50vw",
              marginRight: "5px",
              padding: "10px",
              backgroundColor: "white",
              border: "1px solid #cccecf",
              borderRadius: "6px",
            }}
            span={12}
          >
            <h1>Ответ на задание</h1>
            <div style={{ overflow: "hidden" }}>
              <SQLEditor
                value={markdownContent}
                onChange={setMarkdownContent}
              />
            </div>
            <h1>Возвращение ответа</h1>
            <div style={{ height: "auto", overflow: "scroll" }}>
              <Space>
                <Button type="primary" loading>
                  Запустить код
                </Button>
                <Button type="primary">Отправить решение</Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Layout>
        

      )}
      </Content>
    </div>
  );
};

export default TaskPage;
