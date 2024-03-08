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

  //add chart
  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        style={{ margin: "0 auto" }}
      >
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis
          type="number"
          dataKey="count"
          name="Number of events"
          allowDecimals={false}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
