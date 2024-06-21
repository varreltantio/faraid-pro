import axios from "axios";

const API_URL = "http://localhost:8080/api/account/";

const register = (email, password) => {
  return axios.post(API_URL + "register", {
    email,
    password
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;