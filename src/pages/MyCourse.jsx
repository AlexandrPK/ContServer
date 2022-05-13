import React, { useState } from "react";
import PostItemMyCouses from "../components/PostItemMyCouses";
import PostForm from "../components/PostForm";
import Layout, { Header } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect } from "react";
import { Skeleton } from "antd";
import { Content } from "antd/lib/layout/layout";

const MyCourse = () => {
  const [posts, setPosts] = useState([]);
  const [isLoadPosts, setLoadPosts] = useState(false);
  //TODO получение постов

  const data = JSON.parse(localStorage.getItem("userData"));

  async function fetchPosts() {
    setLoadPosts(true);
    setTimeout(async () => {
      const response = await axios.get(
        "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/studentCourses",
        { headers: { Authorization: data.token } }
      );
      console.log(response.data);
      setPosts(response.data);
      setLoadPosts(false);
    }, 400);
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
      <Content>
        {isLoadPosts ? (
          <div>
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
          </div>
        ) : (
          <div>
            {posts.length>1? <h1>Все доступные курсы</h1> : <h2>Пока нет доступных курсов, но скоро будут доступны</h2>}
            {posts.map(
              (post, index) => (
                console.log(post),
                (<PostItemMyCouses post={post} key={post.courses.id} />)
              )
            )}
          </div>
        )}
      </Content>
    </div>
  );
};

export default MyCourse;
