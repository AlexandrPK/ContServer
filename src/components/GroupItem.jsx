import React from "react";
import qs from "qs";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const GroupItem = (props) => {
  const navigate = useNavigate();
  return (
    <Card hoverable style={{ margin:" 0px 5px 10px 5px" }} onClick={() => navigate(`${props.post.id}`)}>
      <div className="post__content" >
          ID группы: {props.post.groupId}
        <div>Номер группы: <strong>{props.post.groupName}</strong></div>
        <div style={{ color:"grey" }}>Год: {props.post.groupYear}</div>
        <div style={{ color:"grey" }}>Курсы: {props.post.courses.length>1? <strong>{ props.post.courses.map((post, index) => (
          <a key={post.id} style= {{color:"#1470c5"}} > [{post.name}] </a>
        ))}</strong> : "группа не записана на курс"}</div>
      </div>

    </Card>
  );
};

export default GroupItem;
