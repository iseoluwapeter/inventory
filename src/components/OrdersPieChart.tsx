import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

type Order = {
  id: number;
  date_of_order: string;
  customer: {
    firstname: string;
    lastname: string;
    email: string;
  };
};

const OrdersPieChart = () => {
  const [chartData, setChartData] = useState<any[][]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/order/`);
      transformDataForChart(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const transformDataForChart = (data: Order[]) => {
    const customerOrderCount: Record<string, number> = {};

    data.forEach((order) => {
      const name = `${order.customer.firstname} ${order.customer.lastname}`;
      customerOrderCount[name] = (customerOrderCount[name] || 0) + 1;
    });

    const chartRows = Object.entries(customerOrderCount);
    const result = [["Customer", "Orders"], ...chartRows];
    setChartData(result);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="mt-4 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-orange-800 mb-2">
        Orders Per Customer
      </h2>

      {chartData.length > 1 ? (
        <Chart
          chartType="PieChart"
          width="100%"
          height="300px"
          data={chartData}
          options={{
            title: "",
            chartArea: { width: "90%", height: "80%" },
            legend: { position: "right", textStyle: { fontSize: 12 } },
            colors: ["#1e40af"],
          }}
        />
      ) : (
        <p className="text-sm text-gray-600">Loading chart...</p>
      )}
    </div>
  );
};

export default OrdersPieChart;
