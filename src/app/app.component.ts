import { Component, OnInit } from '@angular/core';
import { HealthService } from './core/services/health.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tp-tacs-2022-2c-grupo-2-frontend';

  constructor(private readonly testService: HealthService) {}

  ngOnInit() {
    this.testService.getHealth().subscribe({
      next: (data) => {
        console.log('[SERVER] STATUS: ', data);
      },
      error: (err) => {
        console.log('[SERVER] ERROR: ', err);
      }
    });
  }
}
