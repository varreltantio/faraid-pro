import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import KonsultasiService from '../services/konsultasi.service';

const PertanyaanMasuk = () => {
  const [daftarPertanyaan, setDaftarPertanyaan] = useState([]);
  const [jawaban, setJawaban] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDataPertanyaan();
  }, []);

  const fetchDataPertanyaan = async () => {
    try {
      const response = await KonsultasiService.getKonsultasi();
      setDaftarPertanyaan(response.data);
    } catch (err) {
      console.error('Error fetching pertanyaan:', err);
      setError('Terjadi kesalahan saat mengambil data pertanyaan.');
    }
  };

  const handleChange = (id, value) => {
    setJawaban({ ...jawaban, [id]: value });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    if (!jawaban[id]) {
      setError('Jawaban tidak boleh kosong.');
      return;
    }

    try {
      await KonsultasiService.jawabPertanyaan(id, jawaban[id]);
      setJawaban({ ...jawaban, [id]: '' });
      setError('');
      alert('Jawaban berhasil dikirim.');
      fetchDataPertanyaan();
    } catch (err) {
      console.error('Error submitting jawaban:', err);
      setError('Terjadi kesalahan saat mengirim jawaban.');
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-md">
        <h5>Daftar Pertanyaan Masuk</h5>
        {error && <p className="text-danger">{error}</p>}
        <ListGroup>
          {daftarPertanyaan.map((item) => (
            <ListGroup.Item key={item.id}>
              <strong>Pertanyaan:</strong> {item.pertanyaan}
              <Form onSubmit={(e) => handleSubmit(e, item.id)}>
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
                    Kirim Jawaban
                  </Button>
                </div>
              </Form>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default PertanyaanMasuk;
