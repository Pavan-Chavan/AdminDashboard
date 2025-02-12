const express = require('express');
require('dotenv').config();
const db = require("../db");
const app = express();

// 🔹 Create (Insert a new category)
app.post("/add-sub-categories", (req, res) => {
  const { sub_category_name, parent_category_name, category_color, category_img } = req.body;
  const sql = "INSERT INTO sub_categories (sub_category_name, parent_category_name, category_color, category_img) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [sub_category_name, parent_category_name, category_color, category_img], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Category created", id: result.insertId });
  });
});

// 🔹 Read (Get all categories)
app.get("/get-sub-categories", (req, res) => {
  const sql = "SELECT * FROM sub_categories";
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 🔹 Read (Get a category by ID)
app.get("/get-sub-categories/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM sub_categories WHERE sub_category_id = ?";
  
  db.query(sql, [id], (err, result) => {
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
  const { sub_category_name, parent_category_name, category_color, category_img } = req.body;
  const sql = "UPDATE sub_categories SET sub_category_name = ?, parent_category_name = ?, category_color = ?, category_img = ? WHERE sub_category_id = ?";
  
  db.query(sql, [sub_category_name, parent_category_name, category_color, category_img, id], (err, result) => {
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