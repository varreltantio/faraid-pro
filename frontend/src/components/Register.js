import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Alert } from 'react-bootstrap';
import logo from '../images/logo.png';

import AuthService from "../services/auth.service";

const Register = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !password || !confirmPassword) {
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

    AuthService.register(email, password).then(
      (response) => {
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        navigate("/login", { state: { successMessage: 'Registrasi berhasil! Silakan login.' } });
      },
      (error) => {
        console.log(error);
        setError('Gagal melakukan registrasi. Silakan coba lagi.');
      }
    );
  };

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  return (
    <div className="row mt-5 justify-content-center">
      <div className="col-lg-6">
        <Card className="shadow">
          <Card.Body className="d-flex flex-column align-items-center">
            <div className="container text-center">
              <img src={logo} alt="Logo" style={{ height: "60px", textAlign: "center" }} className="mb-3" />

              <Card.Title className="mb-4" style={{ textAlign: "left" }}>Informasi Akun</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form className="w-100" onSubmit={handleSubmit}>
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
