import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NewPlayerFormComponent } from './components/new-player-form/new-player-form.component';
import { NewMatchFormComponent } from './components/new-match-form/new-match-form.component';
import { MatchDetailsFormComponent } from './components/match-details-form/match-details-form.component';
import { CardWrapperComponent } from './components/card-wrapper/card-wrapper.component';
import { FormInputComponent } from './components/form-input/form-input.component';

@NgModule({
  declarations: [
    HomeComponent,
    NewPlayerFormComponent,
    NewMatchFormComponent,
    CardWrapperComponent,
    FormInputComponent,
    MatchDetailsFormComponent
  ],

  imports: [CommonModule, CoreRoutingModule, HttpClientModule, LayoutModule, ReactiveFormsModule]
})
export class CoreModule {}
