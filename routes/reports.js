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

router.post('/tax', async (req, res) => {
  // console.log(req.body);
  const collect = await riskModel.find({ taxType: req.body.tax });
  // console.log(taxCollect);
  res.json({ collect });
});

router.post('/level', async (req, res) => {
  // console.log(req.body);
  const collect = await riskModel.find({ level: req.body.level });
  // console.log(taxCollect);
  res.json({ collect });
});

router.post('/accept', async (req, res) => {
  // console.log(req.body);
  const collect = await riskModel.find({ acceptability: req.body.acceptability });
  // console.log(taxCollect);
  res.json({ collect });
});

router.post('/status', async (req, res) => {
  // console.log(req.body);
  const collect = await riskModel.find({ status: req.body.status });
  // console.log(taxCollect);
  res.json({ collect });
});

export default router;
