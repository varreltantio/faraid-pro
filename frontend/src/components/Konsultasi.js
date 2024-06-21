import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import KonsultasiService from '../services/konsultasi.service';

const Konsultasi = () => {
  const [pertanyaan, setPertanyaan] = useState('');
  const [error, setError] = useState('');
  const [daftarPertanyaan, setDaftarPertanyaan] = useState([]);

  useEffect(() => {
    fetchDataPertanyaan();
  }, []);

  const fetchDataPertanyaan = async () => {
    try {
      const response = await KonsultasiService.getDetailKonsultasi();
      setDaftarPertanyaan(response.data);
    } catch (err) {
      console.error('Error fetching pertanyaan:', err);
      setError('Terjadi kesalahan saat mengambil data pertanyaan.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pertanyaan) {
      setError('Pertanyaan tidak boleh kosong.');
      return;
    }

    try {
      await KonsultasiService.tambahPertanyaan(pertanyaan);
      setPertanyaan('');
      setError('');
      alert('Pertanyaan berhasil diajukan.');
      fetchDataPertanyaan();
    } catch (err) {
      console.error('Error submitting pertanyaan:', err);
      setError('Terjadi kesalahan saat mengirim pertanyaan.');
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-md">
        <h5>Tanya Pakar</h5>
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
          {error && <p className="text-danger">{error}</p>}
          <div className="text-end">
            <Button variant="outline-success" type="submit" className="mt-3">
              <FontAwesomeIcon icon={faPencilAlt} className="me-2" />
              Buat Pertanyaan
            </Button>
          </div>
        </Form>

        <div className="mt-4">
          <h5>Daftar Pertanyaan yang Diajukan</h5>
          <ListGroup>
            {daftarPertanyaan.map((item, index) => (
              <ListGroup.Item key={index}>
                <strong>Pertanyaan:</strong> {item.pertanyaan}
                <br />
                {item.jawaban && (
                  <>
                    <strong>Jawaban:</strong> {item.jawaban}
                    <br />
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default Konsultasi;
