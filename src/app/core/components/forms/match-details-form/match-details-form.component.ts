import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';
import { MatchService } from '../../../services/match.service';
import { Router } from '@angular/router';
import { ErrorCode } from '../../../model/ErrorCode';
import { Match } from '../../../model/Match';
import { dateToStringDateTime } from '../../../../utils/date-utils';

@Component({
  selector: 'app-match-details-form',
  templateUrl: './match-details-form.component.html',
  styleUrls: ['./match-details-form.component.css']
})
export class MatchDetailsFormComponent implements OnInit {
  dateToStringDaTeTime = dateToStringDateTime;
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;
  matchDetails?: Match;

  constructor(
    private readonly toastr: ToastrService,
    private readonly matchService: MatchService,
    private readonly router: Router
  ) {}

  matchDetailsForm = new FormGroup({
    matchId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  controls = this.matchDetailsForm.controls;

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.matchDetailsForm.valid) {
      console.log('Invalid form. Canceling submit.');

      this.toastr.error(`El id de partido es obligatorio`, 'Error!');
      this.matchDetailsForm.markAllAsTouched();

      return;
    }

    const matchID = this.matchDetailsForm.value.matchId as string;

    this.matchDetails = undefined;

    this.matchService.getMatchById(matchID).subscribe({
      next: (match: Match) => {
        this.matchDetails = match;
        console.log(this.matchDetails);
        console.log(`found match ${matchID}`);
      },
      error: (error: any) => {
        console.log('Error: ', error);

        this.matchDetailsForm.controls['matchId'].setErrors({ incorrect: true });

        // Error must have errorCode
        if (!error.error || !error.error.errorCode) {
          this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
          return;
        }

        // Error code returned from backend
        switch (error.error.errorCode) {
          case ErrorCode.MATCH_NOT_FOUND:
            this.toastr.error('El partido indicado no existe', 'Error!');
            break;
          default:
            this.toastr.error('Ocurrió un error al obtener el detalle', 'Error!');
        }
      }
    });
  }

  // parseMatchDate(): string {
  //   return this.matchDetails ? new Date(this.matchDetails.startingDateTime).toLocaleString() : '';
  // }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
