const express = require('express');
require('dotenv').config();
const db = require("../db");
const marketTypesDetails = require('../constant/marketTypesData');
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
    published_date,
    is_enable
  } = req.body;
  const sql = `
    INSERT INTO blog_posts (
      title, category, sub_category, content, slug, seo_title, seo_description, keywords, 
      featured_image, author, published_date, updated_date, canonical_url, 
      og_title, og_description, og_url, twitter_title, twitter_description, tags, is_enable
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    title,
    JSON.stringify(category),
    JSON.stringify(sub_category),
    content,
    slug,
    seo_title,
    seo_description,
    keywords,
    featured_image,
    author,
    published_date,
    canonical_url,
    og_title,
    og_description,
    og_url,
    twitter_title,
    twitter_description,
    JSON.stringify(tags),
    is_enable
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.sqlMessage, details: err });
    } else {
      res.status(201).json({ message: "Blog post created!", id: result.insertId });
    }
  });
});

app.get("/get-blogs", (req, res) => {
  let { page = 1, limit = 10, category, subCategory, search, tag, is_enable = 1, get_all = false } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM blog_posts WHERE 1=1";
  let countQuery = "SELECT COUNT(*) as total FROM blog_posts WHERE 1=1";
  let queryParams = [];

  // 🔍 Add category filter (if provided)
  if (category) {
    query += " AND JSON_SEARCH(category, 'one', ?, NULL, '$[*].slug') IS NOT NULL";
    countQuery += " AND JSON_SEARCH(category, 'one', ?, NULL, '$[*].slug') IS NOT NULL";
    queryParams.push(category);
  }

  // 🔍 Add subCategory filter (if provided)
  if (subCategory) {
    query += " AND JSON_SEARCH(sub_category, 'one', ?, NULL, '$[*].slug') IS NOT NULL";
    countQuery += " AND JSON_SEARCH(sub_category, 'one', ?, NULL, '$[*].slug') IS NOT NULL";
    queryParams.push(subCategory);
  }

  if (tag) {
    query += " AND JSON_SEARCH(tags, 'one', ?, NULL, '$[*].slug') IS NOT NULL";
    countQuery += " AND JSON_SEARCH(tags, 'one', ?, NULL, '$[*].slug') IS NOT NULL";
    queryParams.push(tag);
  }

  // check only published blog
  if (is_enable && get_all == false) {
    query += " AND is_enable = ?";
    countQuery += " AND is_enable = ?";
    queryParams.push(is_enable);
  }

  // 🔎 Apply search across all columns
  if (search) {
    const searchQuery = `
      AND (
        title LIKE ? OR
        content LIKE ? OR
        slug LIKE ? OR
        seo_title LIKE ? OR
        seo_description LIKE ? OR
        keywords LIKE ? OR
        author LIKE ? OR
        tags LIKE ?
      )
    `;
    query += searchQuery;
    countQuery += searchQuery;

    const searchParam = `%${search}%`;
    queryParams.push(searchParam, searchParam, searchParam, searchParam, searchParam, searchParam, searchParam, searchParam);
  }

  // ✅ Apply pagination
  query += " LIMIT ? OFFSET ?";
  queryParams.push(limit, offset);
  // Execute count query first to get total records
  db.query(countQuery, queryParams.slice(0, queryParams.length - 2), (err, countResult) => {
    if (err) return res.status(500).json({ success: false, error: "Database error", details: err });

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Execute main query
    db.query(query, queryParams, (err, results) => {
      if (err) return res.status(500).json({ success: false, error: "Database error", details: err });

      res.json({
        success: true,
        results,
        pagination: {
          currentPage: page,
          limit,
          totalPages,
          totalRecords,
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
    published_date,
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
    is_enable
  } = req.body;

  const sql = `
    UPDATE blog_posts SET 
      title = ?, category = ?, sub_category = ?, content = ?, slug = ?, seo_title = ?, 
      seo_description = ?, keywords = ?, featured_image = ?, author = ?, updated_date = NOW(), 
      canonical_url = ?, og_title = ?, og_description = ?, og_url = ?, 
      twitter_title = ?, twitter_description = ?, tags = ?, published_date = ?, is_enable = ?
    WHERE id = ?`;

  const values = [
    title,
    JSON.stringify(category),
    JSON.stringify(sub_category),
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
    published_date,
    is_enable,
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

app.get("/get-blog", (req, res) => {
  const { slug } = req.query; // Get slug from query params

  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  const query = "SELECT * FROM blog_posts WHERE slug = ?";
  
  db.query(query, [slug], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const blogDetails = results[0];

    // Parse category and subcategory JSON fields
    let category = [];
    let subcategory = [];

    try {
      category = JSON.parse(blogDetails.category || "[]");
      subcategory = JSON.parse(blogDetails.sub_category || "[]");
    } catch (error) {
      return res.status(500).json({ error: "Invalid category/subcategory format" });
    }

    // Extract category and subcategory names
    const categoryNames = category.map(c => c.category_name);
    const subcategoryNames = subcategory.map(s => s.sub_category_name);

    // Fetch related posts (max 5) from the same subcategory
    const relatedQuery = `
      SELECT title, featured_image, slug, published_date  FROM blog_posts 
      WHERE JSON_SEARCH(sub_category, 'one', ?, NULL, '$[*].sub_category_name') IS NOT NULL
      AND slug != ?
      LIMIT 5
    `;

    db.query(relatedQuery, [subcategoryNames[0], slug], (err, relatedResults) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching related posts", details: err });
      }

      // Fetch next and previous posts within the same category using JSON_SEARCH
      const nextPrevQuery = `
        (SELECT * FROM blog_posts 
         WHERE JSON_SEARCH(category, 'one', ?, NULL, '$[*].category_name') IS NOT NULL 
         AND id < ? ORDER BY id DESC LIMIT 1)
        UNION
        (SELECT * FROM blog_posts 
         WHERE JSON_SEARCH(category, 'one', ?, NULL, '$[*].category_name') IS NOT NULL 
         AND id > ? ORDER BY id ASC LIMIT 1)
      `;

      db.query(nextPrevQuery, [categoryNames[0], blogDetails.id, categoryNames[0], blogDetails.id], (err, nextPrevResults) => {
        if (err) {
          return res.status(500).json({ error: "Error fetching next/previous posts", details: err });
        }

        // Sort results into next and previous posts
        let nextPost = null;
        let prevPost = null;

        if (nextPrevResults.length === 2) {
          prevPost = nextPrevResults[0]; // Older post
          nextPost = nextPrevResults[1]; // Newer post
        } else if (nextPrevResults.length === 1) {
          if (nextPrevResults[0].id < blogDetails.id) {
            prevPost = nextPrevResults[0];
          } else {
            nextPost = nextPrevResults[0];
          }
        }

        res.json({
          blogDetails,
          nextPost,
          prevPost,
          relatedPosts: relatedResults,
        });
      });
    });
  });
});

app.get("/search", (req, res) => {
  const { query = "", page = 1, limit = 10 } = req.query;

  // // Validate query
  // if (!query || query.trim() === "") {
  //   return res.status(400).json({ error: "Query parameter is required" });
  // }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const offset = (pageNum - 1) * limitNum;
  const searchTerm = `%${query}%`;

  // 1. Search blog_posts table
  const blogPostsSql = `
    SELECT title, featured_image, slug
    FROM blog_posts
    WHERE title LIKE ? OR content LIKE ?
    LIMIT ? OFFSET ?
  `;

  db.query(blogPostsSql, [searchTerm, searchTerm, limitNum, offset], (err, blogPosts) => {
    if (err) {
      console.error("Blog Posts Search Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Count total blog posts for pagination
    db.query(
      "SELECT COUNT(*) as count FROM blog_posts WHERE title LIKE ? OR content LIKE ?",
      [searchTerm, searchTerm],
      (err, totalBlogPosts) => {
        if (err) {
          console.error("Count Query Error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        const totalBlogPostsCount = totalBlogPosts[0].count;

        // Format blog post results
        const blogPostResults = blogPosts.map((post) => ({
          title: post.title,
          featured_image: post.featured_image,
          slug: post.slug
        }));

        // 2. Search marketTypesDetails
        const marketTypeResults = [];
        Object.values(marketTypesDetails).forEach((marketType) => {
          const matches = marketType.DropdownOptions.filter((option) => {
            // Convert the entire option object to a string and search
            const optionString = JSON.stringify(option).toLowerCase();
            return optionString.includes(query.toLowerCase());
          });
          matches.forEach((match) => {
            marketTypeResults.push({
              title: match?.name ? match?.name + " बाजार दर" : match.seoMeta?.seo_title,
              featured_image: match.seoMeta?.banner_img || "default-image.jpg", // TODO : add default image
              slug: match.slug,
              subType : match.subType,
              type : "bajarbhav"
            });
          });
        });

        // 3. Combine results
        const combinedResults = [...blogPostResults, ...marketTypeResults];

        // Apply pagination to combined results
        const paginatedResults = combinedResults.slice(offset, offset + limitNum);
        const totalItems = combinedResults.length;

        // Pagination metadata
        const totalPages = Math.ceil(totalItems / limitNum);

        // Response
        res.status(200).json({
          success: true,
          data: paginatedResults,
          pagination: {
            currentPage: pageNum,
            itemsPerPage: limitNum,
            totalItems,
            totalPages,
            totalBlogPosts: totalBlogPostsCount,
          },
        });
      }
    );
  });
});

module.exports = app;