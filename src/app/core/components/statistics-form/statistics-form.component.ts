import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';
import {PlayersStatistics} from "../../model/PlayersStatistics";
import {StatisticsService} from "../../services/statistics.service";
import {MatchesStatistics} from "../../model/MatchesStatistics";


interface statisticsForm {
  hours: FormControl<number | null>;
}

@Component({
  selector: 'app-statistics-form',
  templateUrl: './statistics-form.component.html',
  styleUrls: ['./statistics-form.component.css']
})
export class StatisticsFormComponent implements OnInit {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;
  resultMessage :string = '';

  statisticsForm = new FormGroup<statisticsForm>({
    hours: new FormControl(null, {
      validators: [Validators.required, Validators.min(1), Validators.max(999999999999)]
    }),
  });

  controls = this.statisticsForm.controls;

  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.statisticsForm.valid) {
      console.log('Invalid form. Canceling submit.');

      this.toastr.error('Debe ingresar un número válido de horas.', 'Error!');

      this.statisticsForm.markAllAsTouched();
      return;
    }
      const values = this.statisticsForm.value;
      const playersStatistics = new PlayersStatistics();
      const matchesStatistics = new MatchesStatistics();
      playersStatistics.hours = values.hours as number;
      matchesStatistics.hours = values.hours as number;
      const msj : string = playersStatistics.hours > 1 ? ' en las últimas '+playersStatistics.hours +' horas.' : ' en la última hora.';



    this.statisticsService.getStatisticsPlayers(playersStatistics.hours).subscribe({
        next: (statistics: PlayersStatistics) => {
          playersStatistics.playersEnrolled=statistics.playersEnrolled
          this.resultMessage = `Reporte de estadísticas:
        <ul>
        <li><b>Cantidad de jugadores anotados: ${playersStatistics.playersEnrolled}</b>${msj}</li>
        </ul>`
        },
        error: (error: any) => {
          console.log('Error: ', error);
          if (!error.error || !error.error.errorCode) {
            this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
            return;
          }

        }
      });

    this.statisticsService.getStatisticsMatches(matchesStatistics.hours).subscribe({
      next: (statistics: MatchesStatistics) => {
        matchesStatistics.matchesCreated=statistics.matchesCreated
        this.resultMessage += `
        <ul>
        <li><b>Cantidad de partidos creados: ${matchesStatistics.matchesCreated}</b>${msj}</li>
        </ul>`;
      },
      error: (error: any) => {
        console.log('Error: ', error);
        if (!error.error || !error.error.errorCode) {
          this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');
          return;
        }

      }
    });
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
