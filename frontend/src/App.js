import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate, Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';

import Beranda from './components/Beranda';
import HitungWaris from './components/HitungWaris';
import HukumWaris from './components/HukumWaris';
import Login from './components/Login';
import Register from './components/Register';
import Konsultasi from './components/Konsultasi';
import PertanyaanMasuk from "./components/PertanyaanMasuk";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";
import KonsultasiService from "./services/konsultasi.service";

import EventBus from "./common/EventBus";

import logo from './images/logo.png';
import profile from './images/profile.png';
import notification from './images/notification.png';

const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const HomeRoute = ({ user, redirectPath = '/' }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const PakarRoute = ({ user, role, redirectPath = '/login' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (role !== "pakar") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App = () => {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);
  const [role, setRole] = useState(undefined);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [answeredNotifications, setAnsweredNotifications] = useState([]);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    UserService.getProfile().then(
      (response) => {
        setCurrentUser(response.data);
      },
      (error) => {
        const _profile =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setCurrentUser(undefined);
      }
    );

    UserService.checkRole().then(
      (response) => {
        setRole(response.data.role);
      },
      (error) => {
        const _profile =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setRole(undefined);
      }
    );

    const fetchUnansweredCount = async () => {
      try {
        const response = await KonsultasiService.getUnansweredCount();
        setUnansweredCount(response.data.count);
      } catch (err) {
        console.error('Error fetching unanswered count:', err);
      }
    };

    const fetchAnsweredNotifications = async () => {
      try {
        const response = await KonsultasiService.getAnsweredNotifications();
        setAnsweredNotifications(response.data.notifications);
      } catch (err) {
        console.error('Error fetching answered notifications:', err);
      }
    };

    if (currentUser && role === 'pakar') {
      fetchUnansweredCount();
    }

    if (currentUser) {
      fetchAnsweredNotifications();
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, role]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setRole(undefined);

    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-custom-green">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" style={{ height: "60px" }} />
          </Link>
          <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {role !== "pakar" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold ms-2" to="/">
                      Beranda
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold ms-2" to="/hukumwaris">
                      Hukum Waris
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold ms-2" to="/hitungwaris">
                      Hitung Waris
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold ms-2" to="/konsultasi">
                      Konsultasi
                    </Link>
                  </li>
                </>
              )}

              {currentUser && role === "pakar" && (
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold ms-2" to="/pertanyaanmasuk">
                    Pertanyaan Masuk
                  </Link>
                </li>
              )}
              {currentUser ? (
                <>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ border: 0 }}>
                      <img src={notification} alt="notification" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {role === "pakar" && unansweredCount > 0 && (
                        <Dropdown.Item>{`Anda memiliki ${unansweredCount} pertanyaan baru yang belum dijawab.`}</Dropdown.Item>
                      )}
                      {role !== "pakar" && answeredNotifications.map((notif, index) => (
                        <Dropdown.Item key={index}>{notif.message}</Dropdown.Item>
                      ))}
                      {role !== "pakar" && answeredNotifications.length === 0 && (
                        <Dropdown.Item>Tidak ada notifikasi baru.</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ border: 0 }}>
                      <img src={profile} alt="profile" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Email: {currentUser.email}</Dropdown.Item>
                      <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <div className="d-flex">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link text-white fw-bold ms-2">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link text-white fw-bold ms-2">
                        Register
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route element={<HomeRoute user={currentUser} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={<PakarRoute user={currentUser} role={role} />}>
            <Route path="pertanyaanmasuk" element={<PertanyaanMasuk />} />
          </Route>

          <Route element={<ProtectedRoute user={currentUser} />}>
            <Route path="/konsultasi" element={<Konsultasi />} />
          </Route>

          <Route path="/" element={<Beranda role={role} />} />
          <Route path="/hukumwaris" element={<HukumWaris />} />
          <Route path="/hitungwaris" element={<HitungWaris />} />

        </Routes>
      </div>
    </>
  );
};

export default App;
