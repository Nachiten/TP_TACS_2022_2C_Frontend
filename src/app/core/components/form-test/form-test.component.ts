import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from '@angular/forms';
import { Match } from '../../model/Match';
import { controlHasError, getControlValidClass } from '../../../utils/form-utils';
import { MatchService } from '../../services/match.service';
import { ToastrService } from 'ngx-toastr';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//type MatchFormType = ɵTypedOrUntyped<MatchForm, ɵFormGroupValue<MatchForm>, any>;

interface MatchForm {
  date: FormControl<string>;
  time: FormControl<string>;
  location: FormControl<string>;
}

@Component({
  selector: 'app-form-home',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.css']
})
export class FormTestComponent {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;

  newMatchForm = new FormGroup<MatchForm>({
    date: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    time: new FormControl('', { validators: [Validators.required], nonNullable: true }),
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

    const value = this.newMatchForm.value;

    const match = new Match();

    match.date = new Date(value.date as string);
    match.time = new Date(`2000-01-01T${value.time?.toString()}`);
    match.location = value.location as string;

    //console.log('MATCH: ', match);

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
      }
    });
  }
}
