import React from 'react';

const Result = () => (
  <div className="subHeader"> {/* Kontainer utama untuk bagian hasil */}
    <div id="result" style={{ visibility: 'visible' }}> {/* Bagian judul hasil */}
      <hr /> {/* Garis pemisah */}
      <font face="Verdana" size="2"> {/* Pengaturan font untuk judul hasil */}
        <strong>Hasil</strong> {/* Teks judul hasil yang ditebalkan */}
      </font>
    </div>
    <div align="justify" className="hasil" id="hasil"> {/* Area untuk menampilkan hasil */}
      {/* Konten hasil akan ditampilkan di sini */}
    </div>
  </div>
);

export default Result;
