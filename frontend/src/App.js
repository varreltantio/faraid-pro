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

// Memeriksa apakah pengguna telah login
const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

// Mengarahkan pengguna kembali ke halaman utama jika sudah login
const HomeRoute = ({ user, redirectPath = '/' }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

// memeriksa apakah pengguna adalah pakar dan telah login
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

  const [currentUser, setCurrentUser] = useState(undefined); // State untuk menyimpan data pengguna saat ini
  const [role, setRole] = useState(undefined); // State untuk menyimpan peran (role) pengguna saat ini
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // State untuk mengatur keadaan collapse navbar
  const [unansweredNotifications, setUnansweredNotifications] = useState([]); // State untuk menyimpan notifikasi yang belum dijawab
  const [answeredNotifications, setAnsweredNotifications] = useState([]); // State untuk menyimpan notifikasi yang telah dijawab
  const [showNotificationDot, setShowNotificationDot] = useState(false); // State untuk menunjukkan indikator notifikasi

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed); // Fungsi untuk menangani collapse navbar

  useEffect(() => {
    // Efek samping untuk mengambil profil pengguna dan memeriksa peran (role) pengguna saat komponen dimuat
    UserService.getProfile().then(
      (response) => {
        setCurrentUser(response.data); // Mengatur state currentUser dengan data profil pengguna dari respons API
      },
      (error) => {
        setCurrentUser(undefined); // Jika terjadi kesalahan, mengatur currentUser menjadi undefined
      }
    );

    UserService.checkRole().then(
      (response) => {
        setRole(response.data.role); // Mengatur state role dengan peran (role) pengguna dari respons API
      },
      (error) => {
        setRole(undefined); // Jika terjadi kesalahan, mengatur role menjadi undefined
      }
    );

    // Memanggil fungsi fetchUnansweredNotifications() jika currentUser dan role adalah 'pakar'
    if (currentUser && role === 'pakar') {
      fetchUnansweredNotifications();
    }

    // Memanggil fungsi fetchAnsweredNotifications() jika currentUser dan role bukan 'pakar'
    if (currentUser && role !== 'pakar') {
      fetchAnsweredNotifications();
    }

    // Mengatur pemantauan untuk peristiwa 'logout' dari EventBus
    EventBus.on("logout", () => {
      logOut(); // Menjalankan fungsi logOut() saat peristiwa 'logout' terjadi
    });

    return () => {
      EventBus.remove("logout"); // Membersihkan pemantauan peristiwa 'logout' saat komponen dibongkar
    };
  }, [currentUser, role]); // Bergantung pada perubahan state currentUser dan role

  // Fungsi untuk mengambil notifikasi yang belum dijawab dari server
  const fetchUnansweredNotifications = async () => {
    try {
      const response = await KonsultasiService.getUnansweredNotifications(); // Mengirimkan permintaan GET untuk mendapatkan notifikasi yang belum dijawab
      const notifications = response.data.notifications; // Menyimpan data notifikasi dari respons

      // Memeriksa apakah terdapat notifikasi yang belum dijawab oleh pakar
      const hasUnansweredPakarNotification = notifications.some(notif => notif.notifikasiPakar == 0);

      setUnansweredNotifications(notifications); // Mengatur state unansweredNotifications dengan data notifikasi
      setShowNotificationDot(hasUnansweredPakarNotification); // Menampilkan indikator notifikasi jika terdapat notifikasi yang belum dijawab
    } catch (err) {
      console.error('Error fetching unanswered notifications:', err); // Menampilkan pesan kesalahan jika terjadi kesalahan dalam mengambil notifikasi yang belum dijawab
    }
  };

  // Fungsi untuk mengambil notifikasi yang telah dijawab dari server
  const fetchAnsweredNotifications = async () => {
    try {
      const response = await KonsultasiService.getAnsweredNotifications(); // Mengirimkan permintaan GET untuk mendapatkan notifikasi yang telah dijawab
      const notifications = response.data.notifications; // Menyimpan data notifikasi dari respons

      // Memeriksa apakah terdapat notifikasi yang telah dijawab oleh pengguna
      const hasAnsweredPakarNotification = notifications.some(notif => notif.notifikasiUser == 0);

      setAnsweredNotifications(notifications); // Mengatur state answeredNotifications dengan data notifikasi
      setShowNotificationDot(hasAnsweredPakarNotification); // Menampilkan indikator notifikasi jika terdapat notifikasi yang telah dijawab
    } catch (err) {
      console.error('Error fetching answered notifications:', err); // Menampilkan pesan kesalahan jika terjadi kesalahan dalam mengambil notifikasi yang telah dijawab
    }
  };

  // Fungsi untuk keluar dari aplikasi
  const logOut = () => {
    AuthService.logout(); // Memanggil fungsi logout dari AuthService untuk menghapus token dari local storage
    setCurrentUser(undefined); // Mengatur currentUser menjadi undefined
    setRole(undefined); // Mengatur role menjadi undefined

    navigate("/login"); // Mengarahkan pengguna kembali ke halaman login setelah logout
  };

  // Fungsi untuk mengupdate status notifikasi
  const updateNotification = () => {
    if (currentUser && role === 'pakar') {
      unansweredNotifications.map(async (notif, index) => {
        await KonsultasiService.updateNotificationsPakar(notif.id); // Mengirim permintaan PUT untuk mengupdate status notifikasi pakar
      });

      fetchUnansweredNotifications(); // Memanggil kembali fungsi fetchUnansweredNotifications() setelah update
    } else {
      answeredNotifications.map(async (notif, index) => {
        await KonsultasiService.updateNotificationsUser(notif.id); // Mengirim permintaan PUT untuk mengupdate status notifikasi pengguna
      });

      fetchAnsweredNotifications(); // Memanggil kembali fungsi fetchAnsweredNotifications() setelah update
    }
  };

  // Fungsi untuk menangani klik notifikasi dari pengguna
  const handleNotifUser = (notif) => {
    navigate(`/konsultasi#${notif.id}`, { state: { openId: notif.id } }); // Mengarahkan pengguna ke halaman konsultasi dengan ID notifikasi yang dipilih
  };

  // Fungsi untuk menangani klik notifikasi dari pakar
  const handleNotifPakar = (notif) => {
    navigate(`/pertanyaanmasuk#${notif.id}`, { state: { openId: notif.id } }); // Mengarahkan pengguna ke halaman pertanyaan masuk dengan ID notifikasi yang dipilih
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
