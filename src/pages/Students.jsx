import axios from "axios";
import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import TableStudents from "../components/TableStudents";

const Students = () => {
  const [posts, setPosts] = useState([]);
  const data = JSON.parse(localStorage.getItem("userData"));

    async function fetchPosts() {
      const response = await axios.get(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/api/users",{headers: { Authorization : data.token,}}
      );
      console.log(response.data)
      setPosts(response.data);
    }
  
    useEffect(() => {
      fetchPosts();
    }, []);
  

  return (
    <div>
      <h1>Кнопочки добаить студента, и т.п</h1>
      <TableStudents posts={posts}/>
    </div>
  );
};

export default Students;
