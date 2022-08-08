import React, { useState } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import Layout, { Header } from "antd/lib/layout/layout";
import axios from "axios";
import { Button, message, Space, Modal, Form, Input, Radio } from "antd";
import { useEffect } from "react";

const CourseCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Добавить новый курс"
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
          name="name"
          label="Название курса"
          rules={[
            {
              required: true,
              message: "Введите название курса",
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

const AllCourse = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);


  const data = JSON.parse(localStorage.getItem("userData"));

  async function fetchPosts() {
    const response = await axios.get(
      "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allCourses",
      { headers: { Authorization: data.token } }
    );
    setPosts(response.data);
  }

  async function AddCourseFetch(values) {
    await axios
      .post(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/addCourse",
        { name: values.name, year: values.year },
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        message.success('Курс добавлен');
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const onCreate = (values) => {
    AddCourseFetch(values);    setVisible(false);
  };

  return (
    <div>
      <Layout style={{ background: "#fff" }}>
        <Space style={{ margin: "5px" }}>
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            Добавить курс
          </Button>
          <CourseCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </Space>

        {posts.length ? (
          <PostList posts={posts} title="Список курсов" />
        ) : (
          <div style={{ textAlign: "center" }}>
            {" "}
            <h1>Пока нет подготовленных курсов</h1>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default AllCourse;
