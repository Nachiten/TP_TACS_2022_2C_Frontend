import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';


@Component({
  selector: 'app-match-details-form',
  templateUrl: './match-details-form.component.html',
  styleUrls: ['./match-details-form.component.css']
})
export class MatchDetailsFormComponent implements OnInit {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;
  matchDetails: string = '';

  constructor(
    private readonly toastr: ToastrService
  ) { }

  matchDetailsForm = new FormGroup({
    matchId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  controls = this.matchDetailsForm.controls;

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.matchDetailsForm.valid) {
      console.log('Invalid form. Canceling submit.');

      this.toastr.error('Debe corregir todos los errores antes de avanzar', 'Error!');
      this.matchDetailsForm.markAllAsTouched();

      return;
    }

    const matchID = this.matchDetailsForm.value.matchId as string;

    if(!matchID) {
      this.toastr.error(`El id de partido es obligatorio`, 'Error!');
      return;
    }

    this.matchDetails = matchID

    console.log(matchID)

  }

}
