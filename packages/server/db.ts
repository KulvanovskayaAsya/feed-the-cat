import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

import { Topic } from './models/topic'
import { Comment } from './models/comment'
import { Reply } from './models/reply'

import { userModel, userThemeModel, siteThemeModel } from './models'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

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

export const UserModel = sequelize.define('users', userModel, {
  timestamps: false,
})
export const UserThemeModel = sequelize.define('user_theme', userThemeModel, {
  timestamps: false,
})
export const SiteThemeModel = sequelize.define('site_theme', siteThemeModel, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['theme'],
    },
  ],
})

UserThemeModel.belongsTo(UserModel, { foreignKey: 'owner_id' })
UserThemeModel.belongsTo(SiteThemeModel, { foreignKey: 'theme_id' })

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    return sequelize
  } catch (e) {
    console.error('Unable to connect to the database:', e)
  }

  return null
}
