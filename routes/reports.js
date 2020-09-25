import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import taxTypeModel from '../models/taxType.js';
import operationsModel from '../models/operations.js';
import wayDetectionModel from '../models/wayDetection.js';
import sourceModel from '../models/source.js';
import frequencyModel from '../models/frequency.js';
import probabilityModel from '../models/probability.js';
import effectsModel from '../models/effects.js';
import levelModel from '../models/level.js';
import riskModel from '../models/risk.js';
import acceptabilityModel from '../models/acceptability.js';
import statusModel from '../models/status.js';

const router = express.Router();

// рендерит превью реестра рисков
// маршрут reports
router.get('/', async (req, res, next) => {
  const riskAll = await riskModel.find();
  const taxTypeArray = await taxTypeModel.find();
  const levelModelArray = await levelModel.find();
  const acceptabilityModelArray = await acceptabilityModel.find();
  const statusModelArray = await statusModel.find();

  res.render('report/reportButtons', {
    riskAll,
    taxTypeArray,
    levelModelArray,
    acceptabilityModelArray,
    statusModelArray,
  });
});

export default router;
