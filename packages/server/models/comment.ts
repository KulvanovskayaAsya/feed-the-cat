import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
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
  declare id: number

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

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare topicId: number

  @BelongsTo(() => Topic)
  declare topic: Topic

  @HasMany(() => Reply)
  declare replies: Reply[]
}
