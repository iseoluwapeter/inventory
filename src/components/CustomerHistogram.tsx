import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

type Customer = {
  firstname: string;
  lastname: string;
  phone: string;
  staff_id: number;
  id: number;
  address: string;
  email: string;
};

const CustomerHistogram = () => {
  const [chartData, setChartData] = useState<any[][]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/customer/`);
      transformChartData(data);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  const transformChartData = (data: Customer[]) => {
    const rows = data.map((customer) => [customer.staff_id]);
    const histogramData = [["Staff ID"], ...rows];
    setChartData(histogramData);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-orange-800 ">
        Customer Distribution by Staff ID
      </h2>
      {chartData.length > 1 ? (
        <Chart
          chartType="Histogram"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            // title: "Histogram of Customers by Staff ID",
            legend: { position: "none" },
            colors: ["#1d4ed8"],
            hAxis: {
              title: "Staff ID",
            },
            vAxis: {
              title: "Number of Customers",
            },
          }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default CustomerHistogram;
