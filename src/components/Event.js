//import mock data
import mockData from "../mock-data";

//create and export Event child component
const Event = ({ event }) => {
  return (
    <li>
      <div>{event.summary}</div>
      <div>{event.created}</div>
    </li>
  );
};

export default Event;
