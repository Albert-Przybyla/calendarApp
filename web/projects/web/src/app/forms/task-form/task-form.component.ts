import { Component, inject, OnInit } from '@angular/core';
import { BaseModalComponent } from '../../base/baseModalComponent';
import {
  TaskControllerClientService,
  TaskIdPutRequest,
  TaskPostRequest,
} from '../../../../../api-client';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class TaskFormComponent extends BaseModalComponent {
  private _taskControllerClientService = inject(TaskControllerClientService);

  protected form: FormGroup = new FormGroup({
    name: new FormControl(undefined, [Validators.required]),
    description: new FormControl(undefined),
    date: new FormControl(new Date().toISOString().split('T')[0], [
      Validators.required,
    ]),
  });

  onSubmit() {
    const req = this.form.value;
    if (this.id) this.edit(req as TaskIdPutRequest);
    else this.add(req as TaskPostRequest);
  }

  private edit(req: TaskIdPutRequest) {
    this._taskControllerClientService.taskIdPut(this.id, req).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => {
        this.close(true);
      },
    });
  }
  private add(req: TaskPostRequest) {
    this._taskControllerClientService.taskPost(req).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => {
        this.close(true);
      },
    });
  }
}
