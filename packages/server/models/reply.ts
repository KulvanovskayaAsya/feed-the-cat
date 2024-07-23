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
import { Comment } from './comment'

@Table({
  timestamps: true,
})
export class Reply extends Model<Reply> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId: number

  @BelongsTo(() => Comment)
  comment: Comment

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.INTEGER,
  })
  parentId: number

  @HasMany(() => Reply, { as: 'Replies' })
  replies: Reply[]
}
