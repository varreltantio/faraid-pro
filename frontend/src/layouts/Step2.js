import React from 'react';

const Step2 = ({ hak, handleChange }) => (
  <>
    <div className="subHeader">
      <font face="Verdana" size="2">
        <strong>Hak-hak yang Harus Dipenuhi</strong>
      </font>
    </div>
    <div className="bodyText">
      <table width="622" border="0" cellpadding="0">
        <tbody>
          {hak.map((item, index) => (
            <tr key={index} style={{ height: "50px" }}>
              <td width="370">
                <div align="left">
                  <font face="Verdana" size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>
                    <strong>{item.label}</strong>
                  </font>
                </div>
              </td>
              <td width="222">
                <strong>
                  <label>
                    <font face="Verdana">
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
