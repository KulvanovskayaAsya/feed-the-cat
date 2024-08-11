import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface ISiteTheme {
  id: number
  theme: string
  description: string
  createdAt: string
  updatedAt: string
}

export const siteThemeModel: ModelAttributes<Model, ISiteTheme> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  theme: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataType.JSON,
    allowNull: false,
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
