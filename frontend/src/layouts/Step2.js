import React from 'react';

const Step2 = ({ hak, handleChange }) => (
  <>
    <div className="subHeader"> {/* Bagian judul langkah 2 */}
      <font face="Verdana" size="2"> {/* Pengaturan font untuk judul */}
        <strong>Hak-hak yang Harus Dipenuhi</strong> {/* Teks judul yang ditebalkan */}
      </font>
    </div>
    <div className="bodyText"> {/* Konten utama langkah 2 */}
      <table width="622" border="0" cellpadding="0"> {/* Tabel untuk menampilkan daftar hak */}
        <tbody>
          {hak.map((item, index) => (
            <tr key={index} style={{ height: "50px" }}> {/* Setiap item hak sebagai baris tabel */}
              <td width="370">
                <div align="left">
                  <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}> {/* Pengaturan teks khusus dengan warna */}
                    <strong>{item.label}</strong> {/* Label hak yang ditebalkan */}
                  </font>
                </div>
              </td>
              <td width="222">
                <strong>
                  <label>
                    <font face="Verdana"> {/* Pengaturan font untuk nilai input */}
                      <input
                        type="text"
                        id={`hak${index + 1}`}
                        style={{ textAlign: 'right' }}
                        value={item.value}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </font>
                  </label>
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default Step2;
