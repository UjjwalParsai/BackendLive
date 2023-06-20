import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  customerName: {
    type: String,
    unique: true
  },
  contactNumber: {
    type: Number,

  },
  totalGeust: {
    type: Number,

  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',

  },//iska jarut ku hai 
  mehandiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mehandi',

  },
  requestDate: {
    type: Date,
    default: Date.now
  }
});

const Request = mongoose.model('request', requestSchema);

export default Request;
