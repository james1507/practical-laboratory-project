import React, { useEffect, useState } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import { useSelector } from "react-redux";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const userId = useSelector((state) => state.auth.id);
  const roles = useSelector((state) => state.auth.roles);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const hasRequiredRole = roles.some(
    (role) => role === "ROLE_MODERATOR" || role === "ROLE_ADMIN"
  );

  var url = "";

  if (hasRequiredRole) {
    url = "http://localhost:8000/api/schedules";
  } else {
    url = `http://localhost:8000/api/schedules/user?IdUser=${userId}`;
  }

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = () => {
    axios
      .get(url)
      .then((response) => {
        setScheduleData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onPopupOpen = (args) => {
    if (
      args.type === "Editor" &&
      args.target &&
      args.target.classList.contains("e-appointment-add")
    ) {
      args.cancel = true;
    }
  };

  const eventSettings = {
    dataSource: scheduleData,
    id: "Id",
    fields: {
      id: "Id",
      subject: "Subject",
      startTime: "StartTime",
      endTime: "EndTime",
    },
  };

  const handleEventClick = (args) => {
    // Set the selected event when an event is clicked
    setSelectedEvent(args.event);
  };

  const handleRegisterClick = () => {
    // Navigate to the desired route when Đăng ký button is clicked
    navigate(
      `/admin/user-update-practice-room?IdMatchSchedule=${selectedEvent.IdMatchSchedule}`
    );
  };

  return (
    <>
      <ScheduleComponent
        readonly={true}
        height="700px"
        eventSettings={eventSettings}
        popupOpen={onPopupOpen}
        eventClick={handleEventClick} // Call the event handler when an event is clicked
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
      {selectedEvent && (
        <>
          <h1>Selected Event: {selectedEvent.IdMatchSchedule}</h1>
          <Col xs="12" className="text-center">
            <Button color="primary" onClick={handleRegisterClick} size="lg">
              Cập nhật thông tin
            </Button>
          </Col>
        </>
      )}
    </>
  );
};

export default Schedule;
