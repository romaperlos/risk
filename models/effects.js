import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const effects = new mongoose.Schema({
  level: Number,
})

const effectsModel = mongoose.model('effects', effects)

export default effectsModel;
