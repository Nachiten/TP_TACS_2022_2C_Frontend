import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { TestNameComponent } from './components/test-name/test-name.component';

@NgModule({
  declarations: [TestNameComponent],
  imports: [CommonModule, AuthRoutingModule]
})
export class AuthModule {}
