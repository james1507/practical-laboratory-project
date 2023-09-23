import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import Header from "components/Headers/Header";
import ReactPaginate from "react-paginate";

const ListAllUser = () => {
  const [userInfos, setUserInfos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8000/api/accounts")
      .then((response) => response.json())
      .then((data) => setUserInfos(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const pageCount = Math.ceil(userInfos.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedPracticeRoomDetails = userInfos.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage
  );

  return (
    <>
      <Header />
      <Container className="mt--10" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách người dùng</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên tài khoản</th>
                    <th scope="col">Email</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Tuổi</th>
                    <th scope="col">Chuyên ngành</th>
                    <th scope="col">Vị trí</th>
                    <th scope="col">Kinh nghiệm làm việc</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {userInfos.map((detail) => (
                    <tr key={detail._id}>
                      <td>{detail.username}</td>
                      <td>{detail.email}</td>
                      <td>{detail.fullName}</td>
                      <td>{detail.age}</td>
                      <td>{detail.major}</td>
                      <td>{detail.position}</td>
                      <td>{detail.yearExp}</td>
                    </tr>
                  ))}
                </tbody>
                {/* <tfoot>
                  <tr>
                    <td colSpan="7">
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                      />
                    </td>
                  </tr>
                </tfoot> */}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListAllUser;
