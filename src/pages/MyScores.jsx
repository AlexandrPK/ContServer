import axios from "axios";
import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import TableStudentScores from "../components/TableStudentScores";

const MyScores = () => {
  const [posts, setPosts] = useState([]);
  const data = JSON.parse(localStorage.getItem("userData"));

    async function fetchPosts() {
      const response = await axios.get(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/score/studentScores",{headers: { Authorization : data.token,}}
      )
      .then( response => {
      const datas = {...response.data, }
      console.log(datas)
      const post = [];
      
      for (let key in datas){
        post.push({
          task: datas[key].task.name,
          course: datas[key].course.name,
          checkdate: datas[key].score.date.slice(0,10),
          score: datas[key].score.score,
          review: datas[key].score.review,

        });
      }
      setPosts(post);
    })}
  
    useEffect(() => {
      fetchPosts();
    }, []);
  

  return (
    <div>
      <h1></h1>
      <TableStudentScores posts={posts}/>
    </div>
  );
};

export default MyScores;
