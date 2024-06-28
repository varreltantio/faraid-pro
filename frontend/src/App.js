import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate, Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';

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

import logo from './images/logo-green.png';
import logo2 from './images/logo-green2.png';
import notification from './images/notification.png';
import setting from './images/setting.png';
import signout from './images/signout.png';
import UpdateProfile from "./components/UpdateProfile";

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
  const [unansweredNotifications, setUnansweredNotifications] = useState([]);
  const [answeredNotifications, setAnsweredNotifications] = useState([]);
  const [showNotificationDot, setShowNotificationDot] = useState(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    UserService.getProfile().then(
      (response) => {
        setCurrentUser(response.data);
      },
      (error) => {
        setCurrentUser(undefined);
      }
    );

    UserService.checkRole().then(
      (response) => {
        setRole(response.data.role);
      },
      (error) => {
        setRole(undefined);
      }
    );

    if (currentUser && role === 'pakar') {
      fetchUnansweredNotifications();
    }

    if (currentUser && role !== 'pakar') {
      fetchAnsweredNotifications();
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, role]);

  const fetchUnansweredNotifications = async () => {
    try {
      const response = await KonsultasiService.getUnansweredNotifications();
      const notifications = response.data.notifications;

      const hasUnansweredPakarNotification = notifications.some(notif => notif.notifikasiPakar == 0);

      setUnansweredNotifications(notifications);
      setShowNotificationDot(hasUnansweredPakarNotification);
    } catch (err) {
      console.error('Error fetching unanswered notifications:', err);
    }
  };

  const fetchAnsweredNotifications = async () => {
    try {
      const response = await KonsultasiService.getAnsweredNotifications();
      const notifications = response.data.notifications;

      const hasAnsweredPakarNotification = notifications.some(notif => notif.notifikasiUser == 0);

      setAnsweredNotifications(notifications);
      setShowNotificationDot(hasAnsweredPakarNotification);
    } catch (err) {
      console.error('Error fetching answered notifications:', err);
    }
  };

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setRole(undefined);

    navigate("/login");
  };

  const updateNotification = () => {
    if (currentUser && role === 'pakar') {
      unansweredNotifications.map(async (notif, index) => {
        await KonsultasiService.updateNotificationsPakar(notif.id);
      });

      fetchUnansweredNotifications();
    } else {
      answeredNotifications.map(async (notif, index) => {
        await KonsultasiService.updateNotificationsUser(notif.id);
      });

      fetchAnsweredNotifications();
    }
  };

  const handleNotifUser = (notif) => {
    navigate(`/konsultasi#${notif.id}`, { state: { openId: notif.id } });
  };

  const handleNotifPakar = (notif) => {
    navigate(`/pertanyaanmasuk#${notif.id}`, { state: { openId: notif.id } });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
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
                    <Link className="nav-link text-custom-green fw-bold ms-2 font-dm-sans" to="/">
                      Beranda
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-custom-green fw-bold ms-2 font-dm-sans" to="/hukumwaris">
                      Hukum Waris
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-custom-green fw-bold ms-2 font-dm-sans" to="/hitungwaris">
                      Hitung Waris
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-custom-green fw-bold ms-2 font-dm-sans" to="/konsultasi">
                      Konsultasi
                    </Link>
                  </li>
                </>
              )}

              {currentUser && role === "pakar" && (
                <li className="nav-item">
                  <Link className="nav-link text-custom-green fw-bold ms-2 font-dm-sans" to="/pertanyaanmasuk">
                    Pertanyaan Masuk
                  </Link>
                </li>
              )}
              {currentUser ? (
                <>
                  <Dropdown align="end" className="ms-2">
                    <Dropdown.Toggle variant="" id="dropdown-basic" style={{ border: 0 }} onMouseDown={updateNotification}>
                      <img src={notification} alt="notification" style={{ width: '28px', height: '30px' }} />
                      {showNotificationDot && <span className="notification-dot"></span>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {role === "pakar" && unansweredNotifications.map((notif, index) => (
                          <Dropdown.Item key={index}>
                            <div onClick={() => handleNotifPakar(notif)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                              <img src={logo2} alt="notification" style={{ width: '40px', height: '40px' }} />
                              <div style={{ marginLeft: '10px' }}>
                                <span>{moment(notif.tanggalPertanyaan).format('DD-MM-YYYY HH:mm')}</span>
                                <br />
                                <span>{notif.message}</span>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))}
                        {role === "pakar" && unansweredNotifications.length === 0 && (
                          <Dropdown.Item>Tidak ada notifikasi baru.</Dropdown.Item>
                        )}

                        {role !== "pakar" && answeredNotifications.map((notif, index) => (
                          <Dropdown.Item key={index}>
                            <div onClick={() => handleNotifUser(notif)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                              <img src={logo2} alt="notification" style={{ width: '40px', height: '40px' }} />
                              <div style={{ marginLeft: '10px' }}>
                                <span>{moment(notif.tanggalJawaban).format('DD-MM-YYYY HH:mm')}</span>
                                <br />
                                <span>{notif.message}</span>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))}
                        {role !== "pakar" && answeredNotifications.length === 0 && (
                          <Dropdown.Item>Tidak ada notifikasi baru.</Dropdown.Item>
                        )}
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown align="end" className="ms-2">
                    <Dropdown.Toggle variant="" id="dropdown-basic" style={{ border: 0 }}>
                      <img src={currentUser.photo} alt="profile" style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={currentUser.photo} alt="profile" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                        <div style={{ marginLeft: '10px' }}>
                          <span className="fw-bold">{currentUser.fullName}</span>
                          <br />
                          <span className="text-secondary">{currentUser.email}</span>
                        </div>
                      </Dropdown.Item>
                      <hr />
                      <Dropdown.Item>
                        <Link to={"/updateprofile"} className="text-decoration-none text-black">
                          <img src={setting} alt="setting" /> Pengaturan Profile
                        </Link>
                      </Dropdown.Item>
                      <hr />
                      <Dropdown.Item onClick={logOut}><img src={signout} alt="signout" /> Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <div className="d-flex">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item btn btn-sm btn-warning ms-4">
                      <Link to={"/login"} className="nav-link fw-bold">
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route element={<HomeRoute user={currentUser} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PakarRoute user={currentUser} role={role} />}>
          <Route path="/pertanyaanmasuk" element={<PertanyaanMasuk />} />
        </Route>

        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route path="/updateprofile" element={<UpdateProfile />} />
        </Route>

        <Route path="/" element={<Beranda role={role} />} />
        <Route path="/hukumwaris" element={<HukumWaris />} />
        <Route path="/hitungwaris" element={<HitungWaris />} />
        <Route path="/konsultasi" element={<Konsultasi />} />

      </Routes>
    </>
  );
};

export default App;
