const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		quantity: { type: Number, default: 1, min: 1 },
		price: { type: Number, required: true, min: 0 },
		category: { type: String, default: 'General', trim: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
