import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import { Form, Button, Row, Col } from 'react-bootstrap';

const UpdateProfile = () => {
  // State untuk menyimpan data profil pengguna dan gambar profil
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null); // State untuk menyimpan file gambar yang akan diunggah
  const [imageUrl, setImageUrl] = useState(); // State untuk menyimpan URL gambar profil

  useEffect(() => {
    fetchProfile(); // Memanggil fungsi fetchProfile saat komponen pertama kali dirender
  }, []);

  // Fungsi untuk mengambil data profil pengguna dari UserService
  const fetchProfile = async () => {
    try {
      const response = await UserService.getProfile(); // Memanggil endpoint getProfile dari UserService
      setUsername(response.data.username); // Mengupdate state username dengan nilai dari response
      setFullName(response.data.fullName); // Mengupdate state fullName dengan nilai dari response
      setEmail(response.data.email); // Mengupdate state email dengan nilai dari response
      setImageUrl(response.data.photo); // Mengupdate state imageUrl dengan URL foto profil dari response
    } catch (err) {
      console.error('Error fetching profile:', err); // Menangani error jika terjadi kesalahan dalam mengambil data profil
    }
  };

  // Fungsi untuk meng-handle perubahan pada input unggah gambar
  const handleImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Mengupdate imageUrl dengan URL gambar yang akan diunggah
    setImage(e.target.files[0]); // Mengupdate state image dengan file gambar yang akan diunggah
  };

  // Fungsi untuk meng-handle submit form update profil
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UserService.updateProfile(username, fullName, image); // Memanggil fungsi updateProfile dari UserService
      alert('Profile updated successfully'); // Menampilkan alert sukses setelah profil berhasil diperbarui
      fetchProfile(); // Memanggil kembali fetchProfile untuk mengambil data profil terbaru setelah update
    } catch (err) {
      console.error('Error updating profile:', err); // Menangani error jika terjadi kesalahan saat update profil
    }
  };

  // Render komponen UpdateProfile
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Profile</h5>
              <Form onSubmit={handleSubmit}>
                <div className="text-center mb-3">
                  {imageUrl && (
                    <img src={imageUrl} alt="profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                  )}
                  <Form.Group controlId="formImage" className="mt-3">
                    <Form.Label>Unggah Foto</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                  </Form.Group>
                </div>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formUsername" className="mb-3">
                      <Form.Label>Nama Pengguna</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formFullName" className="mb-3">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    readOnly
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="success" type="submit" className='px-3'>
                    Simpan
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;