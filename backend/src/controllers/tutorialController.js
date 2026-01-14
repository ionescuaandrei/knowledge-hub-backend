const Tutorial = require('../models/Tutorial');

exports.create = async (req, res) => {
  try {
    const { title, description, published, sourceLink, coverImage } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const authorId = req.user && req.user.id ? req.user.id : null;
    const authorEmail = req.user && req.user.email ? req.user.email : 'unknown';
    
    const tutorial = new Tutorial({
      title,
      description,
      published: published || false,
      sourceLink: sourceLink || null,
      coverImage: coverImage || null,
      authorId: authorId,
      authorEmail: authorEmail,
    });

    await tutorial.save();
    res.status(201).json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { title } = req.query;
    const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};
    const tutorials = await Tutorial.find(condition).populate('authorId', 'email role');
    res.json(tutorials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id).populate('authorId', 'email role');
    if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });
    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const update = req.body;
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });

    // only author can update (or allow if author not set)
    if (tutorial.authorId && req.user && req.user.id && String(tutorial.authorId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to update this tutorial' });
    }

    Object.assign(tutorial, update);
    await tutorial.save();
    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });

    if (tutorial.authorId && req.user && req.user.id && String(tutorial.authorId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to delete this tutorial' });
    }

    await Tutorial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tutorial deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tutorials created by the authenticated user
exports.getMine = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });
    const tutorials = await Tutorial.find({ authorId: req.user.id }).populate('authorId', 'email role');
    res.json(tutorials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
