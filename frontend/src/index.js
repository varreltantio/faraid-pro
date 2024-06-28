import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Membuat root ReactDOM di elemen dengan id 'root'

root.render( // Mem-render aplikasi React di root
  <React.StrictMode> {/* Menggunakan StrictMode untuk memberi peringatan tambahan dan mendeteksi potensi masalah */}
    <BrowserRouter> {/* Mengelilingi aplikasi dengan BrowserRouter untuk routing menggunakan browser history */}
      <App /> {/* Memasukkan komponen App di dalam BrowserRouter */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
