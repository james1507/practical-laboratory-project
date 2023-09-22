import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const MyDropdown = () => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Dropdown Button"
      className="form-control form-control-alternative"
      style={{ backgroundColor: "white" }} // Change this line to set the background color
    >
      <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
    </DropdownButton>
  );
};

export default MyDropdown;
