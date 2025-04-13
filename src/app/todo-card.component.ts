import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-todo-card",
  templateUrl: "./todo-card.component.html",
  styleUrls: ["./todo-card.component.css"],
  imports: [CommonModule],
})
export class TodoCardComponent {
  message = input<string>();
  completed = input<boolean>();
  id = input<string>();

  removeTodo = output<string>();
  todoStatus = output<string>();

  onTodoStatus(id?: string) {
    if (id === undefined) return;

    this.todoStatus.emit(id);
  }

  onRemoveTodo(id?: string) {
    if (id === undefined) return;

    this.removeTodo.emit(id);
  }
}
