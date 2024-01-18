import { useEffect, useState } from "react";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
//import function from api.js
import { getEvents } from "./api";
import "./App.css";

const App = () => {
  //create state variable, called "events" with initial state [].
  const [events, setEvents] = useState([]);
  //create state variable, called "currentNOE" (abbreviation for current number of events) with initial state 32.
  const [currentNOE, setCurrentNOE] = useState(32);

  //call fetchData in useEffect()
  useEffect(() => {
    fetchData();
  }, []);

  //create fetchData function to populate the "events" state with the events list, that will be fetched
  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
  };

  return (
    <div className="App">
      <NumberOfEvents />
      <CitySearch />
      {/* pass the events state as a prop to EventList: */}
      <EventList events={events} />
    </div>
  );
};

export default App;
