import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

import { Link, useNavigate } from "react-router-dom";
import Layout, { Header } from "antd/lib/layout/layout";
import { useParams } from "react-router-dom";

import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import { message, Row, Col, Space, Button, Form, Input, Select } from "antd";
import MarkdownEditor from "../components/Editor/MarkdownEditor";
import Markdown from "react-markdown";

const TaskPageEdit = () => {
  const { id } = useParams();

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

  const [posts, setPosts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  //TODO получение постов

  async function fetchPosts() {
    const response = await axios.get(
      "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/get/" +
        id,
      { headers: { Authorization: data.token } }
    );
    setPosts(response.data);
    setMarkdownContent(response.data.task.description);
    console.log(response.data);
    setisLoading(false);
    // .then((response) => {
    //   console.log(response.data);
    //   setPosts(response.data);
    //   setMarkdownContent(response.data.description)
    // })
    // .catch((error) => {
    //   message.error(error.message);
    //   onLogoutHandler();
    //   console.log(isAuth);
    //   navigate("/login");
    // });
  }

  async function UpdateTask(values) {
    await axios
      .post(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/updateTask",
        {
          description: values.description,
          id: values.id,
          name: values.name,
          solution: values.solution,
          taskTypeId: values.taskTypeId,
        },
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        console.log(response.data);
        message.success("Задание изменено");
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  const onFinish = (values) => {
    UpdateTask(values);
    // console.log(values);
  };

  // async function updateTask() {
  //   await axios
  //     .get(
  //       "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/get/" +
  //         id,
  //       { headers: { Authorization: data.token } }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setPosts(response.data);
  //       setMarkdownContent(response.data.description)
  //     })
  //     .catch((error) => {
  //       message.error(error.message);
  //       onLogoutHandler();
  //       console.log(isAuth);
  //       navigate("/login");
  //     });
  // }
  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        width: "auto",
        height: "auto",
      }}
    >
      <Content>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <Layout style={{ backgroundColor: "white", overflow: "hidden" }}>
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
                <div
                  style={{
                    padding: "13px",
                    height: "680px",
                    overflow: "scroll",
                    zIndex: 1,
                  }}
                >
                  <h1>{posts.task.name}</h1>
                  <Markdown children={markdownContent} />
                </div>
              </Col>
              <Col
                style={{
                  overflow: "scroll",
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
                <h1>Текст задания</h1>
                <div style={{ overflow: "hidden" }}>
                  <MarkdownEditor
                    value={markdownContent}
                    onChange={setMarkdownContent}
                  />
                </div>
                <div style={{ height: "auto", overflow: "scroll", marginTop: "10px"}}>
                  <div style={{ height: "auto", overflow: "scroll" }}>
                    <Form
                      name="basic"
                      layout="vertical"
                      initialValues={{
                        remember: true,
                        description: markdownContent,
                        id: posts.task.id,
                        name: posts.task.name,
                        solution: posts.task.solution,
                        taskTypeId: posts.task.taskTypeId,
                      }}
                      onFinish={onFinish}
                    >
                      <Form.Item
                        label="Текст задания"
                        name="description"
                        rules={[
                          { required: true, message: "Введите текст задания" },
                        ]}
                      >
                        <TextArea rows={3} />
                      </Form.Item>

                      <Form.Item
                        label="ID задания"
                        name="id"
                        rules={[
                          { required: true, message: "Введите id задания" },
                        ]}
                      >
                        <Input disabled />
                      </Form.Item>
                      <Form.Item
                        label="Заголовок задания"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Введите заголовок задания",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Решение"
                        name="solution"
                        rules={[{ required: true, message: "Введите решение" }]}
                      >
                        <TextArea rows={3} />
                      </Form.Item>
                      <Form.Item
                        label="Тип задания"
                        name="taskTypeId"
                        rules={[
                          {
                            required: true,
                            message: "Выберите сложность ",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: 200 }}
                          // onChange={handleChange}
                        >
                          <Option value="1">1.Тест</Option>
                          <Option value="2">2.Автоматическая проверка</Option>
                          <Option value="3">3.Ручная проверка</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Применить изменения
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </Layout>
        )}
      </Content>
    </div>
  );
};

export default TaskPageEdit;
