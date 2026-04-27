import pool from "../config/pool.js";

// Controller to add a new product
export const addProduct = async (req, res) => {
  // Get a client (connection) from the pool
  const client = await pool.connect();

  try {
    // Extract data from request body
    const { title, price, quantity } = req.body;

    // Validate input (check if any field is missing)
    if (!title || !price || !quantity) {
      return res.status(400).json("All fields are required!");
    }

    // Start a transaction
    await client.query("BEGIN");

    // Insert product into database
    const Product = await client.query(
      `INSERT INTO products (title, price, quantity) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [title, price, quantity], // values for placeholders
    );

    // If everything is successful, save changes
    await client.query("COMMIT");

    // Send success response
    res.status(201).json({
      message: "Product added successfully",
      product: Product.rows,
    });
  } catch (err) {
    // If any error occurs, undo all changes
    await client.query("ROLLBACK");

    // Log error for debugging
    console.error("Add Product Error:", err);

    // Send error response
    res.status(500).json({ error: "Server error" });
  } finally {
    // Release client back to pool (VERY IMPORTANT)
    client.release();
  }
};

// Controller to get products
export const getProducts = async (req, res) => {
  try {
    const Products = await pool.query(
      `SELECT id, title, price, quantity, in_stock FROM products`,
    );

    // Send success response
    res.status(200).json({
      message: "Product fetched successfully",
      Product: Products.rows,
    });
  } catch (err) {
    // Log error for debugging
    console.error("Fetching Products Error:", err);

    // Send error response
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {

    if(id >= 1){

    const deleteProduct = await pool.query(
      `DELETE FROM products WHERE id = $1`,
      [id]
    );



    // Send success response
    res.status(200).json({
      message: "Product deleted successfully",
      deleteProduct
    });}
  } catch (err) {
    // Log error for debugging
    console.error("Deleting Product Error:", err);

    // Send error response
    res.status(500).json({ error: "Server error" });
  }
};
