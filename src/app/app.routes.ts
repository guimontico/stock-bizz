import { Routes } from '@angular/router';
import { BizzComponent } from '../routes/bizz/bizz.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/bizz',
    pathMatch: 'full'
  },
  {
    path: 'bizz',
    component: BizzComponent
  }
];
