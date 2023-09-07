import { DataSource } from 'typeorm'
import ormConfig from './orm.config'

const AppDataSource = new DataSource({
  ...ormConfig,
})

AppDataSource.initialize().then(() => {
  console.log(AppDataSource.options.entities)
})

export default AppDataSource
