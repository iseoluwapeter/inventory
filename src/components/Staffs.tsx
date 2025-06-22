import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMinusCircle, FaPlus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";

type staffs = {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  username: string;
  role_id: string;
  password: string;
};

const Staffs = () => {
  const [allStaffs, setAllStaffs] = useState<staffs[]>([]);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [newStaff, setNewStaff] = useState<staffs>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    role_id: "",
    password: "",
  });

  const [editingStaffId, setEditingStaffId] = useState<number | null>(null);
  const [editingStaffForm, setEditingStaffForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<staffs>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    role_id: "",
    password: "",
  });

  const [deletingStaffId, setDeletingStaffId] = useState<number | null>(null);
  const [deleteForm, setDeleteForm] = useState(false);

  const deleteStaffClick = (staff: staffs) => {
    setDeletingStaffId(Number(staff.id));
    setDeleteForm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/staff/staff/${deletingStaffId}`
      );
      toast.success("Staff successfully deleted");
      setDeleteForm(false);
      getStaffs();
    } catch (error) {
      console.log("deleting staff error", error);
      toast.error("Failed to delete staff");
      setDeleteForm(false);
    }
  };

  const handleEditStaff = (staff: staffs) => {
    setEditingStaffId(Number(staff.id));
    setEditingStaffForm(true);
    setEditingStaff({ ...staff });
  };

  const validForm = (staff: staffs) => {
    const { firstname, lastname, email, phone, address, username } = staff;
    return firstname && lastname && email && phone && address && username;
  };

  const editStaff = async () => {
    if (!validForm(editingStaff)) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/staff/staff/${editingStaffId}`,
        editingStaff
      );
      toast.success("Updated staff successfully");
      getStaffs();
      setEditingStaffForm(false);
    } catch (error) {
      toast.error("Error updating staff");
      console.log("Error updating staff", error);
    }
  };

  const handleAddStudentClick = () => {
    setAddFormVisible(true);
  };



  const addStaff = async () => {
    if (!validForm(newStaff)) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/staff/staff", newStaff);
      setNewStaff({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        username: "",
        role_id: "",
        password: "",
      });
      toast.success("Staff successfully added");
      getStaffs();
      setAddFormVisible(false);
    } catch (error) {
      console.log("Error creating staff", error);
      toast.error("Error creating staff");
      setAddFormVisible(false);
    }
  };

  const getStaffs = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/staff/");
      setAllStaffs(data);
    } catch (error) {
      console.log("Fetching staff error:", error);
      toast.error("Error fetching staff");
    }
  };

  useEffect(() => {
    getStaffs();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row: staffs) => row.id ?? 0, // assuming id is number | undefined
      width: "60px",
      sortable: true,
    },
    {
      name: "Firstname",
      selector: (row: staffs) => row.firstname ?? "",
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row: staffs) => row.lastname ?? "",
      sortable: true,
    },
    {
      name: "Username",
      selector: (row: staffs) => row.username ?? "",
    },
    {
      name: "Email",
      selector: (row: staffs) => row.email ?? "",
    },
    {
      name: "Address",
      selector: (row: staffs) => row.address ?? "",
    },
    {
      name: "Phone",
      selector: (row: staffs) => row.phone ?? "",
    },
    {
      name: "Actions",
      cell: (row: staffs) => (
        <div className="flex gap-2">
          <FaEdit
            className="text-orange-500 cursor-pointer"
            onClick={() => handleEditStaff(row)}
          />
          <FaMinusCircle
            className="text-red-500 cursor-pointer"
            onClick={() => deleteStaffClick(row)}
          />
        </div>
      ),
    },
  ];
  

  return (
    <div className="px-10 py-5 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Staff List</h1>

      {/* Add staff form */}
      {addFormVisible && (
        <div className="fixed inset-0 bg-orange-700/30 flex justify-center items-center z-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 bg-white shadow-lg p-5 rounded-md">
            {[
              "firstname",
              "lastname",
              "username",
              "phone",
              "address",
              "email",
              "role_id",
              "password",
            ].map((field) => (
              <input
                key={field}
                type={field === "password" ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newStaff[field as keyof staffs]}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, [field]: e.target.value })
                }
                className="border p-2 rounded outline-amber-500 focus:outline-orange-400"
              />
            ))}
            <button
              onClick={addStaff}
              className="bg-orange-500 text-white mt-3 p-2 rounded flex justify-center w-50"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      )}

      {/* Edit staff form */}
      {editingStaffForm && (
        <div className="fixed inset-0 bg-orange-700/20  bg-opacity-50 flex items-center justify-center z-50 p-5">
          <div className="bg-white grid grid-cols-1 md:grid-cols-2 p-6 md:p-8 rounded-lg shadow-lg max-w-lg gap-5 w-full text-center">
            {[
              "firstname",
              "lastname",
              "username",
              "phone",
              "address",
              "email",
              "role_id",
            ].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={editingStaff[field as keyof staffs]}
                onChange={(e) =>
                  setEditingStaff({ ...editingStaff, [field]: e.target.value })
                }
                className="border p-2 rounded"
              />
            ))}
            <button
              onClick={editStaff}
              className="bg-orange-500 text-white mt-3 p-2 rounded flex justify-center"
            >
              Save changes <FaEdit />
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteForm && (
        <div className="fixed inset-0 z-50  bg-orange-700/30 flex justify-center items-center ">
          <div className="my-3 p-4 bg-red-100 border border-red-300 rounded">
            <p className="text-red-700 mb-2">
              Are you sure you want to delete this staff?
            </p>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <MdDelete /> Confirm Delete
            </button>
          </div>
        </div>
      )}

      {/* DataTable rendering */}
      <DataTable
        columns={columns}
        data={allStaffs}
        pagination
        highlightOnHover
        striped
        responsive
      />

      {/* Add button */}
      <h2
        className="bg-orange-700 p-2 rounded-md mt-7 text-white w-fit text-center cursor-pointer transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
        onClick={handleAddStudentClick}
      >
        Add Staff
      </h2>
    </div>
  );
};

export default Staffs;
