//import useState
import { useState } from "react";
//import mock data
import mockData from "../mock-data";

//create and export Event child component
const Event = ({ event }) => {
  //create state variable, called "showDetails" with initial state "false".
  const [showDetails, setshowDetails] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{new Date(event.start.dateTime).toUTCString()}</p>
      <p>{event.location}</p>
      <div>
        {/* 
      Use ternary operator: 
      - If "showDetails" is true, render "hide details" btn. 
      - If "showDetail" is false, render "show details" btn.
      */}
        {showDetails ? (
          <button
            className="details-btn"
            onClick={() => {
              setshowDetails(false);
            }}
          >
            hide details
          </button>
        ) : (
          <button
            className="details-btn"
            onClick={() => {
              setshowDetails(true);
            }}
          >
            show details
          </button>
        )}
      </div>
      {/* 
      Use ternary operator: 
      - If "showDetails" is true, render details of event. 
      - Otherwise, render a null (show nothing/no suggestions).
      */}
      {showDetails ? (
        <div id="details">
          <p>Time zone: {event.start.timeZone}</p>
          <p>{event.description}</p>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
