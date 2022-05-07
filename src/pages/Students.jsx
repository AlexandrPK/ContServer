import axios from "axios";
import React from "react";
import qs from "qs";

const Students = () => {
  // axios({
  //   method: "POST",
  //   url: "https://jsonplaceholder.typicode.com/posts",
  //   data: { "userId": 1, username: "ivan@test.ru", password: "1234567Ok" },
  //   headers: { "Content-Type": "application/x-www-form-urlencoded",},
  // })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return (
    <div>
      <h1>Отдай мне всех учеников, я их добавлю, удалю</h1>
    </div>
  );
};

export default Students;
