import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import axios from "axios"; // Import Axios for making HTTP requests

const Register = () => {
  // Define state variables to store form input values and error messages
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: ["user"],
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSignup = async () => {
    setLoading(true);
    try {
      // Make a POST request to the /api/auth/signup endpoint with form data
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        formData
      );

      if (response.status === 200) {
        // Registration was successful, show a success message
        setSuccessMessage("Đăng ký thành công!");
        setError(null);
        setLoading(false);
      }
    } catch (error) {
      // Handle registration errors, display an error message
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        setLoading(false);
      } else {
        setError("Có lỗi xảy ra trong quá trình đăng ký.");
        setLoading(false);
      }
      setSuccessMessage(null);
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    fullWidth
                    placeholder="Tên đăng nhập"
                    type="text"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="new-email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật khẩu"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                {successMessage && (
                  <p style={{ color: "green" }}>{successMessage}</p>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={handleSignup}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Tạo tài khoản"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
