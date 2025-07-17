import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

type Product = {
  id: number;
  name: string;
  price: string;
  unit: number;
  status: boolean;
  other_details: string;
  description: string;
};

type category = {
  id: number;
  name: string;
};

type supplier = {
  id: number;
  name: string;
};

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [addForm, setAddForm] = useState(false);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [otherDetails, setotherDetails] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  // const [quantity, setQuantity] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [supplier, setSupplier] = useState<supplier[]>([]);
  const [category, setCategory] = useState<category[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product`);
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/category`);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSuppliers = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/supplier/`);
      setSupplier(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSuppliers();
    getCategory();
  }, []);

  const handleAdd = async () => {
    const payload = {
      name: name,
      description: description,
      unit: unit,
      price: price,
      status: status,
      other_details: otherDetails,
      supplier_id: selectedSupplier,
      category_id: selectedCategory,
    };

    if(!name || !description || !unit || !price || !status || !otherDetails||!selectedSupplier||!selectedCategory){
      toast.error("Please fill all required spaces")
      return
    }
    try {
      await axios.post(`${apiUrl}/product/product`, payload);
      toast.success("product successfully added");
      setAddForm(false);
      getProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  useEffect(() => {
    getProducts();
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
      selector: (row: Product) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Product) => row.price,
    },
    {
      name: "Quantity",
      selector: (row: Product) => row.unit,
    },
    { name: "Decription", selector: (row: Product) => row.description },
    {
      name: "Other Details",
      selector: (row: Product) => row.other_details,
    },
    {
      name: "Status",
      selector: (row: Product) => (row.status ? "In stock" : "out of stock"),
    },
  ];

  return (
    <div className="w-full px-10">
      {addForm && (
        <div className="fixed inset-0 z-50 bg-orange-600/45 flex justify-center items-center">
          <div className=" bg-white   p-4 w-[80%] mx-auto rounded-md shadow-md">
            <div
              onClick={() => setAddForm(false)}
              className="flex justify-end text-2xl mb-2 cursor-pointer"
            >
              <MdClose className=" transition-300 ease-in-out hover:scale-110 hover:text-orange-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3  gap-5 ">
              <input
                type="text"
                placeholder="Product name"
                className="border p-2 rounded-md border-orange-700"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Price"
                className="border p-2 rounded-md border-orange-700"
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Other details"
                className="border p-2 rounded-md border-orange-700"
                value={otherDetails}
                onChange={(e: any) => setotherDetails(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Description"
                className="border p-2 rounded-md border-orange-700"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Unit"
                className="border p-2 rounded-md border-orange-700"
                value={unit}
                onChange={(e: any) => setUnit(e.target.value)}
                required
              />

              <select
                value={status ? "true" : "false"}
                onChange={(e) => setStatus(e.target.value === "true")}
                className="border border-orange-700 p-2 rounded-md"
              >
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
              </select>

              {/* supplier selection */}
              <div className="flex flex-col">
                <label>Supplier</label>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="border border-orange-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">--- Select Supplier---</option>
                  {supplier.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">--- Select Category---</option>
                  {category.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAdd}
                className=" bg-orange-800 text-white px-3 py-2 rounded-md"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="text-end bg-orange-800 text-white px-3 py-2 rounded-md "
        onClick={() => setAddForm(true)}
      >
        New product
      </button>
      <div className="pt-5">
        <DataTable
          title="Products"
          columns={columns}
          data={products}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default Product;
