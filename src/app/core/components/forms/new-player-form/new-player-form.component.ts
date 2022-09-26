import { ErrorCode } from '../../../model/ErrorCode';
import { Player } from '../../../model/Player';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';
import { MatchService } from '../../../services/match.service';

interface NewPlayerForm {
  matchId: FormControl<string>;
  phoneNumber: FormControl<number | null>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-new-player-form',
  templateUrl: './new-player-form.component.html',
  styleUrls: ['./new-player-form.component.scss']
})
export class NewPlayerFormComponent {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;

  resultMessage: string = '';

  loading: boolean = false;

  constructor(
    private readonly matchService: MatchService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {}

  newPlayerLinkForm = new FormGroup<NewPlayerForm>({
    matchId: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    phoneNumber: new FormControl(null, {
      validators: [Validators.required, Validators.min(1000), Validators.max(999999999999)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    })
  });

  controls = this.newPlayerLinkForm.controls;

  onSubmit(): void {
    if (!this.newPlayerLinkForm.valid) {
      this.toastr.error('Debe corregir todos los errores antes de continuar', 'Error!');
      this.newPlayerLinkForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const value = this.newPlayerLinkForm.value;

    const player = new Player();
    player.email = value.email as string;
    player.matchId = value.matchId as string;
    player.phoneNumber = value.phoneNumber as number;

    if (!player.matchId) {
      this.toastr.error(`El id del partido es obligatorio`, 'Error!');
      return;
    }

    this.matchService.createPlayer(player).subscribe({
      next: (player: Player) => {
        const regularStatusText: string = player.isRegular ? 'Titular' : 'Suplente';

        this.resultMessage = `El jugador fue anotado correctamente con los siguientes datos:
        <ul>
        <li><strong>Id del partido:</strong> ${player.matchId}</li>
        <li><strong>Numero de telefono:</strong> ${player.phoneNumber}</li>
        <li><strong>Email:</strong> ${player.email}</li>
        <li><strong>Tipo de jugador:</strong> ${regularStatusText}</li>
        </ul>`;

        this.loading = false;
      },
      error: (error: any) => {
        if (!error.error || !error.error.errorCode) {
          this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
          this.loading = false;
          return;
        }

        switch (error.error.errorCode) {
          case ErrorCode.MATCH_FULL:
            this.toastr.error('El partido ya está lleno', 'Error!');
            break;
          case ErrorCode.MATCH_NOT_FOUND:
            this.toastr.error('El partido indicado no existe', 'Error!');
            break;
          case ErrorCode.PLAYER_EXISTENT:
            this.toastr.error(
              'El jugador ya se encuentra anotado (Ya hay un jugador con ese email o teléfono)',
              'Error!'
            );
            break;
          case ErrorCode.INVALID_BODY:
            this.toastr.error('Uno de los campos requeridos no se envió correctamente', 'Error!');
            break;
          default:
            this.toastr.error('Ocurrió un error al crear el jugador', 'Error!');
        }

        this.loading = false;
      }
    });
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
