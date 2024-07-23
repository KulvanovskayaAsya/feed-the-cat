import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import path from 'path'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  const sequelizeOptions: SequelizeOptions = {
    host: 'postgres',
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: 'postgres',
    models: [path.join(__dirname, 'models')],
  }

  const sequelize = new Sequelize(sequelizeOptions)

  try {
    await sequelize.authenticate()
    console.log('  ➜ 🎸 Connected to the database')
    await sequelize.sync()
    return sequelize
  } catch (e) {
    console.error('Unable to connect to the database:', e)
  }

  // try {
  //   const client = new Client({
  //     user: POSTGRES_USER,
  //     host: 'postgres',
  //     database: POSTGRES_DB,
  //     password: POSTGRES_PASSWORD,
  //     port: Number(POSTGRES_PORT),
  //   })

  //   await client.connect()

  //   const res = await client.query('SELECT NOW()')
  //   console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
  //   client.end()

  //   return client
  // } catch (e) {
  //   console.error(e)
  // }

  return null
}
