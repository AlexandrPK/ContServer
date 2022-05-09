import React, { useState, useEffect} from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import { Content } from "antd/lib/layout/layout";


const BankTasks = () => {

    const data = JSON.parse(localStorage.getItem('userData'))
    const [posts, setPosts] = useState([
        {
          id: 1,
          name: "SQL",
          year: "SQL - декларативный язык программирования, применяемый для создания, модификации и управления данными в реляционной базе данных, управляемой соответствующей системой управления базами данных.",
        },
        { id: 2, name: "SQL+", year: "Лучший запрос в мире" },
      ]);

      async function fetchPosts() {
        const response = await axios.get(
          "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allTasks",{headers: { Authorization : data.token,}}
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
        <h1>Все задания</h1>
        {posts.map((post, index) => (
            <TaskItem  number={index + 1} post={post} key={post.id} />
          ))}
      </div>
    </Content>
  );
};

export default BankTasks;
