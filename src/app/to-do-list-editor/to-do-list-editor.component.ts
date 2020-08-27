import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";

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
    private route: ActivatedRoute
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
    this.form = new FormGroup({
      // position: new FormControl({value: taskId, disabled: true}, Validators.required),
      name: new FormControl('Nancy', Validators.required),
      description: new FormControl('Bla bla blaa'),
      date: new FormControl('15:00 07 August 2020'),
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
