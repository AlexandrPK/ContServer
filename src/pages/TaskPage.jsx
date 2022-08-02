import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Form, Select, Checkbox, Table } from "antd";

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
  const [attempt, setAttempt] = useState(null);
  const [attemptScore, setAttemptScore] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingAttempt, setisLoadingAttemptg] = useState(true);
  const [isLoadingAttemptScore, setisLoadingAttemptgScore] = useState(true);
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

  async function AddSQLAttempt() {
    await axios
      .post(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/score/addSQLAttempt",
        { taskId: posts.task.id, courseId: id, solution: markdownContent },
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        // message.success(response.timeout);
        console.log(response.data);
        setAttempt(response.data);
        setisLoadingAttemptg(false);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  async function AddSQLAttemptTask() {
    await axios
      .post(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/score/addSQLAttempt",
        { taskId: posts.task.id, courseId: id, solution: markdownContent },
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        console.log(response.data);
        message.success("Задание отправлено на проверку");
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  async function AddSQLAttemptScore() {
    await axios
      .post(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/score/addSQLAttemptScore",
        { taskId: posts.task.id, courseId: id, solution: markdownContent },
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        // message.success(response.timeout);
        console.log(response.data);
        setAttemptScore(response.data);
        setisLoadingAttemptgScore(false);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  function onFinish(values) {
    // .then(fetchPosts())
    console.log("Received values of form: ", values);
  }

  const onFinishFailed = (errorInfo) => {};

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
            {posts.task.taskTypeId === 1 ? (
              <div>
                <h2>{posts.task.name}</h2>
                <Markdown children={posts.task.description} />

                <Form
                  name="solution_variant"
                  onFinish={onFinish}
                  initialValues={{}}
                >
                  <Form.Item name="checkbox-group">
                    <Checkbox.Group>
                      {posts.solutionVariants.map((solution) => (
                        <Row>
                          <Col span={8}>
                            <Checkbox
                              key={solution.id}
                              value={solution.id}
                              style={{
                                lineHeight: "32px",
                              }}
                            >
                              {solution.solution} <br />{" "}
                            </Checkbox>
                          </Col>
                        </Row>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Ответить
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            ) : (
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
                  <div>
                    {isLoadingAttempt ? (
                      ""
                    ) : (
                      <div>
                        <h1>Результат запуска кода</h1>

                        {attempt.openResult !== null ? (
                          <table>
                            {attempt.openResult.map((item) => (
                              <tr>
                                {item.map((list) => (
                                  <td>
                                    {list} {""}
                                  </td>
                                ))}{" "}
                              </tr>
                            ))}
                          </table>
                        ) : (
                          ""
                        )}

                        <p>
                          Cледующий запуск кода будет доступен через{" "}
                          {attempt.timeout / 1000} сек
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    {isLoadingAttemptScore ? (
                      ""
                    ) : (
                      <div>
                        <h1>Проверка</h1>
                        {attemptScore.results.length > 1 ? (
                          <div>
                            <p>
                              Открытые тесты: {attemptScore.results[0].success.toString()}
                            </p>
                            <p>
                              Закрытые тесты: {attemptScore.results[1].success.toString()}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}

                        <p>
                          Cледующая отправка попытки будет доступена через{" "}
                          {attemptScore.timeout / 1000} сек
                        </p>
                      </div>
                    )}
                  </div>
                  <div style={{ height: "auto", overflow: "scroll" }}>
                    <Space>
                      {posts.task.taskTypeId === 2 ? (
                        <Space>
                          <Button type="primary" onClick={AddSQLAttempt}>
                            Запустить код
                          </Button>
                          <Button type="primary" onClick={AddSQLAttemptScore}>
                            Отправить решение
                          </Button>
                        </Space>
                      ) : (
                        <Space>
                          <Button type="primary" onClick={AddSQLAttemptTask}>Отправить решение</Button>
                        </Space>
                      )}
                    </Space>
                  </div>
                </Col>
              </Row>
            )}
          </Layout>
        )}
      </Content>
    </div>
  );
};

export default TaskPage;
