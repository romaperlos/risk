/* eslint-disable no-else-return */
/* eslint-disable indent */
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

const router = express.Router();

// рендерит превью реестра рисков
router.get('/', async (req, res, next) => {
  const riskAll = await riskModel.find();
  res.render('risk/list', { riskAll });
});

// рендерит форму добавления нового риска
router.get('/new', async (req, res, next) => {
  const [
    taxTypesArr,
    operationsArr,
    wayDetectionArr,
    sourcesArr,
    frequenciesArr,
    probabilitiesArr,
    effectsArr] = await Promise.all([
      taxTypeModel.find(),
      operationsModel.find(),
      wayDetectionModel.find(),
      sourceModel.find(),
      frequencyModel.find(),
      probabilityModel.find(),
      effectsModel.find(),
    ]);

  res.render('risk/newForm', {
    taxTypesArr,
    operationsArr,
    wayDetectionArr,
    sourcesArr,
    frequenciesArr,
    probabilitiesArr,
    effectsArr,
  });
});

// приходят данные из формы добавления нового риска
// и потом редирект на превью реестра рисков
router.post('/newForm', async (req, res, next) => {
  // console.log(req.body);
  let ourLevel;
  const levelsAll = await levelModel.find();
  console.log(levelsAll);
  const sumEfFreqProb = (+req.body.effect) + (+req.body.frequency) + (+req.body.probability);
  console.log('сумма', sumEfFreqProb);
  // let counter = 0;
  const obj = {
    lvl: 5,
    low: levelsAll[0].description,
    medium: levelsAll[1].description,
    high: levelsAll[2].description,
  };

  if (sumEfFreqProb < obj.lvl) {
    ourLevel = obj.low;
  } else if (sumEfFreqProb > obj.lvl) {
    ourLevel = obj.high;
  } else {
    ourLevel = obj.medium;
  }

  let ourAcceptability;
  if (ourLevel === 'Низкий' || ourLevel === 'Средний') {
    ourAcceptability = 'Приемлемый';
  } else {
    ourAcceptability = 'Неприемлемый';
  }

  const newRisk = new riskModel({
    taxType: req.body.tax,
    riskName: req.body.riskName,
    riskDescription: req.body.riskDescription,
    riskOperations: req.body.riskOperation,
    wayDetection: req.body.wayDetection,
    riskSource: req.body.source,
    frequency: +req.body.frequency,
    probability: +req.body.probability,
    effects: +req.body.effect,
    level: ourLevel,
    acceptability: ourAcceptability,
    dataCreate: Date.now(),
  });
  await newRisk.save();
  res.redirect('/riskList');
});

// рендерит форму редактирования существующего риска
// нужно добавить :id в маршрут
router.get('/edit/:id', async (req, res, next) => {
  let [
    taxTypesArr,
    operationsArr,
    wayDetectionArr,
    sourcesArr,
    frequenciesArr,
    probabilitiesArr,
    effectsArr] = await Promise.all([
      taxTypeModel.find(),
      operationsModel.find(),
      wayDetectionModel.find(),
      sourceModel.find(),
      frequencyModel.find(),
      probabilityModel.find(),
      effectsModel.find(),
    ]);
  const ourRisk = await riskModel.findOne({ _id: req.params.id });
  console.log(ourRisk);

  // Создаём массивы объектов с элементами checked / selected для рендера
  // формы редактирования с ранее выбранными пользователем значениями
  const selectedTaxTypesArr = taxTypesArr.map(el => {
    if (el.description === ourRisk.taxType) {
      return { description: el.description, choice: 'selected' };
    } else {
      return { description: el.description };
    }
  });

  const selectedOperationsArr = operationsArr.map(el => {
    if (ourRisk.riskOperations.includes(el.description)) {
      return { description: el.description, choice: 'checked' };
    } else {
      return { description: el.description };
    }
  });

  const selectedWayDetectionArr = wayDetectionArr.map(el => {
    if (ourRisk.wayDetection.includes(el.description)) {
      return { description: el.description, choice: 'checked' };
    } else {
      return { description: el.description };
    }
  });

  const selectedSourcesArr = sourcesArr.map(el => {
    if (ourRisk.riskSource.includes(el.description)) {
      return { description: el.description, choice: 'checked' };
    } else {
      return { description: el.description };
    }
  });

  const selectedFrequenciesArr = frequenciesArr.map(el => {
    if (el.level === ourRisk.frequency) {
      return { level: el.level, description: el.description, choice: 'selected' };
    } else {
      return { level: el.level, description: el.description };
    }
  });

  const selectedProbabilitiesArr = probabilitiesArr.map(el => {
    if (el.level === ourRisk.probability) {
      return { level: el.level, description: el.description, choice: 'selected' };
    } else {
      return { level: el.level, description: el.description };
    }
  });

  const selectedEffectsArr = effectsArr.map(el => {
    if (el.level === ourRisk.effects) {
      return { level: el.level, description: el.description, choice: 'selected' };
    } else {
      return { level: el.level, description: el.description };
    }
  });

  res.render('risk/editForm', {
    selectedTaxTypesArr,
    selectedOperationsArr,
    selectedWayDetectionArr,
    selectedSourcesArr,
    selectedFrequenciesArr,
    selectedProbabilitiesArr,
    selectedEffectsArr,
    ourRisk,
  });
});

// приходят данные из формы редактирования существующего риска
// и потом редирект на превью реестра рисков
// c PATCH не работает?
router.post('/editForm/:id', async (req, res, next) => {
  let ourLevel;
  const levelsAll = await levelModel.find();
  console.log(req.body);
  const sumEfFreqProb = (+req.body.effect) + (+req.body.frequency) + (+req.body.probability);
  console.log('сумма', sumEfFreqProb);
  const obj = {
    lvl: 5,
    low: levelsAll[0].description,
    medium: levelsAll[1].description,
    high: levelsAll[2].description,
  };

  if (sumEfFreqProb < obj.lvl) {
    ourLevel = obj.low;
  } else if (sumEfFreqProb > obj.lvl) {
    ourLevel = obj.high;
  } else {
    ourLevel = obj.medium;
  }

  let ourAcceptability;
  if (ourLevel === 'Низкий' || ourLevel === 'Средний') {
    ourAcceptability = 'Приемлемый';
  } else {
    ourAcceptability = 'Неприемлемый';
  }
  const ourRisk = await riskModel.findByIdAndUpdate(req.params.id, {
    taxType: req.body.tax,
    riskName: req.body.riskName,
    riskDescription: req.body.riskDescription,
    riskOperations: req.body.riskOperation,
    wayDetection: req.body.wayDetection,
    riskSource: req.body.source,
    frequency: +req.body.frequency,
    probability: +req.body.probability,
    effects: +req.body.effect,
    level: ourLevel,
    acceptability: ourAcceptability,
  });
  await ourRisk.save();

  res.redirect('/riskList');
});

// удаление существующего риска
// и потом редирект на превью реестра рисков
// добавить :id в маршрут, c DELETE не работает?
router.get('/delete/:id', async (req, res, next) => {
  const deleteRisk = await riskModel.findByIdAndDelete(req.params.id);
  res.redirect('/riskList');
});

export default router;
