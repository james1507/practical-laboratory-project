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

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editMode, setEditMode] = useState(false); // To toggle between create and edit modes
  const [editEventData, setEditEventData] = useState(null); // To store data for editing
  const [newEventData, setNewEventData] = useState({
    Id: "",
    Subject: "",
    StartTime: new Date(),
    EndTime: new Date(),
  });

  const userId = useSelector((state) => state.auth.id);
  const roles = useSelector((state) => state.auth.roles);

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

  const onCreateButtonClick = () => {
    setShowCreateForm(true);
    setEditMode(false); // Switch to create mode
    setNewEventData({
      Id: "",
      Subject: "",
      StartTime: new Date(),
      EndTime: new Date(),
    });
  };

  const onPopupOpen = (args) => {
    if (
      args.type === "Editor" &&
      args.target &&
      args.target.classList.contains("e-appointment-add")
    ) {
      args.cancel = true;
      setShowCreateForm(true);
      setEditMode(false); // Switch to create mode
      setNewEventData({
        Id: "",
        Subject: "",
        StartTime: new Date(),
        EndTime: new Date(),
      });
    }
  };

  const onFormInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "StartTime" || name === "EndTime" ? new Date(value) : value;

    if (editMode) {
      // If in edit mode, update editEventData
      setEditEventData((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    } else {
      // If in create mode, update newEventData
      setNewEventData((prevState) => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const eventDataToSubmit = {
      ...newEventData,
      StartTime: newEventData.StartTime.toISOString(),
      EndTime: newEventData.EndTime.toISOString(),
    };

    if (editMode) {
      // If in edit mode, update the event
      axios
        .put(
          `http://localhost:8000/api/schedules/${editEventData.Id}`,
          eventDataToSubmit
        )
        .then(() => {
          console.log("Schedule event updated successfully.");
          fetchScheduleData();
          setShowCreateForm(false);
        })
        .catch((error) => {
          console.error("Error updating schedule event:", error);
        });
    } else {
      // If in create mode, create a new event
      axios
        .post("http://localhost:8000/api/schedules", eventDataToSubmit)
        .then(() => {
          console.log("New schedule event created successfully.");
          fetchScheduleData();
          setShowCreateForm(false);
        })
        .catch((error) => {
          console.error("Error creating new schedule event:", error);
        });
    }
  };

  const onDeleteButtonClick = () => {
    if (editEventData && editEventData.Id) {
      // If in edit mode and editEventData has an ID, delete the event
      axios
        .delete(`http://localhost:8000/api/schedules/${editEventData.Id}`)
        .then(() => {
          console.log("Schedule event deleted successfully.");
          fetchScheduleData();
          setShowCreateForm(false);
        })
        .catch((error) => {
          console.error("Error deleting schedule event:", error);
        });
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

  return (
    <>
      <ScheduleComponent
        readonly={true}
        height="650px"
        eventSettings={eventSettings}
        popupOpen={onPopupOpen}
        eventClick={(args) => {
          setShowCreateForm(true);
          setEditMode(true); // Switch to edit mode
          setEditEventData(args.event); // Set data for editing
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
      <div className="create-button-container">
        <button onClick={onCreateButtonClick}>Create Event</button>
      </div>
      {showCreateForm && (
        <div className="create-form-container">
          {editMode ? (
            // Edit mode form
            <form onSubmit={onFormSubmit}>
              <label>
                Event ID:
                <input
                  type="text"
                  name="Id"
                  value={editEventData.Id}
                  onChange={onFormInputChange}
                  readOnly // Read-only for edit mode
                />
              </label>
              <label>
                Event Subject:
                <input
                  type="text"
                  name="Subject"
                  value={editEventData.Subject}
                  onChange={onFormInputChange}
                />
              </label>
              <label>
                Start Time:
                <input
                  type="datetime-local"
                  name="StartTime"
                  value={editEventData.StartTime.toISOString().slice(0, -8)}
                  onChange={onFormInputChange}
                />
              </label>
              <label>
                End Time:
                <input
                  type="datetime-local"
                  name="EndTime"
                  value={editEventData.EndTime.toISOString().slice(0, -8)}
                  onChange={onFormInputChange}
                />
              </label>
              <button type="submit">Save Changes</button>
            </form>
          ) : (
            // Create mode form
            <form onSubmit={onFormSubmit}>
              <label>
                Event ID:
                <input
                  type="text"
                  name="Id"
                  value={newEventData.Id}
                  onChange={onFormInputChange}
                />
              </label>
              <label>
                Event Subject:
                <input
                  type="text"
                  name="Subject"
                  value={newEventData.Subject}
                  onChange={onFormInputChange}
                />
              </label>
              <label>
                Start Time:
                <DateTimePickerComponent
                  type="datetime-local"
                  name="StartTime"
                  value={newEventData.StartTime}
                  onChange={onFormInputChange}
                ></DateTimePickerComponent>
                {/* <input
                  type="datetime-local"
                  name="StartTime"
                  value={newEventData.StartTime.toISOString().slice(0, -8)}
                  onChange={onFormInputChange}
                /> */}
              </label>
              <label>
                End Time:
                <DateTimePickerComponent
                  type="datetime-local"
                  name="EndTime"
                  value={newEventData.EndTime}
                  onChange={onFormInputChange}
                ></DateTimePickerComponent>
                {/* <input
                  type="datetime-local"
                  name="EndTime"
                  value={newEventData.EndTime.toISOString().slice(0, -8)}
                  onChange={onFormInputChange}
                /> */}
              </label>
              <button type="submit">Save</button>
            </form>
          )}

          {/* Delete Event Button */}
          {editMode && (
            <button onClick={onDeleteButtonClick}>Delete Event</button>
          )}
        </div>
      )}
    </>
  );
};

export default Schedule;
