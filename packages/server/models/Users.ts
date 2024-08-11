import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
  createdAt: string
  updatedAt: string
}

export const userModel: ModelAttributes<Model, IUser> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  second_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  display_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  phone: {
    type: DataType.STRING,
    allowNull: false,
  },
  login: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
  email: {
    type: DataType.STRING,
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
