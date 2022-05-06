import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { message } from "antd";
// import { nullErrorMessage } from '../redux/authSlice'
// import { useSelector } from 'react-redux'

// import { loginThunk } from '../redux/authSlice'
// import styles from '../styles/LoginForm.module.scss'

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

const Login = () => {
  // const dispatch = useDispatch()
  // let errMessage = useSelector((state) => state.auth.errMessage)

  // const onFinish = (values) => {
  //   dispatch(loginThunk(values));
  // };

  const onFinishFailed = (errorInfo) => {};

  // useEffect(() => {
  //   errMessage &&
  //     message.error(errMessage, () => dispatch(nullErrorMessage()), [
  //       errMessage,
  //     ]);
  // });

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>Вход</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Введите действительный адрес электронной почты",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email@ya.ru" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/,
              message:
                "Пароль должен содержать цифры, прописные и строчные буквы, длиной 8-15 символов",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
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

export default Login;
