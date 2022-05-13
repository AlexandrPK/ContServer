import React from "react";
import qs from "qs";
import { Card } from "antd";
import LolButton from "./UI/button/LolButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TasksCourse = (props) => {
  const navigate = useNavigate();
  return (
    <Card hoverable style={{ margin:" 0px 5px 10px 5px" }} onClick={() => navigate(`${props.post.task.id}`)}>
      <div className="post__content" >
        <strong>
          {props.post.task.name}
        </strong>
        <div>Сложность: {props.post.task.taskTypeId} </div>
        <div style={{ color:"grey" }}>{props.post.deadline?("Дедлайн:",props.post.deadline.slice(0,10)):("")}</div>
      </div>

    </Card>
  );
};

export default TasksCourse;
