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
import { useEffect, useState } from "react";

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/schedules') 
      .then((response) => {
        setScheduleData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const eventSettings = {
    dataSource: scheduleData, 
    id: 'Id', 
    fields: {
      id: 'Id', 
      subject: 'Subject',
      startTime: 'StartTime',
      endTime: 'EndTime',
    },
  };

  return (
    <ScheduleComponent height='550px' eventSettings={eventSettings}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default Schedule;
