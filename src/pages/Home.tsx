import CustomerHistogram from "../components/CustomerHistogram";
// import OrdersBarChart from "../components/OrdersBarChart";
import OrdersPieChart from "../components/OrdersPieChart";

const Home = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-full grid grid-cols-2 gap-5">
          {/* <OrdersBarChart /> */}
          <OrdersPieChart />
          <CustomerHistogram/>
        </div>
      </div>
    </div>
  );
};

export default Home;
