import React from "react";
import { Form, Input, Button, Select } from "antd";
import RegisterForm from "../components/RegisterForm";
// import { useDispatch } from 'react-redux'

// import { registerThunk } from '../redux/registerSlice'
// import styles from '../styles/RegisterForm.module.scss'

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

const { Option } = Select;

const Regist = () => {
  // const dispatch = useDispatch()

  // const onFinish = (values) => {
  //   dispatch(registerThunk(values))
  // }

  // const onFinishFailed = (errorInfo) => {}

  return (
    <>
    <RegisterForm/>
    </>
  );
};

export default Regist;
