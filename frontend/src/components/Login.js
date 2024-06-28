import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, Form, Alert } from 'react-bootstrap';
import logo from '../images/logo.png';

import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate(); // Menginisialisasi hook useNavigate untuk navigasi programmatic

  const location = useLocation(); // Menginisialisasi hook useLocation untuk mendapatkan informasi lokasi saat ini
  const successMessage = location.state ? location.state.successMessage : null; // Mendapatkan pesan sukses dari location state jika ada

  const [email, setEmail] = useState(''); // State untuk menyimpan nilai email yang diinput
  const [password, setPassword] = useState(''); // State untuk menyimpan nilai password yang diinput
  const [error, setError] = useState(''); // State untuk menyimpan pesan error

  // Fungsi untuk menangani pengiriman form login
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input
    if (!email || !password) {
      setError('Semua kolom harus diisi.');
      return;
    }

    // Memanggil AuthService untuk melakukan login dengan email dan password yang diberikan
    AuthService.login(email, password).then(
      (response) => {
        setError(''); // Mengosongkan pesan error setelah berhasil login
        setEmail(''); // Mengosongkan input email setelah berhasil login
        setPassword(''); // Mengosongkan input password setelah berhasil login

        navigate("/"); // Mengarahkan pengguna ke halaman utama setelah berhasil login
        window.location.reload(); // Memuat ulang halaman untuk memperbarui data setelah login
      },
      (error) => {
        console.log(error);
        setError('Email atau password salah.'); // Mengatur pesan error jika login gagal
      }
    );
  };

  // Mengembalikan tampilan komponen Login
  return (
    <div className="row mt-5 justify-content-center">
      <div className="col-lg-6">
        <Card className="shadow">
          <Card.Body className="d-flex flex-column align-items-center">
            <div className="container text-center">
              <img src={logo} alt="Logo" style={{ height: "60px", textAlign: "center" }} className="mb-3" />

              <Card.Title className="mb-4" style={{ textAlign: "left" }}>Masuk</Card.Title>

              {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Menampilkan pesan sukses jika ada */}
              {error && <Alert variant="danger">{error}</Alert>} {/* Menampilkan pesan error jika ada */}

              {/* Form untuk input email dan password */}
              <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Alamat Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <hr />

                {/* Tombol untuk submit form login */}
                <button className="btn btn-success btn-block w-100 mt-3" type="submit">
                  Login
                </button>

                {/* Tautan untuk menuju halaman registrasi */}
                <p className="mt-3 text-muted text-center">Belum punya akun? <Link to="/register"> Daftar</Link></p>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
