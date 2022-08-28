import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormTestComponent } from './components/form-test/form-test.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent
  },
  {
    path: 'home',
    component: NavigationComponent
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
