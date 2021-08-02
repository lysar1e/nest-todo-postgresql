import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Todo } from "./todo.model";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}

  async addTodo(createTodoDto: CreateTodoDto) {
    const { text, userId } = createTodoDto;
    const todo = await this.todoRepository.create({
      text,
      owner: userId,
      completed: false,
      important: false,
    });
    return todo;
  }

  async getTodos(id: string) {
    const todos = await this.todoRepository.findAll({ where: { owner: id } });
    return todos;
  }

  async completeTodo(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    todo.completed = !todo.completed;
    await todo.save();
    return todo;
  }

  async importantTodo(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    todo.important = !todo.important;
    await todo.save();
    return todo;
  }

  async deleteTodo(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    return todo.destroy();
  }
}
