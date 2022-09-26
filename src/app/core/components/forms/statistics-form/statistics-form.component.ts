import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';
import { StatisticsService } from '../../../services/statistics.service';
import { combineLatest } from 'rxjs';
import { dateToStringDateTime } from '../../../../utils/date-utils';

interface StatisticsForm {
  hours: FormControl<number | null>;
}

@Component({
  selector: 'app-statistics-form',
  templateUrl: './statistics-form.component.html',
  styleUrls: ['./statistics-form.component.css']
})
export class StatisticsFormComponent {
  controlHasError = controlHasError;
  getControlValidClass = getControlValidClass;

  resultMessage: string = '';

  loading: boolean = false;

  statisticsForm = new FormGroup<StatisticsForm>({
    hours: new FormControl(null, {
      validators: [Validators.required, Validators.min(1), Validators.max(1000000)]
    })
  });

  controls = this.statisticsForm.controls;

  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  onSubmit(): void {
    if (!this.statisticsForm.valid) {
      this.toastr.error('Debe ingresar un número válido de horas.', 'Error!');
      this.statisticsForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const hours: number = this.statisticsForm.value.hours as number;

    const msj: string = hours > 1 ? ` en las últimas ${hours} horas.` : ' en la última hora.';

    const playerStatistics$ = this.statisticsService.getPlayerStatistics(hours);
    const matchStatistics$ = this.statisticsService.getMatchStatistics(hours);

    combineLatest([playerStatistics$, matchStatistics$]).subscribe({
      next: ([playerStatistics, matchStatistics]) => {
        this.resultMessage = `Reporte de estadísticas:
            <ul>
            <li><b>Cantidad de jugadores anotados: ${
              playerStatistics.playersEnrolled
            }</b>${msj}</li>
            <li><b>Cantidad de partidos creados: ${matchStatistics.matchesCreated}</b>${msj}</li>
            </ul>
            <p>Este reporte fue procesado el <strong>${dateToStringDateTime(
              matchStatistics.now
            )}</strong></p>`;

        this.loading = false;
      },
      error: () => {
        this.toastr.error(`Ocurrió un error interno al procesar la solicitud`, 'Error!');

        this.loading = false;
      }
    });
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
