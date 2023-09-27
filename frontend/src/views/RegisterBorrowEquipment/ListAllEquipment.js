import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import Header from "components/Headers/Header";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ListAllEquipment = () => {
  const [equipmentInfos, setEquipmentInfos] = useState([]);

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // Navigate to the desired route when Đăng ký button is clicked
    navigate(`/admin/create-equipment`);
  };

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8000/api/equipments")
      .then((response) => response.json())
      .then((data) => setEquipmentInfos(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Header />
      <Container className="mt--10" fluid>
        <Row>
          <div className="col">
            <Card className="shadow pt-4">
              <div className="d-flex justify-content-between">
                {/* Move the CardHeader to the left */}
                <CardHeader className="border-0">
                  <h3 className="mb-0">Danh sách thiết bị</h3>
                </CardHeader>
                {/* Add the "Cập nhật" button on the right */}
                <div className="text-right">
                  <Button
                    color="primary"
                    size="lg"
                    onClick={handleRegisterClick}
                  >
                    Tạo mới
                  </Button>
                </div>
              </div>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên Thiết bị</th>
                    <th scope="col">Người mượn</th>
                    <th scope="col">Mô tá</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {equipmentInfos.map((detail) => (
                    <tr key={detail._id}>
                      <td>{detail.EquipmentName}</td>
                      <td>{detail.IdUser}</td>
                      <td>{detail.EquipmentDescription}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={(e) => e.preventDefault()}>
                              Xem
                            </DropdownItem>
                            <DropdownItem onClick={(e) => e.preventDefault()}>
                              Xoá
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListAllEquipment;