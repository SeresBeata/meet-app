//import mock data
import mockData from "./mock-data";

//create "extractLocations" function to extract event locations out of an array of events and remove duplicates.
export const extractLocations = (events) => {
  //Use map() to create a new array with only locations.
  const extractedLocations = events.map((event) => event.location);
  //Remove all duplicates by creating another new array using the spread operator and spreading a Set.
  const locations = [...new Set(extractedLocations)];
  return locations;
};

//create "getEvents" function to return the mockData representing the list of all events.
export const getEvents = async () => {
  return mockData;
};
