import express from 'express';
import session from 'express-session';
const router = express.Router();

// рендерит превью реестра рисков
router.get('/', async (req, res, next) => {
  res.render('risk/list');
});

// рендерит форму добавления нового риска
router.get('/new', async (req, res, next) => {
  res.render('risk/newForm');
});

// приходят данные из формы добавления нового риска
// и потом редирект на превью реестра рисков
router.post('/newForm', async (req, res, next) => {

  res.redirect('/riskList');
});

// рендерит форму редактирования существующего риска
// нужно добавить :id в маршрут
router.get('/edit', async (req, res, next) => {
  res.render('risk/editForm');
});

// приходят данные из формы редактирования существующего риска
// и потом редирект на превью реестра рисков
// c PATCH не работает?
router.post('/editForm', async (req, res, next) => {

  res.redirect('/riskList');
});

// удаление существующего риска
// и потом редирект на превью реестра рисков
// добавить :id в маршрут, c DELETE не работает?
router.get('/delete', async (req, res, next) => {

  res.redirect('/riskList');
});

export default router;
