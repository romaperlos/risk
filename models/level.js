import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const level = new mongoose.Schema({
  level: { type: Number, default: 5 },
  description: String,
})

const levelModel = mongoose.model('level', level)

export default levelModel;
