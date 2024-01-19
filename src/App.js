import { useEffect, useState } from "react";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
//import functions from api.js
import { extractLocations, getEvents } from "./api";
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

  //call fetchData in useEffect()
  useEffect(() => {
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
      {/* pass function prop setCurrentNOE to NumberOfEvents: */}
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      {/* pass the allLocations state as a prop to CitySearch: */}
      {/* pass function prop setCurrentCity */}
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      {/* pass the events state as a prop to EventList: */}
      <EventList events={events} />
    </div>
  );
};

export default App;
