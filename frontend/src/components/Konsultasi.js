import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import KonsultasiService from '../services/konsultasi.service'; // Mengimpor KonsultasiService untuk melakukan permintaan ke backend

const Konsultasi = () => {
  let navigate = useNavigate(); // Menginisialisasi hook useNavigate untuk navigasi programmatic
  let location = useLocation(); // Menginisialisasi hook useLocation untuk mendapatkan informasi lokasi saat ini

  const [pertanyaan, setPertanyaan] = useState(''); // State untuk menyimpan nilai pertanyaan yang diinput
  const [error, setError] = useState(''); // State untuk menyimpan pesan error
  const [daftarPertanyaan, setDaftarPertanyaan] = useState([]); // State untuk menyimpan daftar pertanyaan yang akan ditampilkan
  const [expandedIndex, setExpandedIndex] = useState(null); // State untuk mengontrol index pertanyaan yang sedang diperluas

  // Efek untuk melakukan pengambilan data pertanyaan saat komponen dimuat atau location.state berubah
  useEffect(() => {
    fetchDataPertanyaan(); // Memanggil fungsi fetchDataPertanyaan untuk mengambil data pertanyaan
    if (location.state && location.state.openId) {
      const openId = location.state.openId;
      const index = daftarPertanyaan.findIndex(item => item.id === openId);
      if (index !== -1) {
        setExpandedIndex(index); // Mengatur expandedIndex jika ada openId yang diberikan dari location state
      }
    }
  }, [location.state, daftarPertanyaan]);

  // Fungsi async untuk mengambil data pertanyaan dari backend
  const fetchDataPertanyaan = async () => {
    try {
      const response = await KonsultasiService.getDetailKonsultasi(); // Memanggil KonsultasiService untuk mendapatkan detail konsultasi
      setDaftarPertanyaan(response.data); // Mengatur daftarPertanyaan dengan data yang diterima dari backend
    } catch (err) {
      console.error('Error fetching pertanyaan:', err);
      setError('Terjadi kesalahan saat mengambil data pertanyaan.'); // Mengatur error jika terjadi kesalahan saat pengambilan data
    }
  };

  // Fungsi untuk menangani pengiriman pertanyaan baru
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pertanyaan) {
      setError('Pertanyaan tidak boleh kosong.');
      return;
    }

    try {
      await KonsultasiService.tambahPertanyaan(pertanyaan); // Memanggil KonsultasiService untuk menambahkan pertanyaan baru
      setPertanyaan(''); // Mengosongkan input pertanyaan setelah berhasil dikirim
      setError(''); // Mengosongkan pesan error setelah berhasil dikirim
      alert('Pertanyaan berhasil diajukan.'); // Menampilkan notifikasi bahwa pertanyaan berhasil diajukan
      fetchDataPertanyaan(); // Memuat ulang daftar pertanyaan setelah berhasil menambahkan pertanyaan
    } catch (err) {
      navigate("/login"); // Mengarahkan pengguna ke halaman login jika terjadi kesalahan
      console.error('Error submitting pertanyaan:', err);
      setError('Terjadi kesalahan saat mengirim pertanyaan.'); // Mengatur error jika terjadi kesalahan saat pengiriman pertanyaan
    }
  };

  // Mengembalikan tampilan komponen Konsultasi dengan elemen-elemen UI yang diperlukan
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md">
          <h6 className='mb-3 fw-bold'>Tanya Pakar</h6>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Tulis pertanyaan Anda di sini..."
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika terdapat error */}
            <div className="text-end">
              <Button variant="outline-success" type="submit" className="mt-3">
                <FontAwesomeIcon icon={faPencilAlt} className="me-2" /> {/* Menampilkan ikon pena sebelum teks */}
                Buat Pertanyaan
              </Button>
            </div>
          </Form>

          {/* Menampilkan daftar pertanyaan */}
          <div className="mt-4">
            <div className='card'>
              <div className='card-body'>
                <h5>Pertanyaan:</h5>
                <ListGroup>
                  {daftarPertanyaan.map((item, index) => (
                    <ListGroup.Item key={index} id={item.id}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={item.user.Photo}
                          alt="profile"
                          style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }}
                        />
                        <div>
                          <strong className='font-dm-sans'>{item.user.FullName}</strong>
                          <br />
                          <span className='font-dm-sans'>{moment(item.tanggalPertanyaan).format('DD-MM-YYYY HH:mm')}</span>
                          <br />
                          <span className="text-secondary">{item.pertanyaan}</span>
                          <br />
                          <span onClick={() => setExpandedIndex(index)} className='font-dm-sans'>
                            {expandedIndex === index ? (
                              <></>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faCommentDots} className="ms-1" /> Pembahasan
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      {/* Menampilkan jawaban jika pembahasan diklik */}
                      {expandedIndex === index && item.jawaban && (
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '50px' }}>
                          <img
                            src={item.pakar.Photo}
                            alt="profile"
                            style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }}
                          />
                          <div>
                            <strong className='font-dm-sans'>{item.pakar.FullName}</strong>
                            <br />
                            <span className='font-dm-sans'>{moment(item.tanggalJawaban).format('DD-MM-YYYY HH:mm')}</span>
                            <br />
                            <span className="text-secondary">{item.jawaban}</span>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Konsultasi;
