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

type MatchFormType = ɵTypedOrUntyped<MatchForm, ɵFormGroupValue<MatchForm>, any>;

interface MatchForm {
  dateTime: FormControl<string>;
  location: FormControl<string>;
}

@Component({
  selector: 'app-new-match-form',
  templateUrl: './new-match-form.component.html',
  styleUrls: ['./new-match-form.component.css']
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
    private readonly toastr: ToastrService
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

        //this.toastr.success(`El partido fue creado correctamente con id: ${idCut}`, 'Éxito!');
        this.resultMessage = `El partido fue creado correctamente con id: ${match.id}`;
      },
      error: (error: any) => {
        console.log('Error: ', error);

        if (!error.error || !error.error.errorCode) {
          this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
          return;
        }

        switch (error.error.errorCode) {
          case 'MATCH_EXISTENT':
            this.toastr.error('Ya existe un partido con esa fecha y hora', 'Error!');
            break;
          case 'INVALID_MATCH_DATE':
            this.toastr.error(
              'La fecha y hora del partido no pueden ser anteriores a la fecha y hora actual',
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
}
