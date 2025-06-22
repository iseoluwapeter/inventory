import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPlusCircle, FaMinusCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";

type suppliers = {
  id?: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  other_details?: string;
};

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<suppliers[]>([]);
  const [newSupplier, setNewSupplier] = useState<suppliers>({
    name: "",
    address: "",
    email: "",
    phone: "",
    other_details: "",
  });
  const [editingSupplierId, seteditingSupplierId] = useState<number | null>(
    null
  );
  const [editingSupplier, setEditingSupplier] = useState<suppliers>({
    name: "",
    address: "",
    email: "",
    phone: "",
    other_details: "",
  });
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteFormVisible, setDeleteFormVisible] = useState(false);
  const [deletingSupplierId, setDeleteingSupplierId] = useState<number | null>(
    null
  );

  const handleDeleteClick = (supplier: suppliers) => {
    setDeleteingSupplierId(Number(supplier.id));
    setDeleteFormVisible(true);
  };

  const confirmDeletingSupplier = async () => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/supplier/supplier/${deletingSupplierId}`
      );
      setDeleteFormVisible(false);
      setDeleteingSupplierId(null);
      toast.success("Supplier succesfully deleted");
      getSuppliers();
      console.log(res);
    } catch (error) {
      toast.error("Error deleting supplier");
      console.log(error);
      setDeleteFormVisible(false);
      setDeleteingSupplierId(null);
    }
  };

  const handleEditClick = (supplier: suppliers) => {
    seteditingSupplierId(Number(supplier.id));
    setEditModal(true);
    setEditingSupplier({ ...supplier });
  };

  const saveEditSupplier = async () => {
    if (!validForm(editingSupplier)) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      await axios.put(
        `http://127.0.0.1:8000/supplier/supplier/${editingSupplierId}`,
        editingSupplier
      );
      toast.success("Supplier successfully updated!");
      seteditingSupplierId(null);
      getSuppliers();
      setEditModal(false);
    } catch (error) {
      toast.error("Failed to update supplier");
      console.error("Update error:", error);
    }
  };

  const getSuppliers = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/supplier/");
      setSuppliers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const validForm = (supplier: suppliers) => {
    const { name, address, email, phone } = supplier;
    return !!(name && address && email && phone); // ensures all are truthy
  };
  
  

  const addSuppliers = async () => {
    if (!validForm(newSupplier)) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/supplier/supplier", newSupplier);
      setNewSupplier({
        name: "",
        address: "",
        email: "",
        phone: "",
        other_details: "",
      });
      getSuppliers();
      setAddModal(false);
      toast.success("Supplier successfully added!");
    } catch (error) {
      console.log("Error trying to post", error);
    }
  };

  const columns = [
    {
      name: "S/N",
      selector: (row: suppliers) => row.id ?? 0,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: suppliers) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: suppliers) => row.email,
    },
    {
      name: "Address",
      selector: (row: suppliers) => row.address,
    },
    {
      name: "Phone",
      selector: (row: suppliers) => row.phone,
    },
    {
  name: "Actions",
  cell: (row: suppliers) => (
    <div className="flex gap-2">
      <FaEdit
        className="text-orange-500 cursor-pointer"
        onClick={() => handleEditClick(row)}
      />
      <FaMinusCircle
        className="text-red-500 cursor-pointer"
        onClick={() => handleDeleteClick(row)}
      />
    </div>
  ),
}

  ];

  return (
    <div className="px-10">
      {addModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-orange-700/30">
          <div className="bg-white p-5 rounded-md space-y-2">
            <h2>Add new supplier</h2>
            <div className="rounded-md grid grid-cols-1 md:grid-cols-2  gap-5">
              <input
                type="text"
                placeholder="Name"
                value={newSupplier.name}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, name: e.target.value })
                }
                className="border border-orange-800 p-2 rounded-md "
              />
              <input
                type="text"
                placeholder="Address"
                value={newSupplier.address}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, address: e.target.value })
                }
                className="border border-orange-800 p-2 rounded-md "
              />
              <input
                type="text"
                placeholder="Email"
                value={newSupplier.email}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, email: e.target.value })
                }
                className="border border-orange-800 p-2 rounded-md "
              />
              <input
                type="text"
                placeholder="Phone"
                value={newSupplier.phone}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, phone: e.target.value })
                }
                className="border border-orange-800 p-2 rounded-md "
              />
              <input
                type="text"
                placeholder="Other Details"
                value={newSupplier.other_details}
                onChange={(e) =>
                  setNewSupplier({
                    ...newSupplier,
                    other_details: e.target.value,
                  })
                }
                className="border border-orange-800 p-2 rounded-md "
              />

              <button
                className="bg-orange-700 text-white px-3 py-2 flex justify-center  rounded-md w-[60%]"
                onClick={addSuppliers}
              >
                Add supplier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* add supplier button */}

      <button
        onClick={() => setAddModal(true)}
        className="bg-orange-700 px-3 py-1 rounded-md text-white flex items-center gap-2"
      >
        Add Supplier <FaPlusCircle />
      </button>

      {deleteFormVisible && (
        <div className="fixed inset-0 z-50  bg-orange-700/30 flex justify-center items-center ">
          <div className="my-3 p-4 bg-red-100 border border-red-300 rounded">
            <p className="text-red-700 mb-2">
              Are you sure you want to delete this staff?
            </p>
            <button
              onClick={confirmDeletingSupplier}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 mx-auto"
            >
              <MdDelete /> Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* EDITING SUPPLIER MODAL */}
      {editModal && (
        <div className="fixed inset-0 bg-orange-700/20  bg-opacity-50 flex items-center justify-center z-50 p-5">
          <div className="bg-white grid grid-cols-1 md:grid-cols-2 p-6 md:p-8 rounded-lg shadow-lg max-w-lg gap-5 w-full text-center">
            {["name", "address", "email", "phone", "other_details"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={editingSupplier[field as keyof suppliers]}
                  onChange={(e) =>
                    setEditingSupplier({
                      ...editingSupplier,
                      [field]: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                />
              )
            )}
            <button
              onClick={saveEditSupplier}
              className="bg-orange-500 text-white mt-3 p-2 rounded flex justify-center"
            >
              Save changes <FaEdit />
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Suppliers List</h2>
        <DataTable
          columns={columns}
          data={suppliers}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  );
};

export default Suppliers;
