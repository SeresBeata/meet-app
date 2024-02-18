import { useState } from "react";

//create and export NumberOfEvents child component
const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  //create state variable, called "eventsNumber" with initial state 32.
  const [eventsNumber, setEventsNumber] = useState(32);

  //create function
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setEventsNumber(value);
    setCurrentNOE(value);

    let errorText;
    //use isNaN() function
    if (isNaN(value) || value <= 0) {
      errorText =
        "You can only use positive numbers to set the number of events!";
      setErrorAlert(errorText);
    } else {
      setCurrentNOE(value);
      errorText = "";
      setErrorAlert(errorText);
    }
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
