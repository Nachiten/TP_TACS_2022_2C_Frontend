import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { controlHasError, getControlValidClass } from 'src/app/utils/form-utils';
import { PlayersStatistics } from '../../../model/PlayersStatistics';
import { StatisticsService } from '../../../services/statistics.service';
import { MatchesStatistics } from '../../../model/MatchesStatistics';
import { combineLatest } from 'rxjs';

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
  resultMessage: string = '';

  statisticsForm = new FormGroup<statisticsForm>({
    hours: new FormControl(null, {
      validators: [Validators.required, Validators.min(1), Validators.max(999999999999)]
    })
  });

  controls = this.statisticsForm.controls;

  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.statisticsForm.valid) {
      console.log('Invalid form. Canceling submit.');

      this.toastr.error('Debe ingresar un número válido de horas.', 'Error!');

      this.statisticsForm.markAllAsTouched();
      return;
    }
    const hours: number = this.statisticsForm.value.hours as number;

    const msj: string = hours > 1 ? ` en las últimas ${hours} horas.` : ' en la última hora.';

    const playerStatistics$ = this.statisticsService.getPlayerStatistics(hours);
    const matchStatistics$ = this.statisticsService.getMatchStatistics(hours);

    combineLatest([playerStatistics$, matchStatistics$]).subscribe(
      ([playerStatistics, matchStatistics]) => {
        this.resultMessage = `Reporte de estadísticas:
            <ul>
            <li><b>Cantidad de jugadores anotados: ${playerStatistics.playersEnrolled}</b>${msj}</li>
            <li><b>Cantidad de partidos creados: ${matchStatistics.matchesCreated}</b>${msj}</li>
            </ul>`;
      }
    );
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
