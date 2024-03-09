//import components from recharts
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

//create and export EventGenresChart child component
const EventGenresChart = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label
          outerRadius={130}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
