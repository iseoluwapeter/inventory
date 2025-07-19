import CustomerHistogram from "../components/CustomerHistogram";
// import OrdersBarChart from "../components/OrdersBarChart";
import OrdersPieChart from "../components/OrdersPieChart";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* <OrdersBarChart /> */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <OrdersPieChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <CustomerHistogram />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
