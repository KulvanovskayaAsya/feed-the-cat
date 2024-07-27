import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
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

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare commentId: number

  @BelongsTo(() => Comment)
  declare comment: Comment

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.INTEGER,
  })
  declare parentId: number

  @HasMany(() => Reply, { as: 'Replies' })
  declare replies: Reply[]
}
