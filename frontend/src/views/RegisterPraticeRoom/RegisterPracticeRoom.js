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
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  DatePickerComponent,
  DateTimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const RegisterPracticeRoom = () => {
  const title = "Đăng ký thông tin phòng thực hành";
  const message =
    "Đây là trang đăng ký thông tin phòng thực hành, hãy điền thông tin";
  const imageName = "pratice_room.png";

  const idMatchSchedule = uuidv4();

  const [practiceRooms, setPracticeRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [moderators, setModerators] = useState([]);
  const [moderator, setSelectedModerator] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedStartDateTime, setSelectedStartDateTime] = useState(null);
  const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch data from your API endpoint (e.g., using Axios or fetch)
    // and set it to the practiceRooms state when the component mounts
    fetch("http://localhost:8000/api/practice-rooms")
      .then((response) => response.json())
      .then((data) => setPracticeRooms(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Fetch data from your API endpoint (e.g., using Axios or fetch)
    // and set it to the users state when the component mounts
    fetch("http://localhost:8000/api/accounts/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Fetch data from your API endpoint (e.g., using Axios or fetch)
    // and set it to the users state when the component mounts
    fetch(`http://localhost:8000/api/accounts/moderator`)
      .then((response) => response.json())
      .then((data) => setModerators(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Fetch subjects from your API endpoint
    fetch("http://localhost:8000/api/subjects")
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  const handleDetailChange = (event) => {
    // Update the "detail" state variable when the input value changes
    setDetail(event.target.value);
  };

  const handleStartDateTimeChange = (event) => {
    setSelectedStartDateTime(event.value); // Use event.value to get the selected date and time
  };

  const handleEndDateTimeChange = (event) => {
    setSelectedEndDateTime(event.value); // Use event.value to get the selected date and time
  };

  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000); // 5000 milliseconds = 5 seconds
  };

  const handleRegister = () => {
    const selectedUserObj = users.find(
      (user) => user.username === selectedUser
    );

    const selectedModeratorObj = moderators.find(
      (moderatorItem) => moderatorItem.username === moderator
    );

    // Find the selected subject object based on its name
    const selectedSubjectObj = subjects.find(
      (subject) => subject.Name === selectedSubject
    );

    // Create an object with the form data
    const formData = {
      IdMatchSchedule: idMatchSchedule,
      Content: document.getElementById("input-address").value,
      PracticeRoomId: selectedRoom,
      PraticeRoomName: selectedRoom,
      UserId: selectedUserObj ? selectedUserObj._id : "",
      UserName: selectedUser,
      ModeratorId: selectedModeratorObj ? selectedModeratorObj._id : "",
      ModeratorName: moderator,
      SubjectId: selectedSubjectObj ? selectedSubjectObj._id : "",
      SubjectName: selectedSubject,
      TimeStart: selectedStartDateTime, // You need to get this value from your DateTimePickerComponent
      TimeEnd: selectedEndDateTime, // You need to get this value from your DateTimePickerComponent
      Detail: detail,
    };

    const formData1 = {
      IdMatchSchedule: idMatchSchedule,
      IdUser: formData.UserId,
      Subject: document.getElementById("input-address").value,
      Description: `Tên Phòng thực hành: ${formData.PraticeRoomName}\n
      Tên giảng viên: ${formData.UserName}\n
      Tên người trực: ${formData.ModeratorName}\n
      Tên môn học: ${formData.SubjectName}\n
      Chi tiết: ${formData.Detail}`,
      StartTime: selectedStartDateTime,
      EndTime: selectedEndDateTime,
      ResourceId: 3,
    };

    // Send a POST request to your API
    axios
      .post("http://localhost:8000/api/practice-room-details", formData)
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

    axios
      .post("http://localhost:8000/api/schedules", formData1)
      .then((response) => {
        // If the request is successful, set the success message
        // setSuccessMessage("Data created successfully!");
        // // Clear the success message after 5 seconds
        // clearSuccessMessage();
      })
      .catch((error) => {
        // If there's an error, handle it and display an error message
        console.error("Error creating data:", error);
        // setSuccessMessage("Error creating data. Please try again.");
        // // Clear the error message after 5 seconds
        // clearSuccessMessage();
      });
  };

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
                                {practiceRooms.map((room) => (
                                  <Dropdown.Item
                                    key={room._id}
                                    eventKey={room.Name}
                                  >
                                    {room.Name}
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
                                title={selectedUser || "Chọn giảng viên"}
                                variant="outline-secondary"
                                color="white"
                                id="dropdown-basic-button"
                                onSelect={(user) => setSelectedUser(user)}
                              >
                                {users.map((user) => (
                                  <Dropdown.Item
                                    key={user._id}
                                    eventKey={user.username}
                                  >
                                    {user.username}
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
                                title={moderator || "Chọn người trực"}
                                variant="outline-secondary"
                                color="white"
                                id="dropdown-basic-button"
                                onSelect={(moderator) =>
                                  setSelectedModerator(moderator)
                                }
                              >
                                {moderators.map((user) => (
                                  <Dropdown.Item
                                    key={user._id}
                                    eventKey={user.username}
                                  >
                                    {user.username}
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
                            id="input-last-name"
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
                                title={selectedSubject || "Chọn môn học"}
                                variant="outline-secondary"
                                color="white"
                                id="dropdown-basic-button"
                                onSelect={(subject) =>
                                  setSelectedSubject(subject)
                                }
                              >
                                {subjects.map((subject) => (
                                  <Dropdown.Item
                                    key={subject._id}
                                    eventKey={subject.Name}
                                  >
                                    {subject.Name}
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
                          <DateTimePickerComponent
                            value={setSelectedStartDateTime} // Bind the selected date and time to the state variable
                            onChange={handleStartDateTimeChange} // Call this function when the date and time changes
                          ></DateTimePickerComponent>
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
                          <DateTimePickerComponent
                            value={setSelectedEndDateTime} // Bind the selected date and time to the state variable
                            onChange={handleEndDateTimeChange} // Call this function when the date and time changes
                          ></DateTimePickerComponent>
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
                        value={detail} // Bind the input value to the state variable
                        onChange={handleDetailChange} // Call this function when the input changes
                      />
                    </FormGroup>
                  </div>
                  <Col xs="12" className="text-center">
                    <Button color="primary" onClick={handleRegister} size="lg">
                      Đăng ký
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

export default RegisterPracticeRoom;
