const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Catching uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNHANDELED EXCEPTION 😒 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection succesful');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running  on port ${port}...`);
});

//Cover unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDELED REJECTION 😒 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

//Catching uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNHANDELED EXCEPTION 😒 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
