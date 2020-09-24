import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const operations = new mongoose.Schema({
  description: String,
})

const operationsModel = mongoose.model('operations', operations)

export default operationsModel
