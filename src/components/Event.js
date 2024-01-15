//import mock data
import mockData from "../mock-data";

//create and export Event child component
const Event = ({ event }) => {
  return (
    <li>
      <div>{event.summary}</div>
      <div>{event.created}</div>
      <div>{event.location}</div>
      <div>
        <button>show details</button>
      </div>
      <div id="details">
        <div>{event.start.dateTime}</div>
        <div>{event.start.timeZone}</div>
        <div>{event.description}</div>
      </div>
    </li>
  );
};

export default Event;
