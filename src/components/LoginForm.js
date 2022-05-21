import React, { useEffect } from "react";
import axios from "axios";
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
  const isAuth = useSelector((state) => state.auth.isAuth);

  // async function fetchPosts() {
  //   await axios
  //     .get(
  //       "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/api/userInfo",
  //       { headers: { Authorization: data.token } }
  //     )
  //     .then((response) => {
  //       // const onLogoutHandler = async () => {
  //       //   await localStorage.setItem(
  //       //     "userData",
  //       //     JSON.stringify({
  //       //       token: "dddd",
  //       //     })
  //       //   );
  //       // };
  //       console.log("Данные от запроса", response.data);
  //       localStorage.setItem(
  //         "userData",
  //         JSON.stringify({
  //           roleId: response.data.roleId,
  //         })
  //       );
  //       console.log("roleID", data.roleId);
  //     })
  //     // .then(navigate("/mycourses"))
  //     .catch((error) => {
  //       // message.error(error.message);
  //       // console.log(isAuth);
  //     });
  // }

function onFinish (values) {
 dispatch(loginThunk(values))
    // .then(fetchPosts()) 
    navigate("/")
    console.log("Вошел как",values);
  };

  const onFinishFailed = (errorInfo) => {};

  useEffect(() => {
    errMessage &&
      message.error(errMessage, () => dispatch(nullErrorMessage()), [
        errMessage,
      ]);
  });

  // useEffect(() => {
  //   fetchPosts();
  // }, [data]);

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
