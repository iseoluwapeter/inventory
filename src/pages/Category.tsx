import { useState, useEffect } from "react";

import axios from "axios";
import DataTable from "react-data-table-component";

type Category = {
  id: number;
  name: string;
};

const Category = () => {
  const [category, setCategory] = useState<Category[]>([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/category");
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
  ];

  return (
    <div className="w-full px-10">
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
