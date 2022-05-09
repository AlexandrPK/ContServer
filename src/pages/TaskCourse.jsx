import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import TasksCourse from "../components/TasksCourse";

import { Content } from "antd/lib/layout/layout";
import axios from "axios";

const Task = () => {
  const { id } = useParams();

  const data = JSON.parse(localStorage.getItem('userData'))
  const [posts, setPosts] = useState([
      
    ]);

    async function fetchPosts() {
      const response = await axios.get(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allTasksByCourse/"+id,{headers: { Authorization : data.token,}}
      );
      setPosts(response.data);
      console.log(response.data)
    }
  
    useEffect(() => {
      fetchPosts();
    }, []);

return (
  <Content>
    <div>
      <h1>Все задания курса</h1>
      {posts.map((post, index) => (
           console.log(index,post),
          <TasksCourse post={post} key={post.task.id} />
        ))}
    </div>
  </Content>
);
};

export default Task;
