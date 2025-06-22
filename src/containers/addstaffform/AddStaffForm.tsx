import { useState } from "react";
import {toast} from "react-toastify"
import axios from "axios";
import { FaPlus } from "react-icons/fa";

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

const AddStaffForm = () => {
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

  const handleAddStudentClick = () => {
    setAddFormVisible(true);
  };

  const validForm = () => {
    const { firstname, lastname, email, phone, address, username } = newStaff;
    return firstname && lastname && email && phone && address && username;
  };

  const addStaff = async () => {
    if (!validForm()) {
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
  return (
    <div>
      {addFormVisible && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          <div>
            <input
              type="text"
              placeholder="Firstname"
              value={newStaff.firstname}
              onChange={(e) =>
                setNewStaff({ ...newStaff, firstname: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Lastname"
              value={newStaff.lastname}
              onChange={(e) =>
                setNewStaff({ ...newStaff, lastname: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Username"
              value={newStaff.username}
              onChange={(e) =>
                setNewStaff({ ...newStaff, username: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone"
              value={newStaff.phone}
              onChange={(e) =>
                setNewStaff({ ...newStaff, phone: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Address"
              value={newStaff.address}
              onChange={(e) =>
                setNewStaff({ ...newStaff, address: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Email"
              value={newStaff.email}
              onChange={(e) =>
                setNewStaff({ ...newStaff, email: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Role ID"
              value={newStaff.role_id}
              onChange={(e) =>
                setNewStaff({ ...newStaff, role_id: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={newStaff.password}
              onChange={(e) =>
                setNewStaff({ ...newStaff, password: e.target.value })
              }
            />
          </div>

          <button
            onClick={addStaff}
            className="bg-green-500 text-white mt-3 w-[10%] p-2 rounded-md flex justify-center "
          >
            <FaPlus />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStaffForm;
