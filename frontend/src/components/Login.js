import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, Form, Alert } from 'react-bootstrap';
import logo from '../images/logo.png';

import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();

  const location = useLocation();
  const successMessage = location.state ? location.state.successMessage : null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !password) {
      setError('Semua kolom harus diisi.');
      return;
    }

    AuthService.login(email, password).then(
      (response) => {
        setError('');
        setEmail('');
        setPassword('');

        navigate("/");
        window.location.reload();
      },
      (error) => {
        console.log(error);
        setError('Email atau password salah.');
      }
    );
  };

  return (
    <div className="row mt-5 justify-content-center">
      <div className="col-lg-6">
        <Card className="shadow">
          <Card.Body className="d-flex flex-column align-items-center">
            <div className="container text-center">
              <img src={logo} alt="Logo" style={{ height: "60px", textAlign: "center" }} className="mb-3" />

              <Card.Title className="mb-4" style={{ textAlign: "left" }}>Masuk</Card.Title>

              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Alamat Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <hr />

                <button className="btn btn-success btn-block w-100 mt-3" type="submit">
                  Login
                </button>

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
