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
      <div>{new Date(event.start.dateTime).toUTCString()}</div>
      <div>{event.location}</div>
      <div>
        {/* 
      Use ternary operator: 
      - If "showDetails" is true, render "hide details" btn. 
      - If "showDetail" is false, render "show details" btn.
      */}
        {showDetails ? (
          <button
            onClick={() => {
              setshowDetails(false);
            }}
          >
            hide details
          </button>
        ) : (
          <button
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
          <div>{event.start.dateTime}</div>
          <div>{event.start.timeZone}</div>
          <div>{event.description}</div>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
