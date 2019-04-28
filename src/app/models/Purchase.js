const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 250
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase',
    required: true
  }
})

module.exports = mongoose.model('Purchase', purchaseSchema)
