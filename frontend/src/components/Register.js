import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Alert } from 'react-bootstrap';
import logo from '../images/logo.png';

import AuthService from "../services/auth.service";

const Register = () => {
  let navigate = useNavigate(); // Menginisialisasi hook useNavigate untuk navigasi

  // State untuk menyimpan nilai input dari form registrasi
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // State untuk menyimpan pesan error

  // Fungsi untuk menangani submit form registrasi
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input
    if (!username || !fullName || !email || !password || !confirmPassword) {
      setError('Semua kolom harus diisi.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Format email tidak valid.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak sesuai.');
      return;
    }

    // Memanggil fungsi register dari AuthService untuk melakukan registrasi
    AuthService.register(username, fullName, email, password).then(
      (response) => {
        setError('');
        setUsername('');
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Navigasi ke halaman login dengan menyertakan pesan sukses
        navigate("/login", { state: { successMessage: 'Registrasi berhasil! Silakan login.' } });
      },
      (error) => {
        console.log(error);
        setError('Gagal melakukan registrasi. Silakan coba lagi.');
      }
    );
  };

  // Fungsi untuk memeriksa format email
  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // Menampilkan halaman Register
  return (
    <div className="row mt-5 justify-content-center">
      <div className="col-lg-6">
        <Card className="shadow">
          <Card.Body className="d-flex flex-column align-items-center">
            <div className="container text-center">
              <img src={logo} alt="Logo" style={{ height: "60px", textAlign: "center" }} className="mb-3" />

              <Card.Title className="mb-4" style={{ textAlign: "left" }}>Informasi Akun</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>} {/* Menampilkan pesan error jika terdapat error */}
              <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFullName">
                  <Form.Control
                    type="text"
                    placeholder="Nama Lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Alamat Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Control
                    type="password"
                    placeholder="Konfirmasi Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <hr />

                <button className="btn btn-success btn-block w-100 mt-3" type="submit">
                  Daftar
                </button>

                <p className="mt-3 text-muted text-center">Sudah punya akun? <Link to="/login"> Masuk</Link></p>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Register;