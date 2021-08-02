import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TodoCreationAttrs {
  text: string;
  owner: string;
  completed: boolean;
  important: boolean;
}

@Table({ tableName: "todos" })
export class Todo extends Model<Todo, TodoCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @Column({ type: DataType.STRING, allowNull: false })
  owner: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  completed: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  important: boolean;
}
