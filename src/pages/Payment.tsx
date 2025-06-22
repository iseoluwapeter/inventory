import { useState, useEffect } from "react";

import axios from "axios";
import DataTable from "react-data-table-component";

type Payment = {
  bill_number: number;
  payment_type: string;
  other_details: string;
};

const Payment = () => {
  const [category, setCategory] = useState<Payment[]>([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/payment/");
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row: Payment) => row.bill_number,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row: Payment) => row.payment_type,
      sortable: true,
      width: "160px",
    },
    {
      name: "Name",
      selector: (row: Payment) => row.other_details,
      sortable: true,
      width: "80px",
    },
  ];

  return (
    <div className="w-full px-10">
      {/* Table */}
      <div className="pt-10">
        <DataTable
          title="Payment"
          columns={columns}
          data={category}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default Payment;
