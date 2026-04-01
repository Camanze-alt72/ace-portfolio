import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completion: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
