const express = require('express');
const Post = require('../Models/Post');
const { protect } = require('../Middleware/AuthMiddleware'); 

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 }); // Sort by newest first
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: 'Server error fetching posts' });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (post.author.toString() !== req.user._id.toString()) {
         return res.status(401).json({ message: 'User not authorized to view this post' });
      }
  
      res.json(post);
    } catch (error) {
      console.error("Error fetching single post:", error);
      if (error.name === 'CastError') { return res.status(400).json({ message: 'Invalid post ID format' }); }
      res.status(500).json({ message: 'Server error fetching post' });
    }
  });
  

router.post('/', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Please provide title and content' });
  }

  try {
    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: 'Server error creating post', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required for update' });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this post' });
    }

    post.title = title;
    post.content = content;
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    if (error.name === 'CastError') { return res.status(400).json({ message: 'Invalid post ID format' }); }
    res.status(500).json({ message: 'Server error updating post' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this post' });
    }

    await post.deleteOne(); 

    res.json({ message: 'Post removed successfully', postId: req.params.id });
  } catch (error) {
    console.error("Error deleting post:", error);
    if (error.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid post ID format' });
    }
    res.status(500).json({ message: 'Server error deleting post' });
  }
});

module.exports = router;