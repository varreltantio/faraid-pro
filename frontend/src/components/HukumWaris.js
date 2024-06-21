import React from 'react';
import hukumwaris from '../images/hukumwaris.png';

const HukumWaris = () => {
  return (
    <div className="row mt-5">
      <div className="col-lg-4">
        <div className="mt-5 mb-5">
          <h3 className="fw-bold mb-3" style={{ color: "rgba(88, 180, 61, 1)" }}>Hukum Waris Islam</h3>
          <p>Dalam Kamus Besar Bahasa Indonesia (KBBI) kata  waris berarti Orang yang berhak menerima harta pusaka  dari orang yang telah meninggal. 1 Di dalam bahasa Arab kata waris berasal dari kata ورث-يرث-ورثا yang artinya  adalah Waris. Contoh, ورث اباه yang artinya Mewaris harta  (ayahnya).2  Waris menurut hukum Islam adalah hukum yang  mengatur tentang perpidahan hak milik, hak milik yang dimaksud adalah  berupa harta, seorang yang telah meninggal dunia kepada  ahli warisnya. Dalam istilah lain waris disebut juga  dengan fara‟id.</p>
        </div>
      </div>
      <div className="col-lg-8">
        <div>
          <img src={hukumwaris} alt="Gambar" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default HukumWaris;
