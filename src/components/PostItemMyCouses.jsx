import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const PostItemMyCouses = (props) => {
  const navigate = useNavigate();
  return (
    <Card hoverable style={{ margin:" 0px 0px 10px 0px" }} onClick={() => navigate(`${props.post.courses.id}`)}>
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
