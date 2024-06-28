import React from 'react';

const Step3 = ({ ahliWaris, handleChange }) => (
  <>
    <div className="subHeader"> {/* Bagian judul langkah 3 */}
      <font face="Verdana" size="2"> {/* Pengaturan font untuk judul */}
        <strong>Masukkan Ahli Waris</strong> {/* Teks judul yang ditebalkan */}
      </font>
    </div>
    <div className="bodyText"> {/* Konten utama langkah 3 */}
      <div className='row'> {/* Baris untuk menampilkan input ahli waris dalam tiga kolom */}
        <div className='col-md-4'> {/* Kolom pertama */}
          <table className="table table-bordered"> {/* Tabel untuk kolom pertama */}
            <tbody>
              {ahliWaris.slice(0, Math.ceil(ahliWaris.length / 3)).map((item, index) => (
                <tr key={index} >
                  <td>
                    <div align="center">
                      <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                        <strong>{index + 1}.</strong> {/* Nomor urutan ahli waris */}
                      </font>
                    </div>
                  </td>
                  <td>
                    <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                      <strong>{item.label}</strong> {/* Label ahli waris yang ditebalkan */}
                    </font>
                  </td>
                  <td>
                    <font face="Verdana">
                      <input
                        type="text"
                        id={item.id}
                        size="3"
                        maxLength="3"
                        style={{ textAlign: 'right' }}
                        value={item.value !== '0' ? item.value : ''}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </font>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-md-4'> {/* Kolom kedua */}
          <table className="table table-bordered"> {/* Tabel untuk kolom kedua */}
            <tbody>
              {ahliWaris.slice(Math.ceil(ahliWaris.length / 3), Math.ceil(2 * ahliWaris.length / 3)).map((item, index) => (
                <tr key={index} >
                  <td>
                    <div align="center">
                      <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                        <strong>{index + 1 + Math.ceil(ahliWaris.length / 3)}.</strong> {/* Nomor urutan ahli waris */}
                      </font>
                    </div>
                  </td>
                  <td>
                    <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                      <strong>{item.label}</strong> {/* Label ahli waris yang ditebalkan */}
                    </font>
                  </td>
                  <td>
                    <font face="Verdana">
                      <input
                        type="text"
                        id={item.id}
                        size="3"
                        maxLength="3"
                        style={{ textAlign: 'right' }}
                        value={item.value !== '0' ? item.value : ''}
                        onChange={(e) => handleChange(e, index + Math.ceil(ahliWaris.length / 3))}
                      />
                    </font>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-md-4'> {/* Kolom ketiga */}
          <table className="table table-bordered"> {/* Tabel untuk kolom ketiga */}
            <tbody>
              {ahliWaris.slice(Math.ceil(2 * ahliWaris.length / 3)).map((item, index) => (
                <tr key={index} >
                  <td>
                    <div align="center">
                      <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                        <strong>{index + 1 + Math.ceil(2 * ahliWaris.length / 3)}.</strong> {/* Nomor urutan ahli waris */}
                      </font>
                    </div>
                  </td>
                  <td>
                    <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                      <strong>{item.label}</strong> {/* Label ahli waris yang ditebalkan */}
                    </font>
                  </td>
                  <td>
                    <font face="Verdana">
                      <input
                        type="text"
                        id={item.id}
                        size="3"
                        maxLength="3"
                        style={{ textAlign: 'right' }}
                        value={item.value !== '0' ? item.value : ''}
                        onChange={(e) => handleChange(e, index + Math.ceil(2 * ahliWaris.length / 3))}
                      />
                    </font>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >
    </div >
  </>
);

export default Step3;
