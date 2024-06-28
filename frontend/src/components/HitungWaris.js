import React, { useState } from 'react';
import { fnHitung } from '../main'; // Import fungsi fnHitung dari modul main
import Step1 from '../layouts/Step1'; // Import komponen Step1 dari modul layouts
import Step2 from '../layouts/Step2'; // Import komponen Step2 dari modul layouts
import Step3 from '../layouts/Step3'; // Import komponen Step3 dari modul layouts
import Result from '../layouts/Result'; // Import komponen Result dari modul layouts

const HitungWaris = () => {
  // State untuk menyimpan nilai awal dari harta, hak, dan ahli waris
  const initialHak = [
    { label: 'Hutang yang berkaitan dengan harta:', value: '' },
    { label: 'Hutang yang tidak berkaitan dengan harta:', value: '' },
    { label: 'Biaya penyelenggaraan jenazah:', value: '' },
    { label: 'Wasiat (maksimum 1/3 tarikah):', value: '' },
  ];

  const initialAhliWaris = [
    { label: 'Suami', id: 'suami', value: '' },
    { label: 'Istri', id: 'istri', value: '' },
    { label: 'Bapak', id: 'bapak', value: '' },
    { label: 'Ibu', id: 'ibu', value: '' },
    { label: 'Anak Laki-Laki', id: 'putra', value: '' },
    { label: 'Anak Perempuan', id: 'putri', value: '' },
    { label: 'Kakek', id: 'kakek', value: '' },
    { label: 'Nenek', id: 'nenekB', value: '' },
    { label: 'Saudara Kandung', id: 'saudaraK', value: '' },
    { label: 'Saudara Seayah', id: 'saudaraB', value: '' },
    { label: 'Saudara Seibu', id: 'saudaraI', value: '' },
    { label: 'Cucu Laki-Laki', id: 'cucuLk', value: '' },
    { label: 'Cucu Perempuan', id: 'cucuPr', value: '' },
    { label: 'Paman Kandung Laki-Laki', id: 'pamanK', value: '' },
    { label: 'Sepupu Kandung', id: 'putraPK', value: '' },
  ];

  // State menggunakan useState untuk menyimpan nilai saat ini dari harta, hak, ahli waris, dan step saat ini
  const [harta, setHarta] = useState(''); // State untuk menyimpan nilai harta
  const [hak, setHak] = useState(initialHak); // State untuk menyimpan nilai hak
  const [ahliWaris, setAhliWaris] = useState(initialAhliWaris); // State untuk menyimpan nilai ahli waris
  const [currentStep, setCurrentStep] = useState(1); // State untuk menyimpan step saat ini

  // Handler untuk perubahan nilai harta
  const handleHartaChange = (e) => setHarta(e.target.value);

  // Handler untuk perubahan nilai hak
  const handleHakChange = (e, index) => {
    const newHak = [...hak];
    newHak[index].value = e.target.value;
    setHak(newHak);
  };

  // Handler untuk perubahan nilai ahli waris
  const handleAhliWarisChange = (e, index) => {
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[index].value = e.target.value;
    setAhliWaris(newAhliWaris);
  };

  // Handler untuk lanjut ke step berikutnya
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Handler untuk kembali ke step sebelumnya
  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Handler untuk melakukan perhitungan warisan
  const handleHitung = () => {
    fnHitung(); // Memanggil fungsi fnHitung dari modul main
    setCurrentStep(3); // Mengatur step saat ini ke step 3 (hasil)
  };

  // Handler untuk mengulang perhitungan warisan
  const handleHitungUlang = () => {
    setHarta(''); // Mengatur nilai harta kembali ke nilai awal
    setHak(initialHak); // Mengatur nilai hak kembali ke nilai awal
    setAhliWaris(initialAhliWaris); // Mengatur nilai ahli waris kembali ke nilai awal
    setCurrentStep(1); // Mengatur step saat ini kembali ke step 1 (input awal)
  };

  // Mengembalikan tampilan komponen HitungWaris dengan beberapa step yang dapat ditampilkan berdasarkan step saat ini
  return (
    <div className='container'>
      <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
        <Step1 harta={harta} handleChange={handleHartaChange} /> {/* Menampilkan komponen Step1 jika step saat ini adalah 1 */}
        <Step2 hak={hak} handleChange={handleHakChange} /> {/* Menampilkan komponen Step2 jika step saat ini adalah 1 */}
      </div>
      <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
        <Step3 ahliWaris={ahliWaris} handleChange={handleAhliWarisChange} /> {/* Menampilkan komponen Step3 jika step saat ini adalah 2 */}
      </div>
      <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
        <Result /> {/* Menampilkan komponen Result jika step saat ini adalah 3 */}
      </div>

      {/* Tombol navigasi untuk berpindah step dan melakukan perhitungan */}
      <div className="navigation-buttons d-flex justify-content-end mt-4">
        {currentStep > 1 && currentStep < 3 && (
          <button onClick={handlePrevStep} className='btn btn-success rounded-pill px-5 me-3'>Sebelumnya</button>
        )}
        {currentStep < 2 && (
          <button onClick={handleNextStep} className='btn btn-success rounded-pill px-5 me-3'>Selanjutnya</button>
        )}
        {currentStep === 2 && (
          <button onClick={handleHitung} className='btn btn-success rounded-pill px-5'>Hitung</button>
        )}
        {currentStep === 3 && (
          <button onClick={handleHitungUlang} className='btn btn-success rounded-pill px-5'>Hitung Ulang</button>
        )}
      </div>
    </div>
  );
};

export default HitungWaris;