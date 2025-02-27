const express = require('express');
require('dotenv').config();
const db = require("../db");
const app = express();

// CREATE: Add a new category
app.post('/create-categories', (req, res) => {
  const {
    category_name,
    category_color_class,
    slug,
    description,
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

  const query = `
    INSERT INTO categories (
      category_name, category_color_class, slug, description,
      seo_title, seo_description, keywords, og_url, canonical_url,
      featured_image, author, published_date, updated_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    category_name,
    category_color_class,
    slug,
    description,
    seo_title,
    seo_description,
    keywords,
    og_url,
    canonical_url,
    featured_image,
    author,
    published_date || null, // Convert empty string to NULL
    updated_date || null,   // Convert empty string to NULL
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting category:', err);
      return res.status(500).json({ success: false, message: 'Error creating category', error: err.message });
    }
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category_id: result.insertId,
    });
  });
});

// READ: Get all categories
app.get('/get-categories', (req, res) => {
    const query = `
        SELECT c.*, 
               (SELECT COUNT(*) 
                FROM blog_posts b 
                WHERE JSON_SEARCH(b.category, 'one', c.slug) IS NOT NULL) AS category_count
        FROM categories c`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ message: 'Error fetching categories' });
        }
        res.status(200).json({ success: true, results });
    });
});


// READ: Get a category by ID
app.get('/get-categories/:slug', (req, res) => {
	const { slug } = req.params;

	const query = "SELECT * FROM categories WHERE slug = ?";
	db.query(query, [slug], (err, result) => {
			if (err) {
					console.error('Error fetching category:', err);
					return res.status(500).json({ message: 'Error fetching category' });
			}
			if (!result.length) {
				return res.status(200).json([]);
			}
			res.status(200).json(result[0]);
	});
});

// UPDATE: Update a category by ID
app.put('/update-categories/:category_id', (req, res) => {
	const { category_id } = req.params;
	const {
	  category_name,
	  category_color_class,
	  slug,
	  description,
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
  
	const query = `
	  UPDATE categories 
	  SET 
		category_name = ?, 
		category_color_class = ?, 
		slug = ?, 
		description = ?, 
		seo_title = ?, 
		seo_description = ?, 
		keywords = ?, 
		og_url = ?, 
		canonical_url = ?, 
		featured_image = ?, 
		author = ?, 
		published_date = ?, 
		updated_date = ?
	  WHERE category_id = ?
	`;
  
	const values = [
	  category_name,
	  category_color_class,
	  slug,
	  description,
	  seo_title,
	  seo_description,
	  keywords,
	  og_url,
	  canonical_url,
	  featured_image,
	  author,
	  published_date || null, // Convert empty string to NULL
	  updated_date || null,   // Convert empty string to NULL
	  category_id,
	];
  
	db.query(query, values, (err, result) => {
	  if (err) {
		console.error('Error updating category:', err);
		return res.status(500).json({ success: false, message: 'Error updating category', error: err.message });
	  }
	  if (result.affectedRows === 0) {
		return res.status(404).json({ success: false, message: 'Category not found' });
	  }
	  res.status(200).json({ success: true, message: 'Category updated successfully' });
	});
});

// DELETE: Delete a category by ID
app.delete('/delete-categories/:category_id', (req, res) => {
	const { category_id } = req.params;

	const query = 'DELETE FROM categories WHERE category_id = ?';
	db.query(query, [category_id], (err, result) => {
			if (err) {
					console.error('Error deleting category:', err);
					return res.status(500).json({ message: 'Error deleting category' });
			}
			if (result.affectedRows === 0) {
					return res.status(404).json({ message: 'Category not found' });
			}
			res.status(200).json({ success : true, message: 'Category deleted successfully', success : true });
	});
});


module.exports = app;