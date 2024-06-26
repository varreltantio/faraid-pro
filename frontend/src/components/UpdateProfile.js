import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import { Form, Button, Row, Col } from 'react-bootstrap';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await UserService.getProfile();
      setUsername(response.data.username);
      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setImageUrl(response.data.photo);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleImageChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UserService.updateProfile(username, fullName, image);
      alert('Profile updated successfully');
      fetchProfile();
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

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
