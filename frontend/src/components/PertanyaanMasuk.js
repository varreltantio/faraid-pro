import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import KonsultasiService from '../services/konsultasi.service';
import moment from 'moment';

const PertanyaanMasuk = () => {
  const [daftarPertanyaan, setDaftarPertanyaan] = useState([]); // State untuk menyimpan daftar pertanyaan
  const [jawaban, setJawaban] = useState({}); // State untuk menyimpan jawaban yang diinput
  const [error, setError] = useState(''); // State untuk menyimpan pesan error

  useEffect(() => {
    fetchDataPertanyaan(); // Memanggil fetchDataPertanyaan saat komponen PertanyaanMasuk dimuat
  }, []);

  // Fungsi async untuk mengambil data pertanyaan dari server
  const fetchDataPertanyaan = async () => {
    try {
      const response = await KonsultasiService.getKonsultasi(); // Memanggil layanan getKonsultasi dari KonsultasiService
      setDaftarPertanyaan(response.data); // Mengatur daftar pertanyaan dengan respons dari server
    } catch (err) {
      console.error('Error fetching pertanyaan:', err); // Menangani error jika gagal mengambil data pertanyaan
      setError('Terjadi kesalahan saat mengambil data pertanyaan.'); // Mengatur pesan error
    }
  };

  // Fungsi untuk mengatur nilai jawaban berdasarkan id pertanyaan
  const handleChange = (id, value) => {
    setJawaban({ ...jawaban, [id]: value }); // Memperbarui nilai jawaban dengan id tertentu
  };

  // Fungsi async untuk mengirim jawaban ke server
  const handleSubmit = async (e, id) => {
    e.preventDefault();

    if (!jawaban[id]) {
      setError('Jawaban tidak boleh kosong.'); // Validasi jika jawaban kosong
      return;
    }

    try {
      await KonsultasiService.jawabPertanyaan(id, jawaban[id]); // Memanggil layanan jawabPertanyaan dari KonsultasiService untuk mengirim jawaban
      setJawaban({ ...jawaban, [id]: '' }); // Mengosongkan input jawaban setelah berhasil mengirim
      setError(''); // Mengosongkan pesan error
      alert('Jawaban berhasil dikirim.'); // Menampilkan alert sukses
      fetchDataPertanyaan(); // Memuat ulang daftar pertanyaan setelah berhasil mengirim jawaban
    } catch (err) {
      console.error('Error submitting jawaban:', err); // Menangani error jika gagal mengirim jawaban
      setError('Terjadi kesalahan saat mengirim jawaban.'); // Mengatur pesan error
    }
  };

  // Mengembalikan tampilan komponen PertanyaanMasuk dengan elemen-elemen UI yang diperlukan
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md">
          <h5>Pertanyaan Masuk</h5>
          {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika terdapat error */}
          <ListGroup>
            {daftarPertanyaan.map((item) => (
              <ListGroup.Item key={item.id} id={item.id}>
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
                    <span>{item.pertanyaan}</span>
                  </div>
                </div>
                <Form onSubmit={(e) => handleSubmit(e, item.id)} className='mt-3'>
                  <Form.Group controlId={`jawaban-${item.id}`}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Tulis jawaban Anda di sini..."
                      value={jawaban[item.id] || ''}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-end">
                    <Button variant="outline-success" type="submit" className="mt-3">
                      Balas
                    </Button>
                  </div>
                </Form>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default PertanyaanMasuk;
