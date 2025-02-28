const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  name:String,
  email:String,
  message:String
});

const Feedback = mongoose.model('feedbacks', FeedbackSchema);

module.exports = Feedback;