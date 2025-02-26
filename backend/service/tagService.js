const express = require('express');
require('dotenv').config();
const db = require("../db");
const { isEmpty } = require('lodash');
const app = express();

app.post("/add-tags", (req, res) => {
  const { tag_name, tag_color, tag_img, slug } = req.body;
  const sql = "INSERT INTO tags (tag_name, tag_color, tag_img, slug) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [tag_name, tag_color, tag_img, slug], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Tag created", id: result.insertId });
  });
});

// 🔹 Read (Get all tags)
app.get("/get-tags", (req, res) => {
  const { tag_name } = req.query;
  let sql = "SELECT * FROM tags";
  let params = [];

  if (isEmpty(tag_name)) {
    return res.json([]); 
  }

  if (!isEmpty(tag_name)) {
    sql += " WHERE tag_name LIKE ?";
    params.push(`%${tag_name}%`); // Using LIKE for partial matching
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/get-all-tags", (req, res) => {
  let sql = "SELECT * FROM tags";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 🔹 Read (Get a tag by ID)
app.get("/get-tag/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM tags WHERE tag_id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json(result[0]);
  });
});

// 🔹 Update (Modify a tag)
app.put("/edit-tags/:id", (req, res) => {
  const { id } = req.params;
  const { tag_name, tag_color, tag_img, slug } = req.body;
  const sql = "UPDATE tags SET tag_name = ?, tag_color = ?, tag_img = ?, slug = ? WHERE tag_id = ?";
  
  db.query(sql, [tag_name, tag_color, tag_img, slug, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json({ message: "Tag updated successfully" });
  });
});

// 🔹 Delete (Remove a tag)
app.delete("/delete-tags/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM tags WHERE tag_id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.json({ message: "Tag deleted successfully" });
  });
});

module.exports = app;