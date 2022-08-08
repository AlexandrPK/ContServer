import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TasksCourse from "../components/TasksCourse";
import { Skeleton } from "antd";


import { Content } from "antd/lib/layout/layout";
import axios from "axios";

const Task = () => {
  const { id } = useParams();

  const data = JSON.parse(localStorage.getItem("userData"));
  const [posts, setPosts] = useState([]);
  const [isLoadPosts, setLoadPosts] = useState(false);
  
  async function fetchPosts() {
    setLoadPosts(true);
    setTimeout( async () => {
    const response = await axios.get(
      "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allTasksByCourse/" +
        id,
      { headers: { Authorization: data.token } }
    );
    setPosts(response.data);
      setLoadPosts(false);
    }, 400);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Content>
      <h1>Задания курса</h1>

      {isLoadPosts ? (
        <div>
          <Skeleton active paragraph={{ rows: 1 }} style={{ marginTop:"10px" }} />
          <Skeleton active paragraph={{ rows: 1 }} style={{ marginTop:"10px" }}/>
          <Skeleton active paragraph={{ rows: 1 }} style={{ marginTop:"10px" }}/>
          <Skeleton active paragraph={{ rows: 1 }} style={{ marginTop:"10px" }}/>
        </div>
      ) : (
        <div>
          {posts.map(
            (post, index) => (
              (<TasksCourse post={post} key={post.task.id} />)
            )
          )}
        </div>
      )}
    </Content>
  );
};

export default Task;
