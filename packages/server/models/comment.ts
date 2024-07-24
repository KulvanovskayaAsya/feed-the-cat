// @ts-nocheck
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
import { User } from './user'
import { Topic } from './topic'
import { Reply } from './reply'

@Table({
  timestamps: true,
})
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  topicId!: number

  @BelongsTo(() => Topic)
  topic: Topic

  @HasMany(() => Reply)
  replies: Reply[]
}
