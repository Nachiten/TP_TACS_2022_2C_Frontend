import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPlayerFormComponent } from './components/forms/new-player-form/new-player-form.component';
import { NewMatchFormComponent } from './components/forms/new-match-form/new-match-form.component';
import { MatchDetailsFormComponent } from './components/forms/match-details-form/match-details-form.component';
import { CardWrapperComponent } from './components/card-wrapper/card-wrapper.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { StatisticsFormComponent } from './components/forms/statistics-form/statistics-form.component';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    HomeComponent,
    NewPlayerFormComponent,
    NewMatchFormComponent,
    CardWrapperComponent,
    FormInputComponent,
    MatchDetailsFormComponent,
    StatisticsFormComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
