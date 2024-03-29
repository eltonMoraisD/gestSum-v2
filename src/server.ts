import 'reflect-metadata';
import app from './app';

import { dbCreateConnection } from '../src/typeorm/dbConnections';

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

dbCreateConnection();
