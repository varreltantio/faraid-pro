import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/account/";

const getProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const checkRole = () => {
  return axios.get(API_URL + "checkRole", { headers: authHeader() });
};

const updateProfile = (username, fullName, image) => {
  const data = {
    username,
    fullName,
    photo: image
  };

  const headers = {
    ...authHeader(),
    "Content-Type": "multipart/form-data",
  };

  return axios.post(API_URL + "profile", data, { headers: headers });
};

const UserService = {
  getProfile,
  checkRole,
  updateProfile
};

export default UserService;