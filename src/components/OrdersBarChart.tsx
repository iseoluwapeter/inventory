// CustomerHistogramChart.tsx
import { Chart } from "react-google-charts";
import axios from "axios";
import { useEffect, useState } from "react";

// type Customer = {
//   firstname: string;
//   lastname: string;
//   phone: string;
//   staff_id: number;
//   id: number;
//   address: string;
//   email: string;
// };

const COLORS = [
  "#1e3a8a", // blue-900
  "#9333ea", // purple-600
  "#10b981", // green-500
  "#f59e0b", // yellow-500
  "#ef4444", // red-500
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#f43f5e", // rose-500
  "#0ea5e9", // sky-500
  "#a855f7", // violet-500
];

const OrderBarChart = () => {
  const [chartData, setChartData] = useState<any[][]>([]);

  const fetchCustomerData = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/orders-by-customers"
      );

      const formatted = [
        ["Customer", "Orders", { role: "style" }],
        ...data.map((entry: any, index: number) => {
          const name = entry.customer_name;
          const orderCount = entry.order_count;
          const color = COLORS[index % COLORS.length];
          return [name, orderCount, color];
        }),
      ];

      setChartData(formatted);
    } catch (err) {
      console.error("Error fetching orders per customer:", err);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <h2 className="text-xl font-semibold text-orange-800 mb-3">
        Orders per Customer (Bar Chart)
      </h2>

      {chartData.length > 1 ? (
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            title: "Number of Orders by Customer",
            chartArea: { width: "70%" },
            hAxis: {
              title: "Number of Orders",
              minValue: 0,
            },
            vAxis: {
              title: "Customer",
            },
            legend: { position: "none" },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};


export default OrderBarChart;
