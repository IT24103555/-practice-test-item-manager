const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Item = require('./models/Item');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Error:', err.message));

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const payload = {
      ...req.body,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
    };
    const newItem = new Item(payload);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    const payload = {
      ...req.body,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
    };

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json(updatedItem);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json({ message: 'Item deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
