import React, { useState } from "react";
import PostItemMyCouses from "../components/PostItemMyCouses";
import PostForm from "../components/PostForm";
import Layout, { Header } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect } from "react";

const MyCourse = () => {
  const [posts, setPosts] = useState([]);

  //TODO получение постов

  const data = JSON.parse(localStorage.getItem("userData"));

  async function fetchPosts() {
    const response = await axios.get(
      "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/studentCourses",
      { headers: { Authorization: data.token } }
    );
    console.log(response.data);
    setPosts(response.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div>
      <Layout style={{ background: "#fff" }}>
        <div>
          <h1 style={{ textAlign:"center" }}>Все доступные курсы</h1>
          {posts.map((post, index) => (
            console.log(post),
            <PostItemMyCouses post={post} key={post.courses.id} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default MyCourse;
