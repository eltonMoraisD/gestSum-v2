import 'reflect-metadata';
import app from './app';

import { dbCreateConnection } from '../src/typeorm/dbConnections';

const PORT: number = 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}!`);
});

dbCreateConnection();
