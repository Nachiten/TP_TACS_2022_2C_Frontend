import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';
import { ErrorCode } from '../../model/ErrorCode';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-match-details-form',
  templateUrl: './match-details-form.component.html',
  styleUrls: ['./match-details-form.component.css']
})
export class MatchDetailsFormComponent implements OnInit {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;
  matchDetails: any = null;

  constructor(
    private readonly toastr: ToastrService,
    private readonly matchService: MatchService
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

    this.matchService.getMatchById(matchID).subscribe({
        next: (match: any) => {
          this.matchDetails = match;
          console.log(this.matchDetails)
          console.log(`found match ${matchID}`)
        },
        error: (error: any) => {
          console.log('Error: ', error);
  
          if(error.error.errorCode === ErrorCode.MATCH_NOT_FOUND) {
            this.toastr.error(`No se encontró un partido con esa ID`, 'Error!');
            return;
          }

          this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
          return;
        }
      })
  }

}
