import React from "react";
import { Select } from "antd";
import RegisterForm from "../components/RegisterForm";


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
  
  return (
    <>
    <RegisterForm/>
    </>
  );
};

export default Regist;
