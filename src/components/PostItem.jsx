import React from "react";
import { Card } from "antd";
import LolButton from "./UI/button/LolButton";

const PostItem = (props) => {
  return (
    <Card hoverable style={{ margin:"10px" }}>
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <LolButton onClick={() => props.remove(props.post)}>Удалить</LolButton>
      </div>
    </Card>
  );
};

export default PostItem;
