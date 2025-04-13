import { Component, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-todo-input",
    templateUrl: "./todo-input.component.html",
    styleUrls: ["./todo-input.component.css"],
    imports: [FormsModule, CommonModule]
})
export class TodoInputComponent {
    addTodo = output<string>();
    
    inputValue = signal("");
    isEmpty = signal(false);

    submitTodoHandler(e: SubmitEvent) {
        e.preventDefault();

        if (this.inputValue().trim() === "") {
            this.isEmpty.set(true);

            const timeout = setTimeout(() => {
                this.isEmpty.set(false);
                clearTimeout(timeout);
            }, 2000);

            return;
        }
        
        this.addTodo.emit(this.inputValue());

        this.inputValue.set("");
    }
}