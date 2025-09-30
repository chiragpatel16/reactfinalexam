import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProduct,
  deleteProduct,
  editProduct,
} from "../../Slices/productSlice";
import "./Home.css";

export default function Home() {
  const { product, isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [editMain, setEditMain] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    category: "",
    price: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // Delete product
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // edit product
  const handleEditClick = (item) => {
    setEditData({
      title: item.title,
      category: item.category,
      price: item.price,
    });
    setEditId(item.id);
    setEditMain(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...editData,
      id: editId,
      price: Number(editData.price),
    };

    dispatch(editProduct(updatedProduct));

    // Reset edit states
    setEditMain(false);
    setEditId(null);
    setEditData({ title: "", category: "", price: "" });
  };

  // Filter and sort products
  const filteredProducts = product
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return Number(a.price) - Number(b.price);
      if (sortOrder === "desc") return Number(b.price) - Number(a.price);
      return 0;
    });

  return (
    <div>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search by title or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6">No products found.</td>
              </tr>
            ) : (
              filteredProducts.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {editMain && editId === item.id ? (
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                      />
                    ) : (
                      item.title
                    )}
                  </td>
                  <td>
                    {editMain && editId === item.id ? (
                      <input
                        type="text"
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                      />
                    ) : (
                      item.category
                    )}
                  </td>
                  <td>
                    {editMain && editId === item.id ? (
                      <input
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleEditChange}
                      />
                    ) : (
                      `₹${item.price}`
                    )}
                  </td>
                  <td>
                    {editMain && editId === item.id ? (
                      <button onClick={handleEditSubmit}>Save</button>
                    ) : (
                      <button
                        className="edit"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
