import qs from "qs";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/",
});

export default class API {
  async login(payload) {

    //   .then((response) => {
    //     instance.post("/login", payload);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    try {
      return await instance.post("/login",
      qs.stringify({
        username: payload.username,
        password: payload.password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      console.log("payload in axios", payload);
      console.error("axios error:", error);
    }
  }

  async register(payload) {
    console.log("api/register/payload", payload , {headers: {
          "Content-Type": "application/json",
        }},);

    try {
      return await instance.post("/api/user/add", payload);
    } catch (error) {
      console.log("axios error", error);
      return error;
    }
  }
}
