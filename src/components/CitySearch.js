import { useState, useEffect } from "react";

//create and export CitySearch child component
const CitySearch = ({ allLocations }) => {
  //create state variable, called "showSuggestions" with initial state "false".
  const [showSuggestions, setShowSuggestions] = useState(false);
  //create state variable, called "query" with initial state empty string
  const [query, setQuery] = useState("");
  //creata state variable, called "suggestions" with initial state empty array
  const [suggestions, setSuggestions] = useState([]);

  //use the stringified value of the allLocation prop as a dependency in useEffect
  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  //Create "handleInputChanged" function, to be used as the callback function of "onChange"
  const handleInputChanged = (event) => {
    //obtain the current value of the input field
    const value = event.target.value;
    //filter the "allLocations" array based on the value of the input field
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    //set the "query" state to the input value
    setQuery(value);
    //set the "suggestions" state to the filtered locations array
    setSuggestions(filteredLocations);
  };

  //create "handleItemClicked" function to use in the "onClick" event handler of the "suggestion" list item (<li>)
  const handleItemClicked = (event) => {
    //obtain the textContent of the clicked <li>
    const value = event.target.textContent;
    //set the "query" state to the textContent of the clicked <li>
    setQuery(value);
    // hide the list
    setShowSuggestions(false);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        //Use onFocus event handler of the <input /> element, so if the the input field gained/lost focus change the state of "showSuggestions"
        onFocus={() => setShowSuggestions(true)}
        //use the query state as the value of the input field
        value={query}
        //set "handleInputChanged" function as the callback function of "onChange" on the <input /> element
        onChange={handleInputChanged}
      />

      {/* 
      Use ternary operator: 
      - If "showSuggestions" is true, render a <ul> element with a suggestions list. 
      - Otherwise, render a null (show nothing/no suggestions).
      */}
      {showSuggestions ? (
        <ul className="suggestions">
          {/*return items from the list of "suggestions" and use "suggestion" as a key to distinguish each item.  */}
          {suggestions.map((suggestion) => {
            return (
              <li onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          {/* Add "See all cities" list item at the end, after returning list items of suggestions. */}
          <li key="See all cities">
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
