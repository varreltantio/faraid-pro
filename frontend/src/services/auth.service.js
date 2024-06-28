import axios from "axios";

const API_URL = "http://localhost:8080/api/account/"; // URL base API untuk operasi registrasi, login, dan logout

// Fungsi untuk melakukan registrasi pengguna baru
const register = (username, fullName, email, password) => {
  return axios.post(API_URL + "register", { // Mengirimkan permintaan POST ke endpoint API untuk registrasi
    username,
    fullName,
    email,
    password
  });
};

// Fungsi untuk melakukan login pengguna
const login = (email, password) => {
  return axios
    .post(API_URL + "login", { // Mengirimkan permintaan POST ke endpoint API untuk login
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) { // Jika respons dari API memiliki token
        localStorage.setItem("user", JSON.stringify(response.data.token)); // Menyimpan token pengguna ke local storage dalam bentuk string JSON
      }

      return response.data; // Mengembalikan data respons dari API
    });
};

// Fungsi untuk melakukan logout pengguna
const logout = () => {
  localStorage.removeItem("user"); // Menghapus token pengguna dari local storage saat logout
};

// Objek AuthService berisi fungsi-fungsi yang diekspor untuk digunakan di berbagai komponen aplikasi
const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;