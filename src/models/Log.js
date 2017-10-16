import Mongoose, { Schema } from 'mongoose';

const logSchema = new Schema({
  ip: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = Mongoose.model('Log', logSchema);

export default User;
