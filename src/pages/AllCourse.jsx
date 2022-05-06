import React, { useState} from "react";
import PostList from "../components/PostList"
import PostForm from "../components/PostForm";
import Layout, { Header } from "antd/lib/layout/layout";
import axios from "axios";
import { useEffect } from "react";

const AllCourse = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "SQL",
      body: "SQL - декларативный язык программирования, применяемый для создания, модификации и управления данными в реляционной базе данных, управляемой соответствующей системой управления базами данных.",
    },
    { id: 2, title: "SQL+", body: "Лучший запрос в мире" },
  ]);

  //TODO получение постов
  // async function fetchPosts() {
  //   const response = await axios.get(
  //     "https://jsonplaceholder.typicode.com/posts?10"
  //   );
  //   setPosts(response.data);
  // }

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div>
      <Layout style={{ background: "#fff" }}>
        <PostForm create={createPost} />
        {posts.length ? (
          <PostList remove={removePost} posts={posts} title="Список курсов" />
        ) : (
          <div style={{ textAlign: "center" }}>
            {" "}
            <h1>Пока нет подготовленных курсов</h1>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default AllCourse;
