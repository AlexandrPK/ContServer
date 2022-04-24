import React, { useState } from "react";
import ReactDom from "react-dom";
import Counter from "./components/Counter";
import SQLEditor from "./components/Editor/SQLEditor";
import PostItem from "./components/PostItem";
import ReactMarkdown from "react-markdown";
import "./styles/App.css";
import "./style.css";
import MarkdownEditor from "./components/Editor/MarkdownEditor";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "SQL",
      body: "SQL - декларативный язык программирования, применяемый для создания, модификации и управления данными в реляционной базе данных, управляемой соответствующей системой управления базами данных.",
    },
    { id: 2, title: "SQL+", body: "Лучший запрос в мире" },
  ]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      {posts.length ? (
        <PostList remove={removePost} posts={posts} title="Список курсов" />
      ) : (
        <div style={{ textAlign: "center" }}>
          {" "}
          <h1>Пока нет подготовленных курсов</h1>
        </div>
      )}
    </div>
  );
}

export default App;
