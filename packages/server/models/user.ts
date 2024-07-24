// @ts-nocheck
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Topic } from './topic'
import { Comment } from './comment'
import { Reply } from './reply'

@Table({
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string

  @HasMany(() => Topic)
  topics: Topic[]

  @HasMany(() => Comment)
  comments: Comment[]

  @HasMany(() => Reply)
  replies: Reply[]
}
