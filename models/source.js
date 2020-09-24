import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const source = new mongoose.Schema({
  description: String,
})

const sourceModel = mongoose.model('source', source)

export default sourceModel;
