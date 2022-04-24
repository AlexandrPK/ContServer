import React , { useState }  from "react";
import LolButton from "./UI/button/LolButton";
import LolInput from "./UI/input/LolInput";

const PostForm = ({create}) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
        ...post, id: Date.now()
    }
    create(newPost)
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      <LolInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название курса"
      />
      <LolInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание"
      />
      <LolButton onClick={addNewPost}>Создать курс</LolButton>
    </form>
  );
};

export default PostForm;
