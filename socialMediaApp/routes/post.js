const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const posts = await Post.find()
        .populate('user', 'username') // post creator
        .populate('comments.user', 'username') // comment user
        .sort({ createdAt: -1 });

    res.json(posts);
});

// ✅ Get all posts (ADD HERE)
router.get('/', auth, async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

// Create Post
router.post('/', auth, async (req, res) => {
    const post = new Post({
        user: req.user.id,
        content: req.body.content
    });

    await post.save();
    res.json(post);
});

// Like Post
router.put('/like/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.user.id)) {
        post.likes.push(req.user.id);
        await post.save();
    }

    res.json(post);
});

module.exports = router;