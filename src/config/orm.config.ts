import { DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config()

const AppDataSource = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST as string,
  port: parseInt(process.env.TYPEORM_PORT) as number,
  username: process.env.TYPEORM_USER as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  synchronize: false,
  migrationsRun: false,
  autoLoadEntities: false,
  entities: [join(__dirname, '..', '..', 'dist', '**', 'entities', '*.entity.js')],
  migrations: [join(__dirname, '..', '..', 'dist', 'migrations', '**', '*.js')],
  logging: true,
} as DataSourceOptions

export default AppDataSource
