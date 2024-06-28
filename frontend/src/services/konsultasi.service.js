import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/konsultasi/"; // URL base dari API untuk fitur konsultasi

// Fungsi untuk mengambil daftar konsultasi
const getKonsultasi = () => {
  return axios.get(API_URL, { headers: authHeader() }); // Mengirimkan permintaan GET ke endpoint API untuk mendapatkan daftar konsultasi dengan menggunakan header otentikasi
};

// Fungsi untuk mengambil detail konsultasi yang sudah dijawab
const getDetailKonsultasi = () => {
  return axios.get(API_URL + "answered"); // Mengirimkan permintaan GET ke endpoint API untuk mendapatkan detail konsultasi yang sudah dijawab
};

// Fungsi untuk menambahkan pertanyaan baru dalam konsultasi
const tambahPertanyaan = (pertanyaan) => {
  return axios.post(API_URL + "tambah", { pertanyaan }, { headers: authHeader() }); // Mengirimkan permintaan POST ke endpoint API untuk menambahkan pertanyaan baru dengan menggunakan header otentikasi
};

// Fungsi untuk menjawab pertanyaan dalam konsultasi berdasarkan ID pertanyaan
const jawabPertanyaan = (id, jawaban) => {
  return axios.put(API_URL + `jawab/${id}`, { jawaban }, { headers: authHeader() }); // Mengirimkan permintaan PUT ke endpoint API untuk menjawab pertanyaan dengan ID tertentu, menggunakan header otentikasi
};

// Fungsi untuk mengambil notifikasi pertanyaan yang belum dijawab
const getUnansweredNotifications = () => {
  return axios.get(API_URL + "unanswered-notifications", { headers: authHeader() }); // Mengirimkan permintaan GET ke endpoint API untuk mendapatkan notifikasi pertanyaan yang belum dijawab, menggunakan header otentikasi
};

// Fungsi untuk mengambil notifikasi pertanyaan yang sudah dijawab
const getAnsweredNotifications = () => {
  return axios.get(API_URL + "answered-notifications", { headers: authHeader() }); // Mengirimkan permintaan GET ke endpoint API untuk mendapatkan notifikasi pertanyaan yang sudah dijawab, menggunakan header otentikasi
};

// Fungsi untuk mengupdate status notifikasi pakar terkait
const updateNotificationsPakar = (id) => {
  return axios.put(API_URL + `update-notifications-pakar/${id}`, {}, { headers: authHeader() }); // Mengirimkan permintaan PUT ke endpoint API untuk mengupdate status notifikasi pakar berdasarkan ID, menggunakan header otentikasi
};

// Fungsi untuk mengupdate status notifikasi pengguna terkait
const updateNotificationsUser = (id) => {
  return axios.put(API_URL + `update-notifications-user/${id}`, {}, { headers: authHeader() }); // Mengirimkan permintaan PUT ke endpoint API untuk mengupdate status notifikasi pengguna berdasarkan ID, menggunakan header otentikasi
};

// Objek KonsultasiService berisi fungsi-fungsi yang diekspor untuk digunakan di berbagai komponen aplikasi
const KonsultasiService = {
  getKonsultasi,
  getDetailKonsultasi,
  tambahPertanyaan,
  jawabPertanyaan,
  getUnansweredNotifications,
  getAnsweredNotifications,
  updateNotificationsPakar,
  updateNotificationsUser
};

export default KonsultasiService;