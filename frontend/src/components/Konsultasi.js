import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import KonsultasiService from '../services/konsultasi.service';

const Konsultasi = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const [pertanyaan, setPertanyaan] = useState('');
  const [error, setError] = useState('');
  const [daftarPertanyaan, setDaftarPertanyaan] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetchDataPertanyaan();
    if (location.state && location.state.openId) {
      const openId = location.state.openId;
      const index = daftarPertanyaan.findIndex(item => item.id === openId);
      if (index !== -1) {
        setExpandedIndex(index);
      }
    }
  }, [location.state, daftarPertanyaan]);

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
      navigate("/login");
      console.error('Error submitting pertanyaan:', err);
      setError('Terjadi kesalahan saat mengirim pertanyaan.');
    }
  };

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
            {error && <p className="text-danger">{error}</p>}
            <div className="text-end">
              <Button variant="outline-success" type="submit" className="mt-3">
                <FontAwesomeIcon icon={faPencilAlt} className="me-2" />
                Buat Pertanyaan
              </Button>
            </div>
          </Form>

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
