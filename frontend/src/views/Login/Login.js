import { useNavigate, Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleSignIn, handleInputChange } from "./LoginLogic.js";

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
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // username
  // password

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); // Chờ dữ liệu từ backend tới
  const [error, setError] = useState(null);

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1>Đăng nhập</h1>
            </div>
            <div className="text-center text-muted mb-4"></div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    fullWidth
                    placeholder="Tên đăng nhập"
                    type="text"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange(e, setFormData, formData)
                    }
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
                    onChange={(e) =>
                      handleInputChange(e, setFormData, formData)
                    }
                  />
                </InputGroup>
              </FormGroup>
              {/* <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Ghi nhớ đăng nhập</span>
                </label>
              </div> */}
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={() => // Sự kiện ấn vào nút
                    handleSignIn(
                      formData,
                      setLoading,
                      dispatch,
                      navigate,
                      setError
                    )
                  }
                  style={{ minWidth: "100px" }}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
                {error && <p style={{ color: "red", fontSize: 12 }}>{error}</p>}
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6"></Col>
          <Col className="text-right" xs="6">
            <NavLink className="nav-link-icon" to="/auth/register" tag={Link}>
              <span className="nav-link-inner--text" style={{ color: "white" }}>
                Tạo tài khoản mới
              </span>
            </NavLink>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
