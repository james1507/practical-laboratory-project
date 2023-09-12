import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a className="font-weight-bold ml-1" href="#" target="_blank">
              Nhóm 2
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink href="#" rel="noopener noreferrer" target="_blank">
                Nhóm 2
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="#" rel="noopener noreferrer" target="_blank">
                Về chúng tôi
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="#" rel="noopener noreferrer" target="_blank">
                CNTT
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="#" rel="noopener noreferrer" target="_blank">
                Đại học Kiến trúc Hà Nội
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
