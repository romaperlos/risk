import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const taxType = new mongoose.Schema({
  description: String,
})

const taxTypeModel = mongoose.model('taxType', taxType)

export default taxTypeModel;
