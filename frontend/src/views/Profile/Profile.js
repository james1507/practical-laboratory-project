import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const title = "Thông tin cá nhân";
  const message = "Đây là trang thông tin cá nhân, hãy điền thông tin";
  const imageName = "profile-cover.jpg";

  const userId = useSelector((state) => state.auth.id);

  const [fetchProfileData, setfetchProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch data from the API
    setIsLoading(true);
    fetch(`http://localhost:8000/api/accounts/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setfetchProfileData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [userId]);

  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000); // 5000 milliseconds = 5 seconds
  };
  const handleUpdateInfo = () => {
    const formData = {
      fullName: document.getElementById("input-full-name").value,
      age: document.getElementById("input-age").value,
      collage: document.getElementById("input-collage").value,
      position: document.getElementById("input-position").value,
      major: document.getElementById("input-major-user").value,
      yearExp: document.getElementById("input-year-exp").value.toString(),
      aboutMe: document.getElementById("input-about-me").value,
      imageUrl:
        "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/373674583_2143659479298589_151351544226033364_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=7t1ebZ8bGFgAX_JeOZR&_nc_ht=scontent.fhan14-4.fna&_nc_e2o=f&oh=00_AfCRi15tknZn69T8kY5cnWCvQSQlde8bLsbQSsrP_X6cVQ&oe=6513245E",
    };

    axios
      .put(
        `http://localhost:8000/api/auth/update-profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // If the request is successful, set the success message
        setSuccessMessage("Data created successfully!");
        clearSuccessMessage();
      })
      .catch((error) => {
        // If there's an error, handle it and display an error message
        console.error("Error creating data:", error);
        setSuccessMessage("Error creating data. Please try again.");
        clearSuccessMessage();
      });
  };

  return (
    <>
      <UserHeader
        titleHeader={title}
        messageHeader={message}
        imageCover={imageName}
      />
      {/* Page content */}

      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={isLoading ? "" : fetchProfileData.imageUrl}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <div className="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                <div className="text-center">
                  <h3>
                    {isLoading ? "" : fetchProfileData.fullName}
                    <span className="font-weight-light">
                      , {isLoading ? "" : fetchProfileData.age}
                    </span>
                  </h3>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {isLoading ? "" : fetchProfileData.major}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {isLoading ? "" : fetchProfileData.collage}
                  </div>
                  <hr className="my-4" />
                  <p>{isLoading ? "" : fetchProfileData.aboutMe}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Cập nhật tài khoản</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin người dùng
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Tài khoản
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={
                              isLoading ? "" : fetchProfileData.username
                            }
                            id="input-username"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Địa chỉ email
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={
                              isLoading ? "" : fetchProfileData.email
                            }
                            id="input-email"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-full-name"
                          >
                            Tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-full-name"
                            placeholder="Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-age"
                          >
                            Tuổi
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-age"
                            placeholder="Age"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin liên lạc
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-collage"
                          >
                            Trường công tác
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-collage"
                            placeholder="Collage Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-position"
                          >
                            Chức vụ
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-position"
                            placeholder="Position"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-major-user"
                          >
                            Chuyên ngành
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-major-user"
                            placeholder="Position"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-year-exp"
                          >
                            Số năm kinh nghiệm
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-year-exp"
                            placeholder="Number Exp"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">
                    Giới thiệu về tôi
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Về tôi</label>
                      <Input
                        className="form-control-alternative"
                        rows="4"
                        id="input-about-me"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <Col xs="12" className="text-center">
                    <Button
                      color="primary"
                      size="lg"
                      onClick={handleUpdateInfo}
                    >
                      Cập nhật
                    </Button>
                  </Col>
                  {successMessage && (
                    <Col xs="12" className="text-center mt-2">
                      <div className="text-success">{successMessage}</div>
                    </Col>
                  )}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
