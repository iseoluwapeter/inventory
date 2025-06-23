import { useEffect, useState } from "react";
import axios from "axios";
import OrderForm from "./OrderForm";
import DataTable from "react-data-table-component";

type Customer = {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  staff_id: number;
  address: string;
};

type Order = {
  id: number;
  customer_id: number;
  product: string,
  quantity: number;
  unit_price: number;
  total: number;
  order_date: string;
  customer: Customer;
  payment: string
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchText, setSearchText] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;


  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/order_details`);

      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const columns = [
    {
      name: "Order ID",
      selector: (row: Order) => row.id,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row: Order) => new Date(row.order_date).toLocaleString(),
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row: Order) =>
        `${row.customer.firstname} ${row.customer.lastname}`,
      sortable: true,
    },
    {
      name: "Product ordered",
      selector: (row: Order) => row.product,
    },
    {
      name: "Unit price",
      selector: (row: Order) => row.unit_price,
    },
    {
      name: "Quantity",
      selector: (row: Order) => row.quantity,
    },
    {
      name: "Total",
      selector: (row: Order) => row.total,
    },
    // {
    //   name: "Payment",
    //   selector: (row: Order) => row.payment,
    // },
  ];

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    const fullName =
      `${order.customer.firstname} ${order.customer.lastname}`.toLowerCase();
    // const email = order.customer.email.toLowerCase();
    // const phone = order.customer.phone;
    const search = searchText.toLowerCase();

    return (
      fullName.includes(search) 
      // email.includes(search) ||
      // phone.includes(search)
    );
  });

  return (
    <>
      <OrderForm />

      <div className="mt-5 rounded-xl shadow-md bg-white p-4">
        <div className="mb-4 flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold text-orange-800">
            Customer Orders
          </h2>
          <input
            type="text"
            placeholder="Search "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 "
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredOrders}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="No orders found"
        />
      </div>
    </>
  );
};

export default Orders;
