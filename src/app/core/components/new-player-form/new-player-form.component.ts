import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';

interface NewPlayerForm {
  matchId: FormControl<string>;
  phoneNumber: FormControl<number | null>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-new-player-form',
  templateUrl: './new-player-form.component.html',
  styleUrls: ['./new-player-form.component.css']
})
export class NewPlayerFormComponent {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;

  constructor(private readonly router: Router, private readonly toastr: ToastrService) {}

  newPlayerLinkForm = new FormGroup<NewPlayerForm>({
    matchId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    phoneNumber: new FormControl(null, {
      validators: [Validators.required, Validators.min(1000), Validators.max(999999999999)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    })
  });

  controls = this.newPlayerLinkForm.controls;

  onSubmit(): void {
    if (!this.newPlayerLinkForm.valid) {
      console.log('Invalid form. Canceling submit.');

      this.toastr.error('Debe corregir todos los errores antes de avanzar', 'Error!');
      this.newPlayerLinkForm.markAllAsTouched();

      return;
    }

    console.log('Form valid. ');

    // Send request to backend
  }
}
