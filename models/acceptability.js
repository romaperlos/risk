import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const acceptability = new mongoose.Schema({
  description: String,
})

const acceptabilityModel = mongoose.model('acceptability', acceptability)

export default acceptabilityModel;
