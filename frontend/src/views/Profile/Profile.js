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

const Profile = () => {
  const title = "Thông tin cá nhân";
  const message = "Đây là trang thông tin cá nhân, hãy điền thông tin";
  const imageName = "profile-cover.jpg";

  const fullName = useSelector((state) => state.auth.fullName);
  const age = useSelector((state) => state.auth.age);
  const collage = useSelector((state) => state.auth.collage);
  const position = useSelector((state) => state.auth.position);
  const major = useSelector((state) => state.auth.major);
  const yearExp = useSelector((state) => state.auth.yearExp);
  const aboutMe = useSelector((state) => state.auth.aboutMe);
  const imageUrl = useSelector((state) => state.auth.imageUrl);

  const [profileData, setProfileData] = useState({
    fullName: "Jessica Jones",
    age: "27",
    collage: "University of Computer Science",
    position: "Solution Manager - Creative Tim Officer",
    major: "",
    yearExp: "",
    aboutMe: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfileUpdate = () => {
    // Send a PUT request to update the profile with profileData
    fetch("http://localhost:8000/api/auth/update-profile", {
      // Replace with your API URL
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response as needed
        // You can also show a success message or perform other actions here
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle errors here
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
                        src={imageUrl} 
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
                    {fullName}
                    <span className="font-weight-light">, {age}</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {major}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {collage}
                  </div>
                  <hr className="my-4" />
                  <p>{aboutMe}</p>
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
                            defaultValue=""
                            id="input-username"
                            placeholder="Username"
                            type="text"
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
                            id="input-email"
                            placeholder="nam@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-first-name"
                            placeholder="Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Tuổi
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-first-name"
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
                            htmlFor="input-address"
                          >
                            Trường công tác
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-address"
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
                            htmlFor="input-city"
                          >
                            Chức vụ
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-city"
                            placeholder="Position"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Chuyên ngành
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-country"
                            placeholder="Major"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Số năm kinh nghiệm
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
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
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue=""
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <Col xs="12" className="text-center">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={() => handleProfileUpdate}
                      size="lg"
                    >
                      Cập nhật
                    </Button>
                  </Col>
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
