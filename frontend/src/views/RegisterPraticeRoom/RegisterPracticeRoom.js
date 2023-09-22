import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Dropdown, DropdownButton } from "react-bootstrap";
import React, { useState } from "react";
import { useRef } from "react";
import {
  DatePickerComponent,
  DateTimePickerComponent,
} from "@syncfusion/ej2-react-calendars";

const RegisterPracticeRoom = () => {
  const title = "Đăng ký phòng thực hành";
  const message = "Đây là trang đăng ký phòng thực hành, hãy điền thông tin";
  const imageName = "pratice_room.png";

  const roompRactice = [
    { label: "Phòng 707", value: 1 },
    { label: "Phòng 701", value: 2 },
    { label: "Phòng 703", value: 3 },
    { label: "Phòng 705", value: 4 },
  ];

  const [selectedRoom, setSelectedRoom] = useState("");

  const dropdownButtonRef = useRef();

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
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Đăng ký phòng thực hành</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Nhập thông tin phòng thực hành
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Nội dung thực hành
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Phòng thực hành
                          </label>
                          <InputGroup>
                            <div ref={dropdownButtonRef}>
                              <DropdownButton
                                className="form-control-alternative w-100"
                                as={InputGroup.Prepend}
                                title={selectedRoom || "Chọn phòng thực hành"}
                                variant="outline-secondary"
                                color="white"
                                id="dropdown-basic-button"
                                onSelect={(room) => setSelectedRoom(room)}
                              >
                                {roompRactice.map((room) => (
                                  <Dropdown.Item
                                    key={room.value}
                                    eventKey={room.label}
                                  >
                                    {room.label}
                                  </Dropdown.Item>
                                ))}
                              </DropdownButton>
                            </div>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Giảng viên
                          </label>
                          <InputGroup>
                            <div ref={dropdownButtonRef}>
                              <DropdownButton
                                className="form-control-alternative w-100"
                                as={InputGroup.Prepend}
                                title={selectedRoom || "Chọn phòng thực hành"}
                                variant="outline-secondary"
                                color="white"
                                id="dropdown-basic-button"
                                onSelect={(room) => setSelectedRoom(room)}
                              >
                                {roompRactice.map((room) => (
                                  <Dropdown.Item
                                    key={room.value}
                                    eventKey={room.label}
                                  >
                                    {room.label}
                                  </Dropdown.Item>
                                ))}
                              </DropdownButton>
                            </div>
                          </InputGroup>
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
                            Người trực
                          </label>
                          <InputGroup>
                            <div ref={dropdownButtonRef}>
                              <DropdownButton
                                className="form-control-alternative w-100"
                                as={InputGroup.Prepend}
                                title={selectedRoom || "Chọn phòng thực hành"}
                                variant="outline-secondary"
                                color="white"
                                id="dropdown-basic-button"
                                onSelect={(room) => setSelectedRoom(room)}
                              >
                                {roompRactice.map((room) => (
                                  <Dropdown.Item
                                    key={room.value}
                                    eventKey={room.label}
                                  >
                                    {room.label}
                                  </Dropdown.Item>
                                ))}
                              </DropdownButton>
                            </div>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Số lượng sinh viên
                          </label>
                          <Input
                            className="form-control-alternative w-50"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {/* Address */}
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Môn học
                          </label>
                          <InputGroup>
                            <div ref={dropdownButtonRef}>
                              <DropdownButton
                                className="form-control-alternative w-100"
                                as={InputGroup.Prepend}
                                title={selectedRoom || "Chọn phòng thực hành"}
                                variant="outline-secondary"
                                color="white"
                                id="dropdown-basic-button"
                                onSelect={(room) => setSelectedRoom(room)}
                              >
                                {roompRactice.map((room) => (
                                  <Dropdown.Item
                                    key={room.value}
                                    eventKey={room.label}
                                  >
                                    {room.label}
                                  </Dropdown.Item>
                                ))}
                              </DropdownButton>
                            </div>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Thời gian bắt đầu
                          </label>
                          <DateTimePickerComponent></DateTimePickerComponent>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Thời gian kết thúc
                          </label>
                          <DateTimePickerComponent></DateTimePickerComponent>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Chi tiết</label>
                      <Input
                        className="form-control-alternative"
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <Col xs="12" className="text-center">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      Đăng ký
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

export default RegisterPracticeRoom;
