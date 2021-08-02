import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "./auth/auth.module";
import { User } from "./auth/users.model";
import { TodoModule } from "./todo/todo.module";
import { Todo } from "./todo/todo.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "ec2-34-253-116-145.eu-west-1.compute.amazonaws.com",
      port: 5432,
      username: "ubvqlmenflpilq",
      password:
        "aa3e5151354ef72c61dc23c04af00052561bf8a82ef1636a23fc994a82dc4a61",
      database: "d2bjtj8fndpf8t",
      models: [User, Todo],
      autoLoadModels: true,
      dialectOptions: {
        ssl: { rejectUnauthorized: false },
      },
    }),
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
