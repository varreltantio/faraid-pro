import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/account/";

const getProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const checkRole = () => {
  return axios.get(API_URL + "checkRole", { headers: authHeader() });
};

const UserService = {
  getProfile,
  checkRole,
};

export default UserService;