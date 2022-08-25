import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { nullErrorMessage } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { loginThunk } from "../redux/authSlice";

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

const data = JSON.parse(localStorage.getItem("userData"));

const LoginForm = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let errMessage = useSelector((state) => state.auth.errMessage);

function onFinish (values) {
 dispatch(loginThunk(values))
    navigate("/")
  };

  const onFinishFailed = (errorInfo) => {};

  useEffect(() => {
    errMessage &&
      message.error(errMessage, () => dispatch(nullErrorMessage()), [
        errMessage,
      ]);
  });
  
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>Вход</h1>
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
          label="Логин"
          name="username"
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
          label="Пароль"
          name="password"
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
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
