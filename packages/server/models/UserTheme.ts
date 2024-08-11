import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IUserTheme {
  id: number
  theme_id: number
  owner_id: number
  device: string
  createdAt: string
  updatedAt: string
}

export const userThemeModel: ModelAttributes<Model, IUserTheme> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  theme_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  owner_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  device: {
    type: DataType.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataType.TIME,
    allowNull: true,
  },
  updatedAt: {
    type: DataType.TIME,
    allowNull: true,
  },
}
