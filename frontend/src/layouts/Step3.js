import React from 'react';

const Step3 = ({ ahliWaris, handleChange }) => (
  <>
    <div className="subHeader">
      <font face="Verdana" size="2">
        <strong>Masukkan Ahli Waris</strong>
      </font>
    </div>
    <div className="bodyText">
      <div className='row'>
        <div className='col-md-4'>
          <table className="table table-bordered">
            <tbody>
              {ahliWaris.slice(0, Math.ceil(ahliWaris.length / 3)).map((item, index) => (
                <tr key={index}>
                  <td>
                    <div align="center">
                      <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                        <strong>{index + 1}.</strong>
                      </font>
                    </div>
                  </td>
                  <td>
                    <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                      <strong>{item.label}</strong>
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
        <div className='col-md-4'>
          <table className="table table-bordered">
            <tbody>
              {ahliWaris.slice(Math.ceil(ahliWaris.length / 3), Math.ceil(2 * ahliWaris.length / 3)).map((item, index) => (
                <tr key={index}>
                  <td>
                    <div align="center">
                      <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                        <strong>{index + 1 + Math.ceil(ahliWaris.length / 3)}.</strong>
                      </font>
                    </div>
                  </td>
                  <td>
                    <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                      <strong>{item.label}</strong>
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
        <div className='col-md-4'>
          <table className="table table-bordered">
            <tbody>
              {ahliWaris.slice(Math.ceil(2 * ahliWaris.length / 3)).map((item, index) => (
                <tr key={index}>
                  <td>
                    <div align="center">
                      <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                        <strong>{index + 1 + Math.ceil(2 * ahliWaris.length / 3)}.</strong>
                      </font>
                    </div>
                  </td>
                  <td>
                    <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                      <strong>{item.label}</strong>
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
      </div>
    </div>
  </>
);

export default Step3;
