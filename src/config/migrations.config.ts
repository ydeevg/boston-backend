import { DataSource } from 'typeorm'
import ormConfig from './orm.config'
import { join } from 'path'

const AppDataSource = new DataSource({
  ...ormConfig,
  entities: [join(__dirname, '..', '..', 'src', '**', 'entities', '*.entity.ts')],
  migrations: [join(__dirname, '..', '..', 'src', 'migrations', '**', '*.ts')],
})

AppDataSource.initialize().then(() => {
  console.log(AppDataSource.options.entities)
})

export default AppDataSource
