import pool from "../config/pool.js";

// Add Product
export const addProduct = async (req, res) => {
  const { title, price, quantity } = req.body;
  try {

    // Validate input
    if (!title || !price || !quantity) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const result = await pool.query(
      `INSERT INTO products (title, price, quantity) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [title, price, quantity]
    );

    res.status(201).json({
      message: "Product added successfully",
      product: result.rows[0],
    });

  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// Get All Products
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, price, quantity, in_stock FROM products`
    );

    res.status(200).json({
      message: "Products fetched successfully",
      products: result.rows,
    });

  } catch (err) {
    console.error("Fetching Products Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const result = await pool.query(
      `DELETE FROM products WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (err) {
    console.error("Deleting Product Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price, quantity, in_stock } = req.body;
  
  try {
     // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }
    // Validate input
    if (!title || !price || !quantity || !in_stock) {
      return res.status(400).json({ message: "All fields are required!" });
    }

  } catch (err) {
    console.error("Updating Product Error:", err);
    res.status(500).json({error: "Server error"});
  }
}