import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Controller("todo")
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post("add")
  addTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.addTodo(createTodoDto);
  }

  @Get(":id")
  getTodos(@Param("id") id: string) {
    return this.todoService.getTodos(id);
  }

  @Put("complete/:id")
  completeTodo(@Param("id") id: string) {
    return this.todoService.completeTodo(id);
  }

  @Put("important/:id")
  importantTodo(@Param("id") id: string) {
    return this.todoService.importantTodo(id);
  }

  @Delete("delete/:id")
  deleteTodo(@Param("id") id: string) {
    return this.todoService.deleteTodo(id);
  }
}
