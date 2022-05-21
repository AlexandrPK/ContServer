import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import "antd/dist/antd.css";
import TableStudents from "../components/TableStudents";
import { Button, Space } from "antd";

const Students = () => {
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const data = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setisLoasding] = useState(true);

  async function fetchPosts() {
    const response = await axios.get(
      "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/api/users",
      { headers: { Authorization: data.token } }
    );
    console.log("RESPONSE", response.data);
    setPosts(response.data);
    setisLoasding(false);
  }

  async function fetchGroups() {
    await axios
      .get(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allGroupsCourses",
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        setGroups(response.data);
        console.log("полученные группы", response.data);
      });
  }
  // console.log("пол",groups);

  useEffect(() => {
    fetchPosts();
    fetchGroups();
  }, []);

  return (
    <div>
      {isLoading ? (
        "Загрузка данных"
      ) : (
        <div style={{marginTop:"15px"}} >
          <Space>
          <Button>Добавить студента в группу</Button>
          <Button>Сменить пароль</Button>
          </Space>
          <TableStudents posts={posts} groups={groups} />
        </div>
      )}
    </div>
  );
};

export default Students;
