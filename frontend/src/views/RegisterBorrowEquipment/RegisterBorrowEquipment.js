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
import { useNavigate } from "react-router-dom";
import "./css/ListAllEquipment.css";
import { useDispatch, useSelector } from "react-redux";

const RegisterBorrowEquipment = () => {
  const title = "Tạo mới mượn thiết bị";
  const message = "Đây là trang tạo mới mượn thiết bị";
  const imageName = "pratice_room.png";

  const [practiceRooms, setPracticeRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [listRoomDetails, setListRoomDetails] = useState([]);
  const [selectedlistRoomDetail, setSelectedListRoomDetail] = useState("");
  const [detail, setDetail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const username = useSelector((state) => state.auth.username);

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
    // Fetch subjects from your API endpoint
    fetch("http://localhost:8000/api/practice-room-details")
      .then((response) => response.json())
      .then((data) => setListRoomDetails(data))
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  const handleDetailChange = (event) => {
    // Update the "detail" state variable when the input value changes
    setDetail(event.target.value);
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

    const formData = {
      IdUser: username,
      RoomName: selectedlistRoomDetail.PraticeRoomName,
      EquipmentName: document.getElementById("input-equipment-name").value,
      EquipmentDescription: detail,
    };

    axios
      .post(`http://localhost:8000/api/equipment`, formData)
      .then((response) => {
        setSuccessMessage("Data created successfully!");
        // Clear the success message after 5 seconds
        clearSuccessMessage();
      })
      .catch((error) => {
        console.error("Error creating data:", error);
        setSuccessMessage("Error creating data. Please try again.");
        // Clear the error message after 5 seconds
        clearSuccessMessage();
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
                    <h3 className="mb-0">Mượn thiết bị</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Nhập thông tin thiết bị mượn
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Tên thiết bị
                          </label>
                          <Input
                            className="form-control-alternative w-50"
                            id="input-equipment-name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {/* Address */}
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Mô tả</label>
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
                      Mượn thiết bị
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

export default RegisterBorrowEquipment;
