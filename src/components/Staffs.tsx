import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMinusCircle, FaEdit } from "react-icons/fa";
import { MdClose, MdDelete } from "react-icons/md";
import DataTable from "react-data-table-component";
import { motion } from "framer-motion";

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

type Role = {
  id: string | number;
  name: string;
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
  const [roles, setRoles] = useState<Role[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const deleteStaffClick = (staff: staffs) => {
    setDeletingStaffId(Number(staff.id));
    setDeleteForm(true);
  };

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/role/`);
      setRoles(data);
    } catch (error) {
      toast.error("Failed to fetch roles");
      console.log("Error fetching roles", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/${deletingStaffId}`);
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
      await axios.put(`${apiUrl}/staff/staff/${editingStaffId}`, editingStaff);
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
      await axios.post(`${apiUrl}/staff/staff`, newStaff);
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
      const { data } = await axios.get(`${apiUrl}/staff/`);
      setAllStaffs(data);
    } catch (error) {
      // console.log("Fetching staff error:", error);
      toast.error("Error fetching staff");
    }
  };

  useEffect(() => {
    getStaffs();
    fetchRoles();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row: staffs) => row.id ?? 0,
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
    <div className="px-5 py-5 bg-white rounded-md shadow-md">
      <h2
        className="bg-orange-700 p-2 rounded-md my-4 text-white w-fit text-center cursor-pointer transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-105"
        onClick={handleAddStudentClick}
      >
        Add Staff
      </h2>
      {/* <h1 className="text-xl mb-4">Staff List</h1> */}

      {/* Add staff form */}
      {addFormVisible && (
        <div className="fixed inset-0 bg-orange-700/30 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className=" bg-white shadow-lg p-5 rounded-md w-[80%]"
          >
            <div
              onClick={() => setAddFormVisible(false)}
              className="flex justify-end text-2xl mb-2 cursor-pointer"
            >
              <MdClose className=" transition-300 ease-in-out hover:scale-110 hover:text-orange-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 ">
              {[
                "firstname",
                "lastname",
                "username",
                "phone",
                "address",
                "email",
                "role_id",
                "password",
              ].map((field) =>
                field === "role_id" ? (
                  <select
                    key={field}
                    value={newStaff.role_id}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, role_id: e.target.value })
                    }
                    className="border p-2 rounded outline-amber-500 focus:outline-orange-400"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                ) : (
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
                )
              )}
              <button
                onClick={addStaff}
                className="bg-orange-500 text-white mt-3 p-2 rounded flex justify-center w-50"
              >
                Add staff
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit staff form */}
      {editingStaffForm && (
        <div className="fixed inset-0 bg-orange-700/20 bg-opacity-50 flex items-center justify-center z-50 p-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-lg shadow-lg max-w-lg p-6 md:p-8  w-[80%] "
          >
            <div
              onClick={() => setEditingStaffForm(false)}
              className="flex justify-end text-2xl cursor-pointer mb-4"
            >
              <MdClose className=" transition-300 ease-in-out hover:scale-110 hover:text-orange-400" />
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2   gap-5 w-full text-center">
              {[
                "firstname",
                "lastname",
                "username",
                "phone",
                "address",
                "email",
                "role_id",
              ].map((field) =>
                field === "role_id" ? (
                  <select
                    key={field}
                    value={editingStaff.role_id}
                    onChange={(e) =>
                      setEditingStaff({
                        ...editingStaff,
                        role_id: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={editingStaff[field as keyof staffs]}
                    onChange={(e) =>
                      setEditingStaff({
                        ...editingStaff,
                        [field]: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  />
                )
              )}
              <button
                onClick={editStaff}
                className="bg-orange-500 text-white mt-3 p-2 rounded flex justify-center col-span-1 md:col-span-2"
              >
                Save changes <FaEdit className="ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteForm && (
        <div className="fixed inset-0 z-50 bg-orange-700/30 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="my-3 p-4 bg-red-100 border border-red-300 rounded"
          >
            <p className="text-red-700 mb-2">
              Are you sure you want to delete this staff?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2"
              >
                <MdDelete /> Yes
              </button>
              <button
                onClick={() => setDeleteForm(false)}
                className="bg-green-500 text-white px-3 py-1 rounded flex items-center "
              >
                No
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add button */}

      {/* DataTable */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <DataTable
          title="Staff"
          columns={columns}
          data={allStaffs}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </motion.div>
    </div>
  );
};

export default Staffs;
