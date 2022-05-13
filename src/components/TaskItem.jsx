import React from "react";
import { Card } from "antd";
import LolButton from "./UI/button/LolButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TaskItem = (props) => {
  const navigate = useNavigate();
  return (
    <Card hoverable style={{ margin:" 0px 5px 10px 5px" }} onClick={() => navigate(`${props.post.id}`)}>
      <div className="post__content" >
        <strong>
          {props.post.name}
        </strong>
        <div>{props.post.description?(props.post.description.slice(0,45)+"..."):("")}</div>
        <div>Сложность: {props.post.taskTypeId}</div>
      </div>

    </Card>
  );
};

export default TaskItem;
