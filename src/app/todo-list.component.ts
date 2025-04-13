import { Component, input, output } from "@angular/core";
import { TodoCardComponent } from "./todo-card.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"],
  imports: [TodoCardComponent, CommonModule],
})

export class TodoListComponent {
  filteredTodos = input<{ id: string, message: string; completed: boolean }[]>();

  removeTodo = output<string>();
  todoStatus = output<string>();

  onRemoveTodo(id?: string) {
    if (id === undefined) return;
    this.removeTodo.emit(id);
  }

  onTodoStatusChange(id?: string) {
    if (id === undefined) return;
    this.todoStatus.emit(id);
  }
}
