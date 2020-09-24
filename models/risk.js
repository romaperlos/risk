import mongoose from 'mongoose';

mongoose.pluralize(null);

const risk = new mongoose.Schema({
  taxType: { type: String },
  riskName: { type: String, required: true },
  riskDescription: { type: String, required: true },
  riskOperations: [{ type: String }],
  wayDetection: [{ type: String }],
  riskSource: [{ type: String }],
  frequency: { type: Number },
  probability: { type: Number },
  effects: { type: Number },
  level: { type: String, default: 'Низкий' },
  acceptability: { type: String, default: 'Приемлемый' },
  status: { type: String, default: 'Создан' },
  dataCreate: { type: Date },
});

const riskModel = mongoose.model('risk', risk);

export default riskModel;
