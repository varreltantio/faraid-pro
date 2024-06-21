import React from 'react';
import { Link } from "react-router-dom";
import beranda from '../images/beranda.png';

const Beranda = ({ role }) => {
  return (
    <div className="row mt-5">
      <div className="col-lg-7">
        <div className="mt-5 mb-5">
          <h5 className="text-custom-green">SELAMAT DATANG DI FARAID PRO</h5>
          <h3>HITUNG HARTA WARISAN BERDASARKAN HUKUM ISLAM</h3>
          <hr />
          {role !== 'pakar' && (
            <>
              <h6 className='mt-3'>Apa itu Hukum Waris ?</h6>
              <p>Untuk Mengetahui tentang Hukum Waris <br /> Klik Tombol Berikut :</p>
              <Link className="btn btn-success rounded-pill px-5" to="/hukumwaris">
                Hukum Waris
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="col-lg-5">
        <div>
          <img src={beranda} alt="Gambar" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Beranda;
