import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Fix old email index on startup
User.collection.dropIndex('email_1').catch(() => {
  // Index doesn't exist, that's fine
});

export default User;
