const express = require('express');
require('dotenv').config();
const db = require("../db");
const app = express();

// 🔹 Create (Insert a new category)
app.post("/add-sub-categories", (req, res) => {
  const {
    sub_category_name,
    parent_category_name,
    category_color,
    category_img,
    slug,
    seo_title,
    seo_description,
    keywords,
    og_url,
    canonical_url,
    featured_image,
    author,
    published_date,
    updated_date,
  } = req.body;

  const sql = `
    INSERT INTO sub_categories (
      sub_category_name, parent_category_name, category_color, category_img, slug,
      seo_title, seo_description, keywords, og_url, canonical_url, featured_image,
      author, published_date, updated_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    sub_category_name,
    parent_category_name,
    category_color,
    category_img,
    slug,
    seo_title,
    seo_description,
    keywords,
    og_url,
    canonical_url,
    featured_image,
    author,
    published_date,
    updated_date,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Subcategory created", id: result.insertId });
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

app.get("/get-all-sub-categories", (req, res) => {
  
  const sql = `SELECT * FROM sub_categories`;

  db.query(sql, (err, results) => {
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
  const {
    sub_category_name,
    parent_category_name,
    category_color,
    category_img,
    slug,
    seo_title,
    seo_description,
    keywords,
    og_url,
    canonical_url,
    featured_image,
    author,
    published_date,
    updated_date,
  } = req.body;

  const sql = `
    UPDATE sub_categories 
    SET 
      sub_category_name = ?, 
      parent_category_name = ?, 
      category_color = ?, 
      category_img = ?, 
      slug = ?, 
      seo_title = ?, 
      seo_description = ?, 
      keywords = ?, 
      og_url = ?, 
      canonical_url = ?, 
      featured_image = ?, 
      author = ?, 
      published_date = ?, 
      updated_date = ?
    WHERE sub_category_id = ?
  `;

  const values = [
    sub_category_name,
    parent_category_name,
    category_color,
    category_img,
    slug,
    seo_title,
    seo_description,
    keywords,
    og_url,
    canonical_url,
    featured_image,
    author,
    published_date,
    updated_date,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.json({ message: "Subcategory updated successfully" });
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