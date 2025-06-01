const express = require('express');
require('dotenv').config();
const db = require('../../db');
const jwt = require('jsonwebtoken');
const { isEmpty } = require('lodash');
const app = express();

// 🔹 Middleware for JWT Authentication
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'अनधिकृत: कोई टोकन प्रदान नहीं किया गया' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId }; // Extract userId from token
        next();
    } catch (error) {
        return res.status(401).json({ error: 'अनधिकृत: अमान्य टोकन' });
    }
};

// 🔹 Create (Add a comment)
app.post('/blog_posts/:blogPostId/comments', auth, (req, res) => {
    const { blogPostId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (isEmpty(content)) {
        return res.status(400).json({ error: 'सामग्री आवश्यक है' });
    }

    const sql = 'INSERT INTO blog_comments (blog_post_id, user_id, content) VALUES (?, ?, ?)';
    db.query(sql, [blogPostId, userId, content], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'टिप्पणी बनाई गई', id: result.insertId });
    });
});

// 🔹 Create (Add a subcomment)
app.post('/comments/:commentId/subcomments', auth, (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (isEmpty(content)) {
        return res.status(400).json({ error: 'सामग्री आवश्यक है' });
    }

    const sql = 'INSERT INTO blog_subcomments (comment_id, user_id, content) VALUES (?, ?, ?)';
    db.query(sql, [commentId, userId, content], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'उप-टिप्पणी बनाई गई', id: result.insertId });
    });
});

// 🔹 Update (Edit a comment)
app.put('/comments/:commentId', auth, (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (isEmpty(content)) {
        return res.status(400).json({ error: 'सामग्री आवश्यक है' });
    }

    const sqlCheck = 'SELECT id FROM blog_comments WHERE id = ? AND user_id = ?';
    db.query(sqlCheck, [commentId, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'टिप्पणी नहीं मिली या अनधिकृत' });
        }

        const sqlUpdate = 'UPDATE blog_comments SET content = ?, updated_at = NOW() WHERE id = ?';
        db.query(sqlUpdate, [content, commentId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'टिप्पणी सफलतापूर्वक अपडेट की गई' });
        });
    });
});

// 🔹 Update (Edit a subcomment)
app.put('/subcomments/:subcommentId', auth, (req, res) => {
    const { subcommentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (isEmpty(content)) {
        return res.status(400).json({ error: 'सामग्री आवश्यक है' });
    }

    const sqlCheck = 'SELECT id FROM blog_subcomments WHERE id = ? AND user_id = ?';
    db.query(sqlCheck, [subcommentId, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'उप-टिप्पणी नहीं मिली या अनधिकृत' });
        }

        const sqlUpdate = 'UPDATE blog_subcomments SET content = ?, updated_at = NOW() WHERE id = ?';
        db.query(sqlUpdate, [content, subcommentId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'उप-टिप्पणी सफलतापूर्वक अपडेट की गई' });
        });
    });
});

// 🔹 Delete (Remove a comment)
app.delete('/comments/:commentId', auth, (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    const sqlCheck = 'SELECT id FROM blog_comments WHERE id = ? AND user_id = ?';
    db.query(sqlCheck, [commentId, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'टिप्पणी नहीं मिली या अनधिकृत' });
        }

        const sqlDelete = 'DELETE FROM blog_comments WHERE id = ?';
        db.query(sqlDelete, [commentId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'टिप्पणी सफलतापूर्वक हटाई गई' });
        });
    });
});

// 🔹 Delete (Remove a subcomment)
app.delete('/subcomments/:subcommentId', auth, (req, res) => {
    const { subcommentId } = req.params;
    const userId = req.user.id;

    const sqlCheck = 'SELECT id FROM blog_subcomments WHERE id = ? AND user_id = ?';
    db.query(sqlCheck, [subcommentId, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'उप-टिप्पणी नहीं मिली या अनधिकृत' });
        }

        const sqlDelete = 'DELETE FROM blog_subcomments WHERE id = ?';
        db.query(sqlDelete, [subcommentId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'उप-टिप्पणी सफलतापूर्वक हटाई गई' });
        });
    });
});

// 🔹 Create (Like/Unlike a comment)
app.post('/comments/:commentId/like', auth, (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    const sqlCheck = 'SELECT id FROM blog_comment_likes WHERE user_id = ? AND comment_id = ?';
    db.query(sqlCheck, [userId, commentId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length > 0) {
            const sqlDelete = 'DELETE FROM blog_comment_likes WHERE user_id = ? AND comment_id = ?';
            db.query(sqlDelete, [userId, commentId], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'टिप्पणी को अनलइक किया गया' });
            });
        } else {
            const sqlInsert = 'INSERT INTO blog_comment_likes (user_id, comment_id) VALUES (?, ?)';
            db.query(sqlInsert, [userId, commentId], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'टिप्पणी को लाइक किया गया' });
            });
        }
    });
});

// 🔹 Create (Like/Unlike a subcomment)
app.post('/subcomments/:subcommentId/like', auth, (req, res) => {
    const { subcommentId } = req.params;
    const userId = req.user.id;

    const sqlCheck = 'SELECT id FROM blog_comment_likes WHERE user_id = ? AND subcomment_id = ?';
    db.query(sqlCheck, [userId, subcommentId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length > 0) {
            const sqlDelete = 'DELETE FROM blog_comment_likes WHERE user_id = ? AND subcomment_id = ?';
            db.query(sqlDelete, [userId, subcommentId], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'उप-टिप्पणी को अनलइक किया गया' });
            });
        } else {
            const sqlInsert = 'INSERT INTO blog_comment_likes (user_id, subcomment_id) VALUES (?, ?)';
            db.query(sqlInsert, [userId, subcommentId], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'उप-टिप्पणी को लाइक किया गया' });
            });
        }
    });
});

// 🔹 Read (Get comments for a blog post)
// TODO : need to modify this endpoint to get current user create comment on top if not then get only most liked comments on top
app.get('/blog_posts/:blogPostId/comments', (req, res) => {
    const { blogPostId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user?.id; // Optional chaining to handle undefined req.user
    const offset = (page - 1) * limit;

    const sqlComments = `
        SELECT 
            c.id, c.content, c.user_id, u.name AS user_name, u.photo AS user_photo, 
            c.created_at, c.updated_at,
            COUNT(cl.id) AS like_count,
            EXISTS (
                SELECT 1 FROM blog_comment_likes 
                WHERE comment_id = c.id AND user_id = ?
            ) AS liked_by_user,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', s.id,
                        'content', s.content,
                        'user_id', s.user_id,
                        'user_name', su.name,
                        'user_photo', su.photo,
                        'created_at', s.created_at,
                        'updated_at', s.updated_at,
                        'like_count', (
                            SELECT COUNT(*) FROM blog_comment_likes 
                            WHERE subcomment_id = s.id
                        ),
                        'liked_by_user', (
                            SELECT EXISTS (
                                SELECT 1 FROM blog_comment_likes 
                                WHERE subcomment_id = s.id AND user_id = ?
                            )
                        )
                    )
                )
                FROM blog_subcomments s 
                LEFT JOIN users su ON s.user_id = su.id
                WHERE s.comment_id = c.id
            ) AS subcomments,
            (c.user_id = ?) AS is_current_user
        FROM blog_comments c
        LEFT JOIN blog_comment_likes cl ON c.id = cl.comment_id
        LEFT JOIN users u ON c.user_id = u.id
        WHERE c.blog_post_id = ?
        GROUP BY c.id
        ORDER BY 
            (c.user_id = COALESCE(?, 0)) DESC,
            like_count DESC,
            c.created_at DESC
        LIMIT ? OFFSET ?
    `;

    const sqlCount = 'SELECT COUNT(*) AS total FROM blog_comments WHERE blog_post_id = ?';

    // Prepare query parameters based on whether userId exists
    const queryParams = userId 
        ? [userId, userId, userId, blogPostId, userId, parseInt(limit), parseInt(offset)]
        : [null, null, null, blogPostId, null, parseInt(limit), parseInt(offset)];

    db.query(sqlComments, queryParams, (err, comments) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.query(sqlCount, [blogPostId], (err, countResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const formattedComments = comments.map(c => ({
                id: c.id,
                content: c.content,
                user_id: c.user_id,
                user_name: c.user_name,
                user_photo: c.user_photo,
                created_at: c.created_at,
                updated_at: c.updated_at,
                like_count: c.like_count,
                liked_by_user: Boolean(c.liked_by_user),
                subcomments: c.subcomments ? JSON.parse(c.subcomments) : []
            }));

            res.json({
                message: 'टिप्पणियाँ सफलतापूर्वक प्राप्त की गईं',
                data: formattedComments,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: countResult[0].total
                }
            });
        });
    });
});

app.get('/user/comments', (req, res) => {
    const { page = 1, limit = 10, userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'उपयोगकर्ता आईडी आवश्यक है' });
    }

    const offset = (page - 1) * limit;

    const sqlComments = `
        SELECT 
            'comment' AS type,
            c.id,
            c.content,
            c.user_id,
            u.name AS user_name,
            u.photo AS user_photo,
            c.created_at,
            c.updated_at,
            bp.id AS blog_post_id,
            bp.title AS blog_post_title,
            bp.slug AS blog_post_slug,
            COUNT(cl.id) AS like_count,
            EXISTS (
                SELECT 1 FROM blog_comment_likes 
                WHERE comment_id = c.id AND user_id = ?
            ) AS liked_by_user,
            NULL AS parent_comment_id
        FROM blog_comments c
        LEFT JOIN blog_comment_likes cl ON c.id = cl.comment_id
        LEFT JOIN users u ON c.user_id = u.id
        LEFT JOIN blog_posts bp ON c.blog_post_id = bp.id
        WHERE c.user_id = ?
        GROUP BY c.id, c.content, c.user_id, u.name, u.photo, c.created_at, c.updated_at, bp.id, bp.title, bp.slug
        
        UNION ALL
        
        SELECT 
            'subcomment' AS type,
            s.id,
            s.content,
            s.user_id,
            u.name AS user_name,
            u.photo AS user_photo,
            s.created_at,
            s.updated_at,
            bp.id AS blog_post_id,
            bp.title AS blog_post_title,
            bp.slug AS blog_post_slug,
            COUNT(cl.id) AS like_count,
            EXISTS (
                SELECT 1 FROM blog_comment_likes 
                WHERE subcomment_id = s.id AND user_id = ?
            ) AS liked_by_user,
            s.comment_id AS parent_comment_id
        FROM blog_subcomments s
        LEFT JOIN blog_comment_likes cl ON s.id = cl.subcomment_id
        LEFT JOIN users u ON s.user_id = u.id
        LEFT JOIN blog_comments c ON s.comment_id = c.id
        LEFT JOIN blog_posts bp ON c.blog_post_id = bp.id
        WHERE s.user_id = ?
        GROUP BY s.id, s.content, s.user_id, u.name, u.photo, s.created_at, s.updated_at, bp.id, bp.title, bp.slug, s.comment_id
        
        ORDER BY created_at ASC
        LIMIT ? OFFSET ?
    `;

    const sqlCount = `
        SELECT (
            (SELECT COUNT(*) FROM blog_comments WHERE user_id = ?) +
            (SELECT COUNT(*) FROM blog_comments WHERE user_id = ?)
        ) AS total
    `;

    db.query(sqlComments, [userId, userId, userId, userId, parseInt(limit), parseInt(offset)], (err, comments) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.query(sqlCount, [userId, userId], (err, countResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const formattedComments = comments.map(c => ({
                type: c.type,
                id: c.id,
                content: c.content,
                user_id: c.user_id,
                user_name: c.user_name,
                user_photo: c.user_photo,
                created_at: c.created_at,
                updated_at: c.updated_at,
                blog_post_id: c.blog_post_id,
                blog_post_title: c.blog_post_title,
                blog_post_slug: c.blog_post_slug,
                like_count: c.like_count,
                liked_by_user: Boolean(c.liked_by_user),
                parent_comment_id: c.parent_comment_id
            }));

            res.json({
                message: 'आपकी टिप्पणियाँ सफलतापूर्वक प्राप्त की गईं',
                data: formattedComments,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: countResult[0].total
                }
            });
        });
    });
});


app.get('/admin/comments', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const sqlComments = `
        SELECT 
            'comment' AS type,
            c.id,
            c.content AS comment,
            c.user_id,
            u.name AS user_name,
            bp.title AS blog_name,
            bp.slug AS blog_slug,
            c.created_at AS time,
            NULL AS parent_comment_id
        FROM blog_comments c
        LEFT JOIN users u ON c.user_id = u.id
        LEFT JOIN blog_posts bp ON c.blog_post_id = bp.id
        
        UNION ALL
        
        SELECT 
            'subcomment' AS type,
            s.id,
            s.content AS comment,
            s.user_id,
            u.name AS user_name,
            bp.title AS blog_name,
            bp.slug AS blog_slug,
            s.created_at AS time,
            s.comment_id AS parent_comment_id
        FROM blog_subcomments s
        LEFT JOIN users u ON s.user_id = u.id
        LEFT JOIN blog_comments c ON s.comment_id = c.id
        LEFT JOIN blog_posts bp ON c.blog_post_id = bp.id
        
        ORDER BY time DESC
        LIMIT ? OFFSET ?
    `;

    const sqlCount = `
        SELECT (
            (SELECT COUNT(*) FROM blog_comments) +
            (SELECT COUNT(*) FROM blog_subcomments)
        ) AS total
    `;

    db.query(sqlComments, [parseInt(limit), parseInt(offset)], (err, comments) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.query(sqlCount, (err, countResult) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const total = countResult[0].total;
            const totalPages = Math.ceil(total / parseInt(limit));

            const formattedComments = comments.map(c => ({
                type: c.type,
                id: c.id,
                comment: c.comment,
                user_id: c.user_id,
                user_name: c.user_name,
                blog_name: c.blog_name,
                blog_slug: c.blog_slug,
                time: c.time,
                parent_comment_id: c.parent_comment_id
            }));

            res.json({
                message: 'सभी टिप्पणियाँ सफलतापूर्वक प्राप्त की गईं',
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalRecords: total,
                    limit: parseInt(limit)
                },
                results: formattedComments
            });
        });
    });
});

app.delete('/delete-blog-comment/:type/:id', (req, res) => {
    const { type, id } = req.params;

    // Validate type
    if (!['comment', 'subcomment'].includes(type)) {
        return res.status(400).json({ error: 'अमान्य प्रकार: प्रकार "comment" या "subcomment" होना चाहिए' });
    }

    // Determine table and query based on type
    const table = type === 'comment' ? 'blog_comments' : 'blog_subcomments';
    const sqlDelete = `DELETE FROM ${table} WHERE id = ?`;

    db.query(sqlDelete, [parseInt(id)], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: type === 'comment' ? 'टिप्पणी नहीं मिली' : 'उप-टिप्पणी नहीं मिली' });
        }

        res.json({ message: type === 'comment' ? 'टिप्पणी सफलतापूर्वक हटाई गई' : 'उप-टिप्पणी सफलतापूर्वक हटाई गई' });
    });
});

module.exports = app;