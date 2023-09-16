import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const RegisterBorrowEquipment = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--10" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Đăng ký mượn thiết bị</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên thiết bị</th>
                    <th scope="col">Mục đích</th>
                    <th scope="col">Mô tả chi tiết</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("../../assets/img/theme/bootstrap.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Dây cáp kết nối máy chiếu
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      Kết nối với những máy không <br /> có đầu cắm vào máy
                      chiếu
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Đầu chuyển USB A
                      </Badge>
                      <br />
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Đầu chuyển USB C
                      </Badge>
                      <br />
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Đầu chuyển Mạng
                      </Badge>
                    </td>
                    <div class="col-4">
                      <td className="text-center" style={{ padding: "35px" }}>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "#FFA500",
                            borderRadius: "50%",
                            position: "relative",
                          }}
                        >
                          <span
                            className="h2 text-white"
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            1
                          </span>
                        </div>
                      </td>
                    </div>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Đầu chuyển USB A
                      </Badge>
                      <br />
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Đầu chuyển USB C
                      </Badge>
                      <br />
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Đầu chuyển Mạng
                      </Badge>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Mượn thiết bị
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RegisterBorrowEquipment;
