import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormTestComponent } from './components/form-test/form-test.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'form',
    component: FormTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
