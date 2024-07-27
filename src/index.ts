import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config';
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import './events/handlers';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    app.use('/users', userRoutes);
    app.use('/books', bookRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => console.log(error));
