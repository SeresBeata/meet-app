import { useState } from "react";

//create and export NumberOfEvents child component
const NumberOfEvents = () => {
  //create state variable, called "eventsNumber" with initial state 32.
  const [eventsNumber, setEventsNumber] = useState(32);

  //create function
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setEventsNumber(value);
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        value={eventsNumber}
        onChange={handleInputChanged}
        placeholder="32"
      />
    </div>
  );
};

export default NumberOfEvents;
