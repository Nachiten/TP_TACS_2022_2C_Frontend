import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from '@angular/forms';

class Match {
  fecha: Date;
  hora: Date;
  lugar: string;

  constructor() {
    this.fecha = new Date();
    this.hora = new Date();
    this.lugar = '';
  }
}

type MatchFormType = ɵTypedOrUntyped<MatchForm, ɵFormGroupValue<MatchForm>, any>;

interface MatchForm {
  fecha: FormControl<Date | null>;
  hora: FormControl<Date | null>;
  lugar: FormControl<string>;
}

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.css']
})
export class FormTestComponent {
  newMatchForm = new FormGroup<MatchForm>({
    fecha: new FormControl(null, { validators: [Validators.required] }),
    hora: new FormControl(null, { validators: [Validators.required] }),
    lugar: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true
    })
  });

  constructor() {}

  onSubmit(): void {
    if (!this.newMatchForm.valid) return;

    console.log('Submit');

    const value: MatchFormType = this.newMatchForm.value;

    const match = new Match();

    match.fecha = new Date(value.fecha ? value.fecha : new Date());
    match.hora = new Date(value.hora ? `2020-01-01T${value.hora}` : new Date());
    match.lugar = value.lugar ? value.lugar : '';

    console.log('MATCH: ', match);
  }
}
