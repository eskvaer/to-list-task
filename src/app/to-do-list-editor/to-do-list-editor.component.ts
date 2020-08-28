import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Tasks} from "../to-do-list.model";
import {ToDoListService} from "../to-do-list.service";

@Component({
  selector: 'to-do-list-editor',
  templateUrl: './to-do-list-editor.component.html',
  styleUrls: ['./to-do-list-editor.component.css']
})

export class ProfileEditorComponent {
  taskId = null;
  is_edit = false;
  form = this.fb.group({
    number: [null],
    name: ['', Validators.required],
    date: [''],
    description: [''],
    is_done: [false],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: ToDoListService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      return;
    }
    this.taskId = taskId;
    this.updateForm();
  }


  updateForm() {
    this.taskService.getTask(this.taskId).subscribe(data => {
      const taskData = data.data()
      const task = {
        id: data.id,
        ...taskData
      } as Tasks;
      this.form = new FormGroup({
        number: new FormControl(task.number),
        name: new FormControl(task.name, Validators.required),
        description: new FormControl(task.description),
        date: new FormControl(task.date),
        is_done: new FormControl(task.is_done),
      });
    });
  }

  onSubmit() {
    if (this.taskId) {
      this.taskService.updateTask(this.taskId, this.form.value)
    } else {
      this.taskService.createTask(this.form.value)
    }
    this.router.navigateByUrl('/');
  }
}
