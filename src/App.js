import { useEffect, useState } from "react";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import Title from "./components/Title";
import CityEventsChart from "./components/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart";
//import functions from api.js
import { extractLocations, getEvents } from "./api";
//import class components
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import "./App.css";

const App = () => {
  //create state variable, called "events" with initial state [].
  const [events, setEvents] = useState([]);
  //create state variable, called "currentNOE" (abbreviation for current number of events) with initial state 32.
  const [currentNOE, setCurrentNOE] = useState(32);
  //create state variable, called "allLocations" with initial state [].
  const [allLocations, setAllLocations] = useState([]);
  //create state variable, called "currentCity" with initial state "See all cities".
  const [currentCity, setCurrentCity] = useState("See all cities");
  //create state variable, called "infoAlert" witn initial state "".
  const [infoAlert, setInfoAlert] = useState("");
  //create state variable, called "errorAlert" with initial state "".
  const [errorAlert, setErrorAlert] = useState("");
  //create state variable, called "warningAlert" with initial state "".
  const [warningAlert, setWarningAlert] = useState("");

  //call fetchData in useEffect()
  useEffect(() => {
    if (navigator.onLine) {
      // if user is offline, set the warning alert message to an empty string ""
      setWarningAlert("");
    } else {
      // if user is online, set the warning alert message to a non-empty string
      setWarningAlert(
        "You are currently in offline mode, events may not be up-to-date."
      );
    }
    fetchData();
  }, [currentCity, currentNOE]);

  //create fetchData function to populate the "events" state with the events list, that will be fetched
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    // initialize the allLocations state in the fetchData() function
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <Title />
      {/* Create div that will serve as a container for all user alerts */}
      <div className="alerts-container">
        {/* 
        Use ternary operator: 
        - if infoAlert's length isn’t zero, render InfoAlert
        - if infoAlert's length is zero, render nothing.
         */}
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {/* 
        Use ternary operator: 
        - if errorAlert's length isn’t zero, render ErrorAlert
        - if errorAlert's length is zero, render nothing.
         */}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {/* 
        Use ternary operator: 
        - if warningAlert's length isn’t zero, render WarningAlert
        - if warningAlert's length is zero, render nothing.
         */}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      {/* pass function prop setCurrentNOE to NumberOfEvents: */}
      <div style={{ color: "#999", margin: "50px 0 10px 0" }}>
        Set number of events
      </div>
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        //pass the setErrorAlert setter function to NumberOfEvents
        setErrorAlert={setErrorAlert}
      />
      <div style={{ color: "#999", marginBottom: "10px" }}>
        Search for a city
      </div>
      {/* pass the allLocations state as a prop to CitySearch: */}
      {/* pass function prop setCurrentCity */}
      {/* pass the setInfoAlert setter function to CitySearch*/}
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <div className="charts-container">
        {/* pass "events" as props */}
        <EventGenresChart events={events} />
        {/* pass "allLocations" and "events" as props for data visualization */}
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      {/* pass the events state as a prop to EventList: */}
      <EventList events={events} />
    </div>
  );
};

export default App;
