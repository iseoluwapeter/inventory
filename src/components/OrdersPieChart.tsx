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
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<any[][]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/order/`);
      setOrders(data);
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

    // Create data for Google Charts
    const chartRows = Object.entries(customerOrderCount);
    const result = [["Customer", "Orders"], ...chartRows];
    setChartData(result);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-orange-800">
        Orders Per Customer
      </h2>

      {chartData.length > 1 ? (
        <Chart
          chartType="PieChart"
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
            colors: ["#1e40af"], // Tailwind blue-800
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default OrdersPieChart;
