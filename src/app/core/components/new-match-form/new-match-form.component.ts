import { Component, OnInit } from '@angular/core';
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

      this.toastr.error('Debe corregir todos los errores antes de guardar', 'Error!');
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

        const idString: string = match.id.toString();

        // Replace middle characters with "..." from id, only keep first and last 4
        const charsCount = 4;
        const idCut =
          idString.substring(0, charsCount) +
          '...' +
          idString.substring(idString.length - charsCount, idString.length);

        this.toastr.success(`El partido fue creado correctamente con id: ${idCut}`, 'Éxito!');
      },
      error: (error: any) => {
        console.log('Error: ', error);

        this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
      }
    });
  }
}
