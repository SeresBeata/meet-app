//import from react
import { useState, useEffect } from "react";

//import components from recharts
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";

//create and export EventGenresChart child component
const EventGenresChart = ({ events }) => {
  //create state variable, called "data" with initial state empty array
  const [data, setData] = useState([]);
  //create array for “genres” (or event topics) that occur in the events
  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
  //create array for colors of the pie chart
  const colors = ["#008000", "#00cc00", "#4dff4d", "#99ff99", "#e6ffe6"];

  //use useEffect with callback and call getData()
  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  //create getData() function, that returns how many events there are for each genre
  const getData = () => {
    //use .map()to loop over the genres array
    const data = genres.map((genre) => {
      //use filter() to get a list of events that include the current genre
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      //return an object that has two keys
      //— a name key referring to the current genre in the .map() loop, and
      //— a value that will refer to the filteredEvents array length.
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    return data;
  };

  //create customized labels
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <>
        <text
          x={x}
          y={y}
          fill={colors[index % colors.length]}
          className="chart-label1"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={x}
          y={y}
          className="chart-label2"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="70%"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
