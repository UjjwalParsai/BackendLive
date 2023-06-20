import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  customerId: {
    type: Number,
    required: true,
  },
  photoGrapherId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'photographer', 
  },
  feedback: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model('feedback', feedbackSchema);

export default Feedback;
