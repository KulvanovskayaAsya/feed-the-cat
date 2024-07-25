import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

import { Topic } from './models/topic'
import { Comment } from './models/comment'
import { Reply } from './models/reply'

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
    models: [Topic, Comment, Reply],
  }

  const sequelize = new Sequelize(sequelizeOptions)

  try {
    await sequelize.authenticate()
    await sequelize.sync()

    return sequelize
  } catch (e) {
    console.error('Unable to connect to the database:', e)
  }

  return null
}