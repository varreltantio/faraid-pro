export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user')); // Mengambil data pengguna dari local storage dan di-parse dari JSON menjadi objek JavaScript

  if (user) { // Jika data pengguna tersedia
    return { Authorization: 'Bearer ' + user }; // Mengembalikan header Authorization dengan token Bearer yang diikuti oleh token pengguna
  } else { // Jika data pengguna tidak tersedia
    return {}; // Mengembalikan objek kosong sebagai header
  }
}