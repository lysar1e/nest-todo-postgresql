import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Todo } from "./todo.model";

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [SequelizeModule.forFeature([Todo])],
})
export class TodoModule {}
