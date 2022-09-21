import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewMatchFormComponent } from './components/new-match-form/new-match-form.component';
import { NewPlayerFormComponent } from './components/new-player-form/new-player-form.component';
import { MatchDetailsFormComponent } from './components/match-details-form/match-details-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new-match',
    component: NewMatchFormComponent
  },
  {
    path: 'signup-match',
    component: NewPlayerFormComponent
  },
  {
    path: 'match-details',
    component: MatchDetailsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
