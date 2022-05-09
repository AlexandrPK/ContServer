import React from "react";
import { Card } from "antd";
import LolButton from "./UI/button/LolButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostItemMyCouses = (props) => {
  const navigate = useNavigate();
  return (
    <Card hoverable style={{ margin:" 0px 5px 10px 5px" }} onClick={() => navigate(`${props.post.courses.id}`)}>
      <div className="post__content" >
        <strong>
         {props.post.courses.name}
        </strong>
        <div style={{ color:"grey" }}>Открыт до: {props.post.nearestDeadline.slice(0,10)}</div>
      </div>
    </Card>
  );
};

export default PostItemMyCouses;
