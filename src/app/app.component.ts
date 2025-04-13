import { Component, OnInit, signal, computed } from "@angular/core";
import { TodoInputComponent } from "./todo-input.component";
import { CommonModule } from "@angular/common";
import { TodoListComponent } from "./todo-list.component";
import { TodoFilterComponent } from "./todo-filter.component";

type Todo = {
  id: string;
  message: string;
  completed: boolean;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  imports: [
    TodoInputComponent,
    TodoListComponent,
    TodoFilterComponent,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);
  activeFilter = signal("all");
  filteredTodos = computed(() => {
    const filter = this.activeFilter();

    switch (filter) {
      case "done":
        return this.todos().filter((todo) => todo.completed);
      case "open":
        return this.todos().filter((todo) => !todo.completed);
      default:
        return this.todos();
    }
  });

  async fetchTodos() {
    try {
      const response = await fetch("/json-todos.json");
      const data: Todo[] = await response.json();

      this.todos.set([...data]);
    } catch (e) {
      console.error(e);
    }
  }

  onAddTodo(message: string) {
    const newTodo: Todo = { id: crypto.randomUUID(), message, completed: false };
    this.todos.update((prevTodos) => [newTodo, ...prevTodos]);
  }

  onRemoveTodo(id: string) {
    this.todos.update((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  }

  onUpdateStatus(id: string) {
    this.todos.update((prevState) => {
      return prevState.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    });
  }

  onFilterTodos(filter: string) {
    this.activeFilter.set(filter);
  }

  ngOnInit() {
    this.fetchTodos();
  }
}