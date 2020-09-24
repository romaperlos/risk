import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const effects = new mongoose.Schema({
  level: Number,
  description: String,
})

const effectsModel = mongoose.model('effects', effects)

export default effectsModel;
