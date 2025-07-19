import { useState, useEffect } from "react";

import axios from "axios";
import DataTable from "react-data-table-component";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

type Payment = {
  bill_number?: number;
  payment_type: string;
  other_details: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

const Payment = () => {
  const [category, setCategory] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState<Payment>({
    payment_type: "",
    other_details: "",
  });
  const [addModal, setAddModal] = useState(false);
  // const [paymentType, setPaymentType] = useState("");
  // const [otherDetails, setOtherDetails] = useState("");

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/payment`);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const validForm = (Payment: Payment) => {
    const { payment_type, other_details } = Payment;
    return !!(payment_type && other_details);
  };

  const addPayment = async () => {
    if (!validForm(newPayment)) {
      toast.error("Please fill all required spaces.");
      return;
    }

    try {
      await axios.post(`${apiUrl}/payment/payment`, newPayment);
      setNewPayment({
        payment_type: "",
        other_details: "",
      });
      toast.success("Sucessfully added payment");
      getProducts();
    } catch (error) {
      // console.log(error);
      toast.error("Error adding payment. Please try again!");
    } finally {
      setAddModal(false);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Payment) => row.bill_number ?? 0,
      sortable: true,
      width: "80px",
    },
    {
      name: "Payment type",
      selector: (row: Payment) => row.payment_type,
      sortable: true,
      width: "160px",
    },
    {
      name: "Other details",
      selector: (row: Payment) => row.other_details,
      sortable: true,
      width: "160px",
    },
  ];

  return (
    <div className="w-full px-3">
      {/* add payment  */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-orange-700/30">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white p-5 rounded-md space-y-2"
          >
            <div
              onClick={() => setAddModal(false)}
              className="flex justify-end text-2xl mb-2 cursor-pointer"
            >
              <MdClose className=" transition-300 ease-in-out hover:scale-110 hover:text-orange-400" />
            </div>
            <div className="rounded-md grid grid-cols-1 md:grid-cols-2  gap-5">
              <input
                type="text"
                placeholder="Payment type"
                value={newPayment.payment_type}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, payment_type: e.target.value })
                }
                className="border border-orange-800 p-2 rounded-md "
                required
              />
              <input
                type="text"
                placeholder="other details"
                value={newPayment.other_details}
                onChange={(e) =>
                  setNewPayment({
                    ...newPayment,
                    other_details: e.target.value,
                  })
                }
                className="border border-orange-800 p-2 rounded-md "
                required
              />

              <button
                className="bg-orange-700 text-white px-3 py-2 flex justify-center  rounded-md w-[60%]"
                onClick={addPayment}
              >
                Add supplier
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <button
        onClick={() => setAddModal(true)}
        className="bg-orange-800 px-3 py-2 rounded-md text-white flex items-center gap-2"
      >
        Add Payment
      </button>
      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pt-5"
      >
        <DataTable
          title="Payment"
          columns={columns}
          data={category}
          pagination
          highlightOnHover
          striped
        />
      </motion.div>
    </div>
  );
};

export default Payment;
