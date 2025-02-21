const express = require('express');
require('dotenv').config();
const db = require("../db");
const app = express();

// 🔹 Create (Insert a new category)
app.post("/add-sub-categories", (req, res) => {
  const { sub_category_name, parent_category_name, category_color, category_img, slug } = req.body;
  const sql = "INSERT INTO sub_categories (sub_category_name, parent_category_name, category_color, category_img, slug) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sql, [sub_category_name, parent_category_name, category_color, category_img, slug], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Category created", id: result.insertId });
  });
});

app.get("/get-sub-categories", (req, res) => {
  const categoriesString = req.headers.categories; // Extract categories from headers

  if (!categoriesString) {
    return res.status(400).json({ error: "Missing categories parameter" });
  }

  const categories = categoriesString.split(",").map(category => category.trim()); // Convert to array

  const placeholders = categories.map(() => "?").join(", "); // Generate SQL placeholders
  const sql = `SELECT * FROM sub_categories WHERE parent_category_name IN (${placeholders})`;

  db.query(sql, categories, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});



// 🔹 Read (Get a category by ID)
app.get("/get-sub-category/:slug", (req, res) => {
  const { slug } = req.params;
  const sql = "SELECT * FROM sub_categories WHERE slug = ?";
  
  db.query(sql, [slug], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(result[0]);
  });
});

// 🔹 Update (Modify a category)
app.put("/edit-sub-categories/:id", (req, res) => {
  const { id } = req.params;
  const { sub_category_name, parent_category_name, category_color, category_img, slug } = req.body;
  const sql = "UPDATE sub_categories SET sub_category_name = ?, parent_category_name = ?, category_color = ?, category_img = ?, slug = ? WHERE sub_category_id = ?";
  
  db.query(sql, [sub_category_name, parent_category_name, category_color, category_img, slug, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category updated successfully" });
  });
});

// 🔹 Delete (Remove a category)
app.delete("/delete-sub-categories/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM sub_categories WHERE sub_category_id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  });
});

module.exports = app;