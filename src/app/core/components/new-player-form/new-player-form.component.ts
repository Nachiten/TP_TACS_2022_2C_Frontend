import { ErrorCode } from './../../model/ErrorCode';
import { Player } from './../../model/Player';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';
import { MatchService } from '../../services/match.service';

interface NewPlayerForm {
  matchId: FormControl<string>;
  phoneNumber: FormControl<number | null>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-new-player-form',
  templateUrl: './new-player-form.component.html',
  styleUrls: ['./new-player-form.component.css']
})
export class NewPlayerFormComponent {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;
  resultMessage: string = '';

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
      console.log('Invalid form. Canceling submit.');

      this.toastr.error('Debe corregir todos los errores antes de avanzar', 'Error!');
      this.newPlayerLinkForm.markAllAsTouched();

      return;
    }

    console.log('Form valid. ');

    const values = this.newPlayerLinkForm.value;
    const player = new Player();
    player.email = values.email as string;
    player.matchId = values.matchId as string;
    player.phoneNumber = values.phoneNumber as number;

    if (!player.matchId) {
      this.toastr.error(`El id de partido es obligatorio`, 'Error!');
      return;
    }

    this.matchService.createPlayer(player).subscribe({
      next: (player: Player) => {
        console.log('Player created: ', player);

        const regularStatusText: string = player.isRegular ? 'Titular' : 'Suplente';

        this.resultMessage = `El jugador fue anotado correctamente con los siguientes datos:
        <ul>
        <li>Id de partido: ${player.matchId}</li>
        <li>Numero de telefono: ${player.phoneNumber}</li>
        <li>Email: ${player.email}</li>
        <li>Tipo de jugador: ${regularStatusText}</li>
        </ul>`;
      },
      error: (error: any) => {
        console.log('Error: ', error);

        if (!error.error || !error.error.errorCode) {
          this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
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
      }
    });
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
