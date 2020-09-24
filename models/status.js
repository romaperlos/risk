import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const status = new mongoose.Schema({
  description: String,
})

const statusModel = mongoose.model('status', status)

export default statusModel;
