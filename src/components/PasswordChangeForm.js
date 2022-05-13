import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { nullErrorMessage } from "../redux/authSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const PasswordChangeForm = () => {
  const data = JSON.parse(localStorage.getItem("userData"));

  const onFinish = (values) => {
    console.log(values);

    axios({
      method: "post",
      url: "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/api/user/resetPassword",
      data: { login: values.login, newPassword: values.newPassword },
      headers: { Authorization: data.token },
    })
      .then(function (response) {
        message.success("Пароль сменен");
        console.log(response);
      })
      .catch(function (error) {
        // обработка ошибки
        message.error("Ошибка №" + error.response.data.status);
      });
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>Смена пароля</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Login"
          name="login"
          rules={[
            {
              required: true,
              message: "Введите логин",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Ivan2000"
          />
        </Form.Item>

        <Form.Item
          label="NewPassword"
          name="newPassword"
          rules={[
            {
              required: true,
              pattern: /^(?=.*[a-z])(?=.)(?=.*\d).{7,15}$/,
              message:
                "Пароль должен содержать цифры, прописные и строчные буквы, длиной 8-15 символов",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Сменить пароль
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PasswordChangeForm;
