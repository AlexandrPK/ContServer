import React from "react";
import qs from "qs";
import { Card } from "antd";
import LolButton from "./UI/button/LolButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GroupItem = (props) => {
  const navigate = useNavigate();
  return (
    <Card hoverable style={{ margin:" 0px 5px 10px 5px" }} onClick={() => navigate(`${props.post.id}`)}>
      <div className="post__content" >
          ID:{props.post.id}
        <div>Номер группы: <strong>{props.post.number}</strong></div>
        <div style={{ color:"grey" }}>Год: {props.post.year}</div>
      </div>

    </Card>
  );
};

export default GroupItem;
