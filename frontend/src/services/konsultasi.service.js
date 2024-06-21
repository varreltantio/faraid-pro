import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/konsultasi/";

const getKonsultasi = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getDetailKonsultasi = () => {
  return axios.get(API_URL + "detail", { headers: authHeader() });
};

const tambahPertanyaan = (pertanyaan) => {
  return axios.post(API_URL + "tambah", { pertanyaan }, { headers: authHeader() });
};

const jawabPertanyaan = (id, jawaban) => {
  return axios.put(API_URL + `jawab/${id}`, { jawaban }, { headers: authHeader() });
};

const getUnansweredCount = () => {
  return axios.get(API_URL + "count-unanswered", { headers: authHeader() });
};

const getAnsweredNotifications = () => {
  return axios.get(API_URL + "answered-notifications", { headers: authHeader() });
};

const KonsultasiService = {
  getKonsultasi,
  getDetailKonsultasi,
  tambahPertanyaan,
  jawabPertanyaan,
  getUnansweredCount,
  getAnsweredNotifications,
};

export default KonsultasiService;
