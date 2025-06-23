import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { useStaff } from "../context/StaffContext";

type Product = {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  address: string;
};

const Customers = () => {
  const [customers, setCustomers] = useState<Product[]>([]);
  const [addForm, setAddForm] = useState(false);
  const [lastname, setLastname] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const apiUrl = import.meta.env.VITE_API_URL;


  const { staff } = useStaff();

  const getCustomers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/customer`);
      setCustomers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    if (!staff?.id) {
      toast.error("Staff ID is missing. Please login again.");
      return;
    }

    const payload = {
      lastname: lastname,
      firstname: firstname,
      email: email,
      phone: phone,
      address: address,
      staff_id: staff.id,
    };
    try {
      await axios.post(`${apiUrl}/customer/customer`, payload);
      toast.success("Customer successfully added");
      setAddForm(false);
      getCustomers();
    } catch (error) {
      toast.error("Failed to add customer");
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row: Product) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row: Product) => row.firstname + " " + row.lastname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Product) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row: Product) => row.phone,
    },
    { name: "Address", selector: (row: Product) => row.address },
  ];

  return (
    <div className="w-full px-10">
      {addForm && (
        <div className="fixed inset-0 z-50 bg-orange-600/45 flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-white   gap-5 p-4 w-[80%] mx-auto rounded-md shadow-md ">
            <input
              type="text"
              placeholder="Firstname"
              className="border p-2 rounded-md border-orange-700"
              value={firstname}
              onChange={(e: any) => setFirstname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Lastname"
              className="border p-2 rounded-md border-orange-700"
              value={lastname}
              onChange={(e: any) => setLastname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              className="border p-2 rounded-md border-orange-700"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border p-2 rounded-md border-orange-700"
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Address"
              className="border p-2 rounded-md border-orange-700"
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              required
            />

            <button
              onClick={handleAdd}
              className=" bg-orange-800 text-white px-3 py-2 rounded-md"
            >
              Add Customer
            </button>
          </div>
        </div>
      )}

      <button
        className="text-end bg-orange-800 text-white px-3 py-2 rounded-md "
        onClick={() => setAddForm(true)}
      >
        New customer
      </button>
      <div className="pt-5">
        <DataTable
          title="Customers"
          columns={columns}
          data={customers}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default Customers;
