import { useState, useEffect } from "react";

import axios from "axios";
import DataTable from "react-data-table-component";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

type Category = {
  id: number;
  name: string;
  description: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

const Category = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [categoryName, setcategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [addModal, setAddModal] = useState(false);

  const getCategory = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/category");
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleAdd = async () => {
    const payload = {
      name: categoryName,
      description: categoryDescription,
    };
    if(!categoryName || !categoryDescription){
      toast.error("Please fill all necessary fields")
      return
    }

    try {
      await axios.post(`${apiUrl}/category/category`, payload);
      toast.success("Category succesfully added!");
      getCategory();
    } catch (error) {
      console.log(error);
      toast.error("Error adding new category");
    } finally {
      setAddModal(false);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Category) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row: Category) => row.name,
      sortable: true,
      width: "80px",
    },
    {
      name: "Description",
      selector: (row: Category) => row.description,
      sortable: true,
      width: "200px",
    },
  ];

  return (
    <div className="w-full px-10">
      {/* add Modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 bg-orange-600/45 flex justify-center items-center">
          <div className=" bg-white   p-4 w-[80%] mx-auto rounded-md shadow-md ">
            <div
              onClick={() => setAddModal(false)}
              className="flex justify-end text-2xl mb-2 cursor-pointer"
            >
              <MdClose className=" transition-300 ease-in-out hover:scale-110 hover:text-orange-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3  gap-5">
              <input
                type="text"
                placeholder="Category Name"
                className="border p-2 rounded-md border-orange-700"
                value={categoryName}
                onChange={(e: any) => setcategoryName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Description"
                className="border p-2 rounded-md border-orange-700"
                value={categoryDescription}
                onChange={(e: any) => setCategoryDescription(e.target.value)}
                required
              />

              <button
                onClick={handleAdd}
                className="bg-orange-800 text-white rounded-md "
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setAddModal(true)}
        className=" bg-orange-800 text-white px-3 py-2 rounded-md  "
      >
        Add New Category
      </button>

      {/* Table */}
      <div className="pt-10">
        <DataTable
          title="Category"
          columns={columns}
          data={category}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default Category;
