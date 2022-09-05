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
type MatchFormType = ɵTypedOrUntyped<MatchForm, ɵFormGroupValue<MatchForm>, any>;

interface MatchForm {
  date: FormControl<Date | null>;
  time: FormControl<Date | null>;
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
    date: new FormControl(null, { validators: [Validators.required] }),
    time: new FormControl(null, { validators: [Validators.required] }),
    location: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true
    })
  });

  constructor(
    private readonly matchService: MatchService,
    private readonly toastr: ToastrService
  ) {}

  onSubmit(): void {
    if (!this.newMatchForm.valid) {
      this.toastr.error('Debe corregir todos los errores antes de guardar', 'Error!');

      // Mark all inputs as dirty
      Object.values(this.newMatchForm.controls).forEach((control) => control.markAsTouched());

      return;
    }

    console.log('Submit');

    const value: MatchFormType = this.newMatchForm.value;

    const match = new Match();

    match.date = new Date(value.date ? value.date : new Date());
    match.time = new Date(value.time ? `2000-01-01T${value.time.toString()}` : new Date());
    match.location = value.location ? value.location : '';

    //console.log('MATCH: ', match);

    this.matchService.createMatch(match).subscribe({
      next: (match: Match) => {
        console.log('Match created: ', match);

        const idString: string = match.id.toString();

        // Cut the middle characters from id, only conserve first and last 3
        const idCut =
          idString.substring(0, 4) +
          '...' +
          idString.substring(idString.length - 4, idString.length);

        this.toastr.success(`El partido fue creado correctamente con id: ${idCut}`, 'Éxito!');
      },
      error: (error: any) => {
        console.log('Error: ', error);
      }
    });
  }
}
