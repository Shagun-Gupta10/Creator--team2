import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const revenueSources = [
  { name: "Ad Revenue", value: 42 },
  { name: "Sponsorship", value: 22 },
  { name: "Affiliate", value: 12 },
  { name: "Subscription", value: 10 },
  { name: "Brand Deals", value: 8 },
  { name: "Merchandise", value: 6 },
];

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#12343B",
          border: "1px solid #2B5A62",
          borderRadius: "10px",
          padding: "12px",
        }}
      >
        <p
          style={{
            color: "#FFFFFF",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          {label}
        </p>

        <p
          style={{
            color: "#FFFFFF",
            fontWeight: "600",
          }}
        >
          Revenue: {payload[0].value}%
        </p>

      </div>
    );
  }

  return null;
};
const RevenueSourceChart = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow">

      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold">
            Revenue Sources
          </h2>

          <p className="text-gray-500 text-sm">
            Income distribution by source
          </p>
        </div>
      </div>


      <ResponsiveContainer width="100%" height={320}>
        <PieChart>

          <Pie
            data={revenueSources}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          >

            {revenueSources.map((item, index) => (
              <Cell
                key={item.name}
                fill={COLORS[index]}
              />
            ))}

          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
  wrapperStyle={{
    color: "#FFFFFF",
  }}
  formatter={(value) => (
    <span
      style={{
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: "14px",
      }}
    >
      {value}
    </span>
  )}
/>


        </PieChart>
      </ResponsiveContainer>


      <div className="mt-4 space-y-2">

        {revenueSources.map((item) => (
          <div
            key={item.name}
            className="flex justify-between"
          >

            <span
  className="text-sm"
  style={{
    color: "#FFFFFF",
    fontWeight: 600,
  }}
>
  {item.name}
</span>


           <span
  style={{
    color: "#FFFFFF",
    fontWeight: 700,
  }}
>
  {item.value}%
</span>

          </div>
        ))}

      </div>


    </div>
  );
};

export default RevenueSourceChart;