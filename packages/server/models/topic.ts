import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Comment } from './comment'

@Table({
  timestamps: true,
})
export class Topic extends Model<Topic> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number

  @HasMany(() => Comment)
  declare comments: Comment[]
}
