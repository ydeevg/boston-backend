import * as dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'

dotenv.config()

export default {
  type: 'postgres',
  host: process.env.TYPEORM_HOST as string,
  port: parseInt(process.env.TYPEORM_PORT) as number,
  username: process.env.TYPEORM_USER as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  synchronize: true,
  entities: ['dist/**/entities/*.entity.js'],
  autoLoadEntities: true,
  migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
  logging: true,
} as DataSourceOptions
