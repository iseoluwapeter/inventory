import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type customers = {
  id: number;
  firstname: string;
  email: string;
};

type products = {
  id: number;
  name: string;
  price: number;
};

const OrderForm = () => {
  const [customers, setCustomers] = useState<customers[]>([]);
  const [products, setProducts] = useState<products[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("");


  const apiUrl = import.meta.env.VITE_API_URL;

  const getCustomer = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/customer/`);
      setCustomers(data);
    } catch (error) {
      console.log("Error fetching customers:", error);
      toast.error("Customer fetch failed");
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product`);
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products", error);
      toast.error("Product fetch failed");
    }
  };

  useEffect(() => {
    getCustomer();
    getProduct();
  }, []);

  useEffect(()=>{
    setUnitPrice(products.find(product => product.id === Number(selectedProduct))?.price.toString() || "")
  },[selectedProduct,products])

  const placeOrder = async () => {
    if (
      !selectedCustomer ||
      !selectedProduct ||
      !quantity ||
      !unitPrice 
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const orderRes = await axios.post(`${apiUrl}/order/order`, {
        customer_id: parseInt(selectedCustomer),
      });

      const orderId = orderRes.data.order_id;

      await axios.post(`${apiUrl}/order_details/order/order`, {
        order_id: orderId,
        product_id: parseInt(selectedProduct),
        unit_price: parseFloat(unitPrice),
        quantity: parseInt(quantity),

        discount: 0,
      });

      toast.success("Order placed successfully!");
      setSelectedCustomer("");
      setSelectedProduct("");
      setQuantity("1");
      setUnitPrice("");

      
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 border border-orange-100">
      <h2 className="text-2xl font-bold text-orange-800">🛒 Place New Order</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Selection */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Customer
          </label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">-- Select Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.firstname}
              </option>
            ))}
          </select>
        </div>

        {/* Product Selection */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Unit Price */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Unit Price
          </label>
          <input
            type="number"
            value={unitPrice}
            readOnly
            onChange={(e) => setUnitPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <button
        onClick={placeOrder}
        className="w-full bg-orange-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition-all duration-300"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderForm;
