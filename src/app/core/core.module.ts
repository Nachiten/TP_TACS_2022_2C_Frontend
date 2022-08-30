import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { FormTestComponent } from './components/form-test/form-test.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, FormTestComponent],
  imports: [CommonModule, CoreRoutingModule, HttpClientModule, LayoutModule, ReactiveFormsModule]
})
export class CoreModule {}
