import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
  const navigate = useNavigate();
  return (
    <Card hoverable style={{ margin:" 0px 5px 10px 5px" }} onClick={() => navigate(`${props.post.id}`)}>
      <div className="post__content" >
        <strong>
         {props.post.name}
        </strong>
        <div>Курс id: {props.post.id}</div>
        <div>{props.post.year} - Учебный год </div>
      </div>
    </Card>
  );
};

export default PostItem;
