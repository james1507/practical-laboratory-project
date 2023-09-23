import React, { useState, useEffect } from "react";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import Header from "components/Headers/Header";
import ReactPaginate from "react-paginate";

const ListPracticeRoom = () => {
  const [practiceRoomDetails, setPracticeRoomDetails] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8000/api/practice-room-details")
      .then((response) => response.json())
      .then((data) => setPracticeRoomDetails(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const pageCount = Math.ceil(practiceRoomDetails.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedPracticeRoomDetails = practiceRoomDetails.slice(
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
                <h3 className="mb-0">Danh sách phòng thực hành</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên phòng thực hành</th>
                    <th scope="col">Nội dung</th>
                    <th scope="col">Tên giảng viên</th>
                    <th scope="col">Người trực</th>
                    <th scope="col">Môn học</th>
                    <th scope="col">Mô tả chi tiết</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {practiceRoomDetails.map((detail) => (
                    <tr key={detail._id}>
                      <td>{detail.PraticeRoomName}</td>
                      <td>{detail.Content}</td>
                      <td>{detail.UserName}</td>
                      <td>{detail.ModeratorName}</td>
                      <td>{detail.SubjectName}</td>
                      <td>{detail.Detail}</td>
                      <td>
                        {formatDate(detail.TimeStart)} -{" "}
                        {formatDate(detail.TimeStart)}
                      </td>
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

export default ListPracticeRoom;
