import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';

interface NewPlayerLinkForm {
  id: FormControl<string>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;

  constructor(private readonly router: Router, private readonly toastr: ToastrService) {}

  newPlayerLinkForm = new FormGroup<NewPlayerLinkForm>({
    id: new FormControl('', {
      validators: [Validators.required],
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

    console.log('Form valid. Redirecting...');

    const id: string = this.newPlayerLinkForm.value.id as string;

    this.router.navigate(['new-player', id]);
  }
}
