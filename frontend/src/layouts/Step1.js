import React from 'react';

const Step1 = ({ harta, handleChange }) => (
  <>
    <div className="subHeader">
      <font face="Verdana" size="2">
        <strong>Hitung Total Harta</strong>
      </font>
    </div>
    <div className="bodyText">
      <p>
        <font face="Verdana">
          <strong>
            <font size="2" style={{ color: "rgba(88, 180, 61, 1)" }}>Masukkan Total Harta:</font>
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
      <hr />
    </div>
  </>
);

export default Step1;
