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
import { Button, message, Space, Modal, Form, Input, Radio } from "antd";

const GroupCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Добавить новую группу"
      okText="Добавить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="number"
          label="Номер группы"
          rules={[
            {
              required: true,
              message: "Введите номер группы",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="year"
          label="Год"
          rules={[
            {
              required: true,
              message: "Введите учебный год",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Groups = () => {
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

  //TODO получение постов

  async function fetchPosts() {
    await axios
      .get(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allGroupsCourses",
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        message.error(error.message);
        onLogoutHandler();
        console.log(isAuth);
        navigate("/login");
      });
  }
  
  async function AddGroupFetch(values) {
    await axios
      .post(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/addGroup",{ "number": values.number,
        "year": values.year},
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    AddGroupFetch(values)
    console.log("Received values of form: ", values);
    setVisible(false);
    message.success('Группа добавлена');

  };

  return (
    <div>
      <Content>
        <div>
          <h1>Все группы</h1>
          <Space style={{ margin: "5px" }}>
            <Button
              onClick={() => {
                setVisible(true);
              }}
            >
              Добавить группу
            </Button>

            <Button
              onClick={() => {
                setVisible(true);
              }}
            >
              Добавить группу на курс
            </Button>
            <GroupCreateForm
              visible={visible}
              onCreate={onCreate}
              onCancel={() => {
                setVisible(false);
              }}
            />
          </Space>
          {posts.map((post, index) => (
            //  console.log(index,post),
            <GroupItem post={post} key={post.id} />
          ))}
        </div>
      </Content>
    </div>
  );
};

export default Groups;
