import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { TestComponent } from './components/test/test.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, CoreRoutingModule, HttpClientModule]
})
export class CoreModule {}
