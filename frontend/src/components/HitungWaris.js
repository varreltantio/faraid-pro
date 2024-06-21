import React, { useState } from 'react';
import { fnHitung } from '../main';
import Step1 from '../layouts/Step1';
import Step2 from '../layouts/Step2';
import Step3 from '../layouts/Step3';
import Result from '../layouts/Result';

const HitungWaris = () => {
  const [harta, setHarta] = useState('');
  const [hak, setHak] = useState([
    { label: 'Hutang yang berkaitan dengan harta:', value: '' },
    { label: 'Hutang yang tidak berkaitan dengan harta:', value: '' },
    { label: 'Biaya penyelenggaraan jenazah:', value: '' },
    { label: 'Wasiat (maksimum 1/3 tarikah):', value: '' },
  ]);
  const [ahliWaris, setAhliWaris] = useState([
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
  ]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleHartaChange = (e) => setHarta(e.target.value);

  const handleHakChange = (e, index) => {
    const newHak = [...hak];
    newHak[index].value = e.target.value;
    setHak(newHak);
  };

  const handleAhliWarisChange = (e, index) => {
    const newAhliWaris = [...ahliWaris];
    newAhliWaris[index].value = e.target.value;
    setAhliWaris(newAhliWaris);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleHitung = () => {
    fnHitung();
    setCurrentStep(3);
  };

  return (
    <div>
      <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
        <Step1 harta={harta} handleChange={handleHartaChange} />
        <Step2 hak={hak} handleChange={handleHakChange} />
      </div>
      <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
        <Step3 ahliWaris={ahliWaris} handleChange={handleAhliWarisChange} />
      </div>
      <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
        <Result />
      </div>

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
      </div>
    </div>
  );
};

export default HitungWaris;
