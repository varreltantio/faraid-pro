import React from 'react';

const Step1 = ({ harta, handleChange }) => (
  <>
    <div className="subHeader"> {/* Bagian judul langkah 1 */}
      <font face="Verdana" size="2"> {/* Pengaturan font untuk judul */}
        <strong>Hitung Total Harta</strong> {/* Teks judul yang ditebalkan */}
      </font>
    </div>
    <div className="bodyText"> {/* Konten utama langkah 1 */}
      <p>
        <font face="Verdana"> {/* Pengaturan font untuk konten */}
          <strong> {/* Teks yang ditebalkan */}
            <font size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>Masukkan Total Harta:</font> {/* Teks instruksi dengan warna khusus */}
          </strong>
          <input
            className='ms-3'
            type="text"
            id="harta"
            style={{ textAlign: 'right' }}
            value={harta}
            onChange={handleChange}
          />
        </font>
      </p>
      <hr /> {/* Garis pemisah */}
    </div>
  </>
);

export default Step1;