import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from '@angular/forms';
import { controlHasError, getControlValidClass } from '../../../utils/form-utils';
import { ToastrService } from 'ngx-toastr';
import { Match } from '../../model/Match';
import { MatchService } from '../../services/match.service';
import { dateToBackendDateTime } from '../../../utils/service-utils';
import { ErrorCode } from '../../model/ErrorCode';
import { Router } from '@angular/router';

type MatchFormType = ɵTypedOrUntyped<MatchForm, ɵFormGroupValue<MatchForm>, any>;

interface MatchForm {
  dateTime: FormControl<string>;
  location: FormControl<string>;
}

@Component({
  selector: 'app-new-match-form',
  templateUrl: './new-match-form.component.html',
  styleUrls: ['./new-match-form.component.scss']
})
export class NewMatchFormComponent {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;

  resultMessage: string = '';

  newMatchForm = new FormGroup<MatchForm>({
    dateTime: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    location: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true
    })
  });

  controls = this.newMatchForm.controls;

  constructor(
    private readonly matchService: MatchService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    if (!this.newMatchForm.valid) {
      console.log('Invalid form. Canceling submit.');

      this.toastr.error('Debe corregir todos los errores antes de continuar', 'Error!');
      this.newMatchForm.markAllAsTouched();

      return;
    }

    console.log('Form valid. Submitting...');

    const value: MatchFormType = this.newMatchForm.value;

    const match = new Match();

    console.log('Date time: ', value.dateTime);

    match.dateTime = new Date(value.dateTime as string);
    match.location = value.location as string;

    this.matchService.createMatch(match).subscribe({
      next: (match: Match) => {
        console.log('Match created: ', match);

        this.resultMessage = `El partido fue creado correctamente con id: ${match.id}`;
      },
      error: (error: any) => {
        console.log('Error: ', error);

        // Error must have errorCode
        if (!error.error || !error.error.errorCode) {
          this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
          return;
        }

        // Error code returned from backend
        switch (error.error.errorCode) {
          case ErrorCode.MATCH_EXISTENT:
            this.toastr.error('Ya existe un partido con los mismos datos', 'Error!');
            break;
          case ErrorCode.INVALID_MATCH_DATE:
            this.toastr.error(
              'La fecha del partido no puede ser anterior a la fecha actual',
              'Error!'
            );
            break;
          default:
            this.toastr.error('Ocurrió un error al crear el partido', 'Error!');
        }
      }
    });
  }

  getDateNow(): string {
    const date = dateToBackendDateTime(new Date());

    return date.substring(0, date.length - 7);
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
