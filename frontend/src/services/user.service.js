import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/account/"; // URL base dari API untuk fitur akun pengguna

// Fungsi untuk mengambil profil pengguna
const getProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() }); // Mengirimkan permintaan GET ke endpoint API untuk mendapatkan profil pengguna dengan menggunakan header otentikasi
};

// Fungsi untuk memeriksa peran (role) pengguna
const checkRole = () => {
  return axios.get(API_URL + "checkRole", { headers: authHeader() }); // Mengirimkan permintaan GET ke endpoint API untuk memeriksa peran (role) pengguna dengan menggunakan header otentikasi
};

// Fungsi untuk memperbarui profil pengguna
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

  return axios.post(API_URL + "profile", data, { headers: headers }); // Mengirimkan permintaan POST ke endpoint API untuk memperbarui profil pengguna dengan data yang diinputkan, menggunakan header otentikasi dan tipe konten multipart/form-data
};

// Objek UserService berisi fungsi-fungsi yang diekspor untuk digunakan di berbagai komponen aplikasi
const UserService = {
  getProfile,
  checkRole,
  updateProfile
};

export default UserService;