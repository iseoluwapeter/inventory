import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { HiMenu, HiOutlineLogout } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PiPersonSimpleCircleFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { storeLogo } from "../assets";

const sideMenu = [
  { id: 1, icon: <RxDashboard size={20} />, title: "Dashboard", path: "/" },
  {
    id: 2,
    icon: <MdCategory size={20} />,
    title: "Category",
    path: "/category",
  },
  {
    id: 3,
    icon: <FaProductHunt size={20} />,
    title: "Products",
    path: "/products",
  },
  {
    id: 4,
    icon: <PiPersonSimpleCircleFill size={20} />,
    title: "Customers",
    path: "/customers",
  },
  {
    id: 5,
    icon: <FiShoppingCart size={20} />,
    title: "Orders",
    path: "/order",
  },
  {
    id: 6,
    icon: <MdOutlinePayments size={20} />,
    title: "Payment",
    path: "/payment",
  },
  {
    id: 7,
    icon: <IoPersonSharp size={20} />,
    title: "Suppliers",
    path: "/suppliers",
  },
  {
    id: 8,
    icon: <IoMdSettings size={20} />,
    title: "Staff",
    path: "/staffs",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    localStorage.removeItem("staff");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden p-4 bg-orange-900 text-white flex justify-between items-center">
        <div className="flex items-center">
          <img src={storeLogo} alt="store_log" width="50" />
          <h1 className="text-lg font-bold">Lead City Superstore</h1>
        </div>
        <button onClick={toggleSidebar}>
          {isOpen ? <IoMdClose size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar panel */}
      <aside
        className={`bg-orange-900 text-white  w-64 p-6 fixed md:relative z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center mb-7">
          <img src={storeLogo} alt="store_log" className="w-[70px]" />
          <p className="font-semibold text-xl">Lead City Superstore</p>
        </div>

        <ul className="space-y-6 text-base md:text-md">
          {sideMenu.map((menu) => (
            <li key={menu.id}>
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-2 py-2 rounded transition-all ${
                    isActive
                      ? "bg-white text-orange-800"
                      : "hover:text-orange-300"
                  }`
                }
                onClick={() => setIsOpen(false)} // auto-close on mobile
              >
                {menu.icon}
                <span>{menu.title}</span>
              </NavLink>
            </li>
          ))}

          {/* Logout */}
          <li>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-4 px-2 py-2 rounded hover:text-orange-00 transition-all w-full"
            >
              <HiOutlineLogout size={20} />
              <span>Logout</span>
            </motion.button>
          </li>
        </ul>
      </aside>

      {/* Logout Modal */}

      {showModal && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50" />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-sm"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Are you sure you want to logout?
              </h2>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={handleLogout}
                  className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
