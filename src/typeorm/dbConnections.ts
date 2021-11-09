import {Connection, createConnection} from 'typeorm'
import config from './config/ormconfig'

export async function dbCreateConnection(): Promise<Connection | null> {
  try {
    const conn = await createConnection(config)
    console.log(`database connection sucessfull:Connection name -> ${conn.name}, database: ${conn.options.database}`)
  } catch (error) {
    console.log(error);
    
  }

  return null;
}