import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import { Content } from "antd/lib/layout/layout";
import {
  Button,
  message,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Radio,
} from "antd";

const BankTasks = () => {
  const data = JSON.parse(localStorage.getItem("userData"));
  const { Option } = Select;
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "SQL",
      year: "SQL - декларативный язык программирования, применяемый для создания, модификации и управления данными в реляционной базе данных, управляемой соответствующей системой управления базами данных.",
    },
    { id: 2, name: "SQL+", year: "Лучший запрос в мире" },
  ]);

  const [visible, setVisible] = useState(false);

  const TaskCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Добавить новое задание"
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
            name="name"
            label="Название задания"
            rules={[
              {
                required: true,
                message: "Введите название задания",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание задания"
            rules={[
              {
                required: true,
                message: "Введите описание задания",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="solution"
            label="Решение"
            rules={[
              {
                required: true,
                message: "Введите решение",
              },
            ]}
          >
            <Input type="textarea" />
          </Form.Item>
          <Form.Item
            name="taskTypeId"
            label="Сложность"
            rules={[
              {
                required: true,
                message: "Выберите сложность",
              },
            ]}
          >
            <Select
              style={{ width: 120 }}
              // onChange={handleChange}
            >
              <Option value="1">Легкое</Option>
              <Option value="2">Среднее</Option>
              <Option value="3">Сложное</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  async function fetchPosts() {
    const response = await axios.get(
      "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allTasks",
      { headers: { Authorization: data.token } }
    );
    setPosts(response.data);
    console.log(response.data);
  }

  async function AddTaskFetch(values) {
    await axios
      .post(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/addtask",
        { 
          description: values.description, 
          name: values.name, 
          solution: values.solution, 
          taskTypeId: values.taskTypeId },
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        console.log(response.data);
        message.success("Задание добавлено");
      })
      .catch((error) => {
        message.error(error.message);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const onCreate = (values) => {
    AddTaskFetch(values);
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <Content>
      <div>
        <h1>Все задания</h1>
        <Space style={{ margin: "5px" }}>
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            Добавить задание
          </Button>
          <TaskCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </Space>
        {posts.map((post, index) => (
          <TaskItem number={index + 1} post={post} key={post.id} />
        ))}
      </div>
    </Content>
  );
};

export default BankTasks;
