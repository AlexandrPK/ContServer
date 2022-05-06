import React from "react";
import { Card } from "antd";
import LolButton from "./UI/button/LolButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
  const navigate = useNavigate();
  return (
    <Card hoverable style={{ margin:" 0px 5px 10px 5px" }} >
      <div className="post__content" onClick={() => navigate(`${props.post.id}`)}>
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
