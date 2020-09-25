import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import './misc/env.js'
import './misc/db.js'
import indexRouter from './routes/index.js'
import authRouter from './routes/auth.js'
import riskListRouter from './routes/riskList.js' // добавил импорт на новый роутер реестра рисков (Антон)
import reportListRouter from './routes/reports.js'; // импорт роута отчета
import userMiddleware from './middlewares/user.js'
import adminMiddleware from './middlewares/admin.js'
import notFoundMiddleware from './middlewares/notfound.js'
import errorMiddleware from './middlewares/error.js'

const app = express()
const FileStore = MongoStore(session)

app.set('view engine', 'hbs')
// Запоминаем название куки для сессий
app.set('session cookie name', 'sid')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // добавил парсер для req.body (Антон)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new FileStore({
      // Шифрование сессии
      mongooseConnection: mongoose.connection,
      secret: process.env.SESSION_SECRET
    }),
    // Если true, сохраняет сессию, даже если она не поменялась
    resave: false,
    // Если false, куки появляются только при установке req.session
    saveUninitialized: false
  })
)

app.use(userMiddleware)
app.use(adminMiddleware)

app.use(indexRouter)
app.use(authRouter)
app.use('/riskList', riskListRouter) // добавил новый роутер реестра рисков (Антон)
app.use('/reports', reportListRouter) // роут на отчет (Вадим)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT

app.listen(port)
