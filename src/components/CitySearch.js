import { useState } from "react";

//create and export CitySearch child component
const CitySearch = () => {
  //create state variable, called "showSuggestions" with initial state "false".
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        //Use onFocus event handler of the <input /> element, so if the the input field gained/lost focus change the state of "showSuggestions"
        onFocus={() => setShowSuggestions(true)}
      />

      {/* 
      Use ternary operator: 
      - If "showSuggestions" is true, render a <ul> element with a suggestions list. 
      - Otherwise, render a null (show nothing/no suggestions).
      */}
      {showSuggestions ? <ul className="suggestions"></ul> : null}
    </div>
  );
};

export default CitySearch;
