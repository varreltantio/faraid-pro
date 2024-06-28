import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/konsultasi/";

const getKonsultasi = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getDetailKonsultasi = () => {
  return axios.get(API_URL + "answered");
};

const tambahPertanyaan = (pertanyaan) => {
  return axios.post(API_URL + "tambah", { pertanyaan }, { headers: authHeader() });
};

const jawabPertanyaan = (id, jawaban) => {
  return axios.put(API_URL + `jawab/${id}`, { jawaban }, { headers: authHeader() });
};

const getUnansweredNotifications = () => {
  return axios.get(API_URL + "unanswered-notifications", { headers: authHeader() });
};

const getAnsweredNotifications = () => {
  return axios.get(API_URL + "answered-notifications", { headers: authHeader() });
};

const updateNotificationsPakar = (id) => {
  return axios.put(API_URL + `update-notifications-pakar/${id}`, {}, { headers: authHeader() });
};

const updateNotificationsUser = (id) => {
  return axios.put(API_URL + `update-notifications-user/${id}`, {}, { headers: authHeader() });
};

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
