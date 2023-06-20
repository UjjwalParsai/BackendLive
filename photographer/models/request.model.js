import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  contactPerson: {
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  customerId: {
    type:String,
    required: true
  },
  photoGrapherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'photographer',
    required: true
  },
  eventDate:{
   type:String,
   required:true
  },
  typeOfEvent:{
   type:String,
   required:true
  },
  requestDate: {
    type: Date,
    default: new Date().toString().substring(4, 15).replaceAll(' ', '-')
  }
});

const Request = mongoose.model('request', requestSchema);

export default Request;
