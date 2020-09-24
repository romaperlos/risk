import mongoose from 'mongoose';
// import { Schema, model } from 'mongoose';

mongoose.pluralize(null);

const wayDetection = new mongoose.Schema({
  description: String,
})

const wayDetectionModel = mongoose.model('wayDetection', wayDetection)

export default wayDetectionModel;
