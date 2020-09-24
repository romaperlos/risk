import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const probability = new mongoose.Schema({
  level: Number,
})

const probabilityModel = mongoose.model('probability', probability)

export default probabilityModel;
