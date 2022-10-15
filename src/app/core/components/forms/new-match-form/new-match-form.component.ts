import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from '@angular/forms';
import { controlHasError, getControlValidClass } from '../../../../utils/form-utils';
import { ToastrService } from 'ngx-toastr';
import { Match } from '../../../model/Match';
import { MatchService } from '../../../services/match.service';
import { dateToBackendDateTime } from '../../../../utils/date-utils';
import { ErrorCode } from '../../../model/ErrorCode';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

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

  idCreated: string = '';

  loading = false;
  copied = false;

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
      this.toastr.error('Debe corregir todos los errores antes de continuar', 'Error!');
      this.newMatchForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const value: MatchFormType = this.newMatchForm.value;
    const match = new Match();

    match.dateTime = new Date(value.dateTime as string);
    match.location = value.location as string;

    this.matchService.createMatch(match).subscribe({
      next: (match: Match) => {
        this.idCreated = match.id;
        this.loading = false;
      },
      error: (error: any) => {
        // Error must have errorCode
        if (!error.error || !error.error.errorCode) {
          this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
          this.loading = false;
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

        this.loading = false;
      }
    });
  }

  getDateNow(): string {
    return dateToBackendDateTime(new Date());
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }

  public async onClipboardCopy(successful: boolean): Promise<void> {
    this.copied = successful;
    await this.delay(2000);
    this.copied = !successful;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
