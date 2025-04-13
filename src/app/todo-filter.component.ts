import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-todo-filter",
  templateUrl: "./todo-filter.component.html",
  styleUrls: ["./todo-filter.component.css"],
  imports: [CommonModule],
})

export class TodoFilterComponent {
  activeFilter = input<string>();
  todoNumber = input<number>();

  selectedFilter = output<string>();

  updateActiveFilter(filter: string) {
    this.selectedFilter.emit(filter);
  }
}
