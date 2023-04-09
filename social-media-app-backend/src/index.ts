import 'dotenv/config';
import { AppDataSource } from './orm/config/data-source';
import express from 'express';

const app: express.Application = express();

const port: number = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`Server running on port ${port} 👍`);
});

AppDataSource.initialize().then(() => {
  console.log('Database connection successful.');
}).catch(error => { console.log(error); });
