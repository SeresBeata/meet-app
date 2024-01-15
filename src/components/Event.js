//import useState
import { useState } from "react";
//import mock data
import mockData from "../mock-data";

//create and export Event child component
const Event = ({ event }) => {
  //create state variable, called "showDetails" with initial state "false".
  const [showDetails, setshowDetails] = useState(false);

  return (
    <li>
      <div>{event.summary}</div>
      <div>{event.created}</div>
      <div>{event.location}</div>
      <div>
        <button>show details</button>
      </div>
      {/* 
      Use ternary operator: 
      - If "showDetails" is true, render details of event. 
      - Otherwise, render a null (show nothing/no suggestions).
      */}
      {showDetails ? (
        <div id="details">
          <div>{event.start.dateTime}</div>
          <div>{event.start.timeZone}</div>
          <div>{event.description}</div>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
