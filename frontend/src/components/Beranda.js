import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import logo from '../images/logo-white.png';
import beranda from '../images/beranda.jpg';
import beranda2 from '../images/beranda2.jpg';
import line from '../images/line.png';

const Beranda = ({ role }) => {
  return (
    <div className="mt-5">
      {role === 'pakar' && (
        <>
          <section id="welcome">
            <div className='container'>
              <div className="row mt-5">
                <div className="col-lg-6">
                  <div className="mt-3 mb-5">
                    <h1 className="fw-bold text-custom-green">Selamat Datang di FaraidPro</h1>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <img src={beranda} alt="Gambar" width="100%" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="footer">
            <div className='container'>
              <div className='row'>
                <div className='col-md mt-5'>
                  <img src={logo} alt="Gambar" />
                  <p>
                    Jalan Gebangan <br />
                    RT 002 RW 001 <br />
                    Desa GelangLor <br />
                    Kecamatan Sukorejo <br />
                    Kabupaten Ponorogo <br />
                  </p>
                  <hr />
                  <p>©2024 FaraidPro.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {role !== 'pakar' && (
        <>
          <section id="welcome">
            <div className='container'>
              <div className="row mt-5">
                <div className="col-lg-6">
                  <div className="mt-3 mb-5">
                    <h1 className="fw-bold text-custom-green">Selamat Datang di FaraidPro</h1>

                    <h6 className="fw-bold text-custom-green">Hitung Harta Warisan</h6>
                    <p className="text-custom-green m-0">Berdasarkan Hukum Islam</p>
                    <p className="text-custom-green">Coba Hitung Sekarang!</p>
                    <Link className="btn btn-success py-3 px-4 mt-3" to="/hitungwaris">
                      Hitung Waris <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <img src={beranda} alt="Gambar" width="100%" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="hukumwaris">
            <div className='container'>
              <div className="row mt-5">
                <div className="col-lg-6">
                  <div className="mt-5 mb-5">
                    <h1 className="fw-bold" style={{ zIndex: 1, position: 'relative' }}>Hukum <br /> Waris Islam</h1>
                    <img src={line} alt="line" width="100%" style={{ marginTop: '-90px' }} />
                    <h6 className='mt-3'>Apa itu Hukum Waris ?</h6>
                    <p>Untuk Mengetahui tentang Hukum Waris <br /> Klik Tombol Berikut :</p>
                    <Link className="btn btn-success py-3 px-4 mt-3" to="/hukumwaris">
                      Hukum Waris
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <img src={beranda2} alt="Gambar" width="100%" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="thanks">
            <div className='container'>
              <div className='row justify-content-center text-center'>
                <div className='col-md-10 mt-5'>
                  <h1 className='mt-5'>Terima Kasih Telah Berkunjung</h1>
                  <p className='mt-4'>
                    Kami mengucapkan terima kasih yang sebesar-besarnya kepada Anda yang telah berkunjung dan menggunakan website kami. Kehadiran dan kepercayaan Anda dalam menghitung waris berdasarkan hukum Islam sangat kami hargai.
                    Kami berharap aplikasi FaraidPro dapat membantu mempermudah Anda dalam menyelesaikan perhitungan waris dengan akurat dan sesuai dengan syariat Islam. Kami selalu berusaha untuk memberikan layanan terbaik dan terus mengembangkan aplikasi ini agar lebih bermanfaat bagi umat.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="footer">
            <div className='container'>
              <div className='row'>
                <div className='col-md mt-5'>
                  <img src={logo} alt="Gambar" />
                  <p>
                    Jalan Gebangan <br />
                    RT 002 RW 001 <br />
                    Desa GelangLor <br />
                    Kecamatan Sukorejo <br />
                    Kabupaten Ponorogo <br />
                  </p>
                  <hr />
                  <p>©2024 FaraidPro.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Beranda;
