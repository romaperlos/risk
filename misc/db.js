import mongoose from 'mongoose';
// import './env.js' //сид в базу

// export const connection = mongoose.createConnection();

export default mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
