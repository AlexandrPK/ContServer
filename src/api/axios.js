import qs from "qs";
import axios from "axios"

// const axios = require("axios");

const instance = axios.create({
  baseURL: "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/",
});

export default class API {
  async login(payload) {
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
      })
      
    } catch (error) {
      return error
    }
  }

  async role(payload) {
    try {
      return await instance.get("api/userInfo",
      {
        headers: {
          "Authorization": payload.headers.access_token,
        },
      })
      
    } catch (error) {
      console.log("payload in axios", error.message);
      return error
    }
  }

  async register(payload) {

    try {
      return await instance.post("/api/user/add", payload);
    } catch (error) {

      return error;
    }
  }
}
