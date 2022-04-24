import React from "react";
import LolButton from "./UI/button/LolButton";


const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <LolButton onClick={() => props.remove(props.post)}>Удалить</LolButton>
      </div>
    </div>
  );
};

export default PostItem;
