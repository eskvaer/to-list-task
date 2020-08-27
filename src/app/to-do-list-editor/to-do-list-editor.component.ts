import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {Tasks} from "../to-do-list.model";
import {MatTableDataSource} from "@angular/material/table";
import {ToDoListService} from "../to-do-list.service";

@Component({
  selector: 'to-do-list-editor',
  templateUrl: './to-do-list-editor.component.html',
  styleUrls: ['./to-do-list-editor.component.css']
})

export class ProfileEditorComponent {
  taskId = null;
  form = this.fb.group({
    position: [null],
    name: ['', Validators.required],
    date: [''],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: ToDoListService
  ) {
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      return;
    }
    this.taskId = taskId;
    this.updateForm(taskId);
  }


  updateForm(taskId) {
    // this.task = this.service.getTask(taskId);
    this.taskService.getTask(taskId).subscribe(data => {
      console.log(data);
      const task = {
        id: data.id,
        ...data.data()
      } as Tasks;
      console.log(task.date);
      console.log(task.date.toMillis());
      this.form = new FormGroup({
        position: new FormControl({value: task.position, disabled: true}, Validators.required),
        name: new FormControl(task.name, Validators.required),
        description: new FormControl(task.description),
        date: new FormControl(task.date.toMillis()),
      });
    });
  }

  dateChanged(eventDate: string): Date | null {
    return !!eventDate ? new Date(eventDate) : null;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
    console.warn(this.taskId);
    // this.task = this.service.updateTask(taskId);
  }
}
