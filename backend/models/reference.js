import mongoose from 'mongoose';

const referenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ""
  },
  company: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    default: ""
  }
});

const Reference = mongoose.model('Reference', referenceSchema);

export default Reference;
