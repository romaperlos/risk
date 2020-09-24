import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const frequency = new mongoose.Schema({
  level: Number,
  description: String,
})

const frequencyModel = mongoose.model('frequency', frequency)

export default frequencyModel;
