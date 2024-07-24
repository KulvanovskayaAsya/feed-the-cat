import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

import { userModel, userThemeModel, siteThemeModel } from './models'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
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

export async function connectToPostrgess() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    return sequelize
  } catch (error) {
    console.log('error', error)
    return error
  }
}
