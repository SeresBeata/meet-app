//import from react
import { useState, useEffect } from "react";

//import components from recharts
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//create and export CityEventsChart child component
const CityEventsChart = ({ allLocations, events }) => {
  //create state variable, called "data" with initial state empty array
  const [data, setData] = useState([]);

  //use useEffect with callback and call getData()
  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  //create getData() function
  const getData = () => {
    //use map() on the allLocations array
    const data = allLocations.map((location) => {
      //filter the events by each location to get the length of the resulting array
      //use that length value as the event count for the location
      const count = events.filter(
        (event) => event.location === location
      ).length;
      //use split() for the name of the city, without the country
      const city = location.split(", ")[0];
      //return the city name of a location and the event counts of a location
      return { city, count };
    });
    return data;
  };
};

export default CityEventsChart;