const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  judul: {
  	type: String,
  	required: true
  },
  deskripsi: String,
  tanggal: Date,
  status_beres : Boolean,
});

module.exports = mongoose.model('todo', TodoSchema);
