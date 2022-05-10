import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'

import { Link, useNavigate } from "react-router-dom";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import Layout, { Header } from "antd/lib/layout/layout";
import { useParams } from "react-router-dom";
import TasksCourse from "../components/TasksCourse";

import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import GroupItem from "../components/GroupItem";
import { message } from "antd";

const Groups = () => {
  const data = JSON.parse(localStorage.getItem("userData"));
  let navigate = useNavigate();
  
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)  

  const onLogoutHandler = async () => {
    await localStorage.setItem('userData', JSON.stringify({
      token: "dddd",                 
       }))
    dispatch(logout())
    console.log(isAuth)
    console.log(data)
  }
  
  const [posts, setPosts] = useState([]);

  //TODO получение постов


  async function fetchPosts() {
    await axios
      .get(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allGroups",
        { headers: { Authorization: data.token } }
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        message.error(error.message);
        onLogoutHandler();
        console.log(isAuth);
        navigate("/login");
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Content>
        <div>
          <h1>Все задания курса</h1>
          {posts.map((post, index) => (
            //  console.log(index,post),
            <GroupItem post={post} key={post.id} />
          ))}
        </div>
      </Content>
    </div>
  );
};

export default Groups;
