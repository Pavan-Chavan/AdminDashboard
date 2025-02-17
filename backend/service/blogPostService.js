const express = require('express');
require('dotenv').config();
const db = require("../db");
const app = express();

app.post("/create-blog", (req, res) => {
  const {
    title,
    category,
    sub_category,
    content,
    slug,
    seo_title,
    seo_description,
    keywords,
    featured_image,
    author,
    canonical_url,
    og_title,
    og_description,
    og_url,
    twitter_title,
    twitter_description,
    tags,
  } = req.body;

  const sql = `
    INSERT INTO blog_posts (
      title, category, sub_category, content, slug, seo_title, seo_description, keywords, 
      featured_image, author, published_date, updated_date, canonical_url, 
      og_title, og_description, og_url, twitter_title, twitter_description, tags
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    title,
    category,
    sub_category,
    content,
    slug,
    seo_title,
    seo_description,
    keywords,
    featured_image,
    author,
    canonical_url,
    og_title,
    og_description,
    og_url,
    twitter_title,
    twitter_description,
    JSON.stringify(tags),
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.sqlMessage, details: err });
    } else {
      res.status(201).json({ message: "Blog post created!", id: result.insertId });
    }
  });
});

app.get("/get-blog", (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  
  let sql = "SELECT * FROM blog_posts";
  let countSql = "SELECT COUNT(*) AS total FROM blog_posts";
  let params = [];

  // Apply search filter if search is provided
  if (search) {
    sql += " WHERE title LIKE ?";
    countSql += " WHERE title LIKE ?";
    params.push(`%${search}%`);
  }

  // Apply pagination
  sql += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  // Execute count query first
  db.query(countSql, params.slice(0, -2), (err, countResult) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Database error", details: err });
    }

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Execute data query

    db.query(sql, params, (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Database error", details: err });
      }

      res.json({
        success: true,
        results, // Blog post data
        pagination: {
          currentPage: parseInt(page, 10),
          limit: parseInt(limit, 10),
          totalPages,
        },
      });
    });
  });
});


// 🔵 READ a single blog post by ID
app.get("/create-blog/:id", (req, res) => {
  const sql = "SELECT * FROM blog_posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error", details: err });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Blog post not found" });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

app.post("/update-blog/:id", (req, res) => {
  const {
    title,
    category,
    sub_category,
    content,
    slug,
    seo_title,
    seo_description,
    keywords,
    featured_image,
    author,
    canonical_url,
    og_title,
    og_description,
    og_url,
    twitter_title,
    twitter_description,
    tags,
  } = req.body;

  const sql = `
    UPDATE blog_posts SET 
      title = ?, category = ?, sub_category = ?, content = ?, slug = ?, seo_title = ?, 
      seo_description = ?, keywords = ?, featured_image = ?, author = ?, updated_date = NOW(), 
      canonical_url = ?, og_title = ?, og_description = ?, og_url = ?, 
      twitter_title = ?, twitter_description = ?, tags = ?
    WHERE id = ?`;

  const values = [
    title,
    category,
    sub_category,
    content,
    slug,
    seo_title,
    seo_description,
    keywords,
    featured_image,
    author,
    canonical_url,
    og_title,
    og_description,
    og_url,
    twitter_title,
    twitter_description,
    JSON.stringify(tags),
    req.params.id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Database error", details: err });
    } else {
      res.status(201).json({ message: "Blog post updated!" });
    }
  });
});

app.delete("/delete-blog/:id", (req, res) => {
  const sql = "DELETE FROM blog_posts WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Database error", details: err });
    } else {
      res.status(200).json({ message: "Blog post deleted!" });
    }
  });
});

module.exports = app;