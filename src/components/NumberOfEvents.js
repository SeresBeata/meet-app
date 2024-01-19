import { useState } from "react";

//create and export NumberOfEvents child component
const NumberOfEvents = ({ setCurrentNOE }) => {
  //create state variable, called "eventsNumber" with initial state 32.
  const [eventsNumber, setEventsNumber] = useState(32);

  //create function
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setEventsNumber(value);
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        value={eventsNumber}
        onChange={handleInputChanged}
        placeholder="Enter a number"
      />
    </div>
  );
};

export default NumberOfEvents;
