import React , { useState }  from "react";
import LolButton from "./UI/button/LolButton";
import LolInput from "./UI/input/LolInput";

const PostForm = ({create}) => {
  const [post, setPost] = useState({ name: "", year: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
        ...post, id: Date.now()
    }
    create(newPost)
    setPost({ name: "", year: "" });
  };

  return (
    <form>
      <LolInput
        value={post.name}
        onChange={(e) => setPost({ ...post, name: e.target.value })}
        type="text"
        placeholder="Название курса"
      />
      <LolInput
        value={post.body}
        onChange={(e) => setPost({ ...post, year: e.target.value })}
        type="text"
        placeholder="Год"
      />
      <LolButton onClick={addNewPost}>Создать курс</LolButton>
    </form>
  );
};

export default PostForm;
