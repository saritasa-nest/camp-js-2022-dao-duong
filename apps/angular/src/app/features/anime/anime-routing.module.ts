import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../core/guards';

import { AnimeComponent } from './anime.component';
import { TableComponent } from './table/table.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeComponent,
    children: [
      {
        path: '',
        component: TableComponent,
      },
      {
        path: ':id',
        component: DetailComponent,
        title: 'Anime Detail',
        canActivate: [AuthGuard],
      },
    ],
  },
];

/** Anime table view routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
